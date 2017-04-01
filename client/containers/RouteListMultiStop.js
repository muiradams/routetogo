import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import RouteList from '../components/RouteList';
import twoStops from '../queries/twoStops';

export class RouteListMultiStopComponent extends Component {
  constructor(props) {
    super(props);
    this.createRoutesFromData = this.createRoutesFromData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.onErrorMessage('');
  }

  createRoutesFromData(routeData) {
    if (routeData.length === 0) {
      return [];
    }

    const { destinationAirport } = this.props;

    // Go through each of the possible routes returned by GraphQL
    const nestedRoutes = routeData.map((route) => {
      const { nodeId, sourceAirport, firstStop } = route;
      const airline = route.airline.name;
      const airports = [];
      let secondStops;
      let finalRoutes = [];

      // The sourceAirport will always be in a route
      airports.push({
        iata: sourceAirport.iata,
        name: sourceAirport.name,
        latitude: sourceAirport.latitude,
        longitude: sourceAirport.longitude,
      });

      // The firstStop will always be in a route
      airports.push({
        iata: firstStop.iata,
        name: firstStop.name,
        latitude: firstStop.latitude,
        longitude: firstStop.longitude,
      });

      // First stop is already the destination
      if (firstStop.iata === destinationAirport) {
        return [{ nodeId, airline, airports }];
      }

      // Move on to evaluate the second stop
      if (firstStop.secondStop) {
        secondStops = firstStop.secondStop.nodes;
      } else {
        // If the secondStop doesn't exist then there isn't a route
        return null;
      }

      // If the secondStop doesn't have any airports then there isn't a route
      if (secondStops.length === 0) return null;

      // finalRoutes could contain multiple routes from firstStop to destination
      finalRoutes = secondStops.map((secondStop) => {
        const secondAirport = secondStop.airport;

        // We should never return to an airport we have already visited
        if (secondAirport.iata === sourceAirport.iata) return null;

        /**
         * If the second stop is the destination then return it, and look at
         * the next option for a second stop.
         */
        if (secondAirport.iata === destinationAirport) {
          return [{
            iata: secondAirport.iata,
            name: secondAirport.name,
            latitude: secondAirport.latitude,
            longitude: secondAirport.longitude,
          }];
        }

        // The second stop is not the destination, so check the final airport
        if (secondAirport.finalAirports) {
          if (secondAirport.finalAirports.nodes.length > 0) {
            const finalAirport = secondAirport.finalAirports.nodes[0].airport;

            // The final airport matches the destination airport
            if (finalAirport.iata === destinationAirport) {
              return [{
                iata: secondAirport.iata,
                name: secondAirport.name,
                latitude: secondAirport.latitude,
                longitude: secondAirport.longitude,
              },
              {
                iata: finalAirport.iata,
                name: finalAirport.name,
                latitude: finalAirport.latitude,
                longitude: finalAirport.longitude,
              }];
            }
          }

          // finalAiport isn't destination, so route doesn't exist
          return null;
        }

        // Second route isn't destination, and finalAiport doesn't exist, so route doesn't exist
        return null;
      });

      // Second stop and final stop didn't lead to destination
      if (finalRoutes.length === 0) return null;

      // Remove any null routes, so that we're left with an array of routes only
      finalRoutes = finalRoutes.filter(finalRoute => (finalRoute));

      // Add each route that has a second or third stop that gets the route to the destination.
      return finalRoutes.map((finalRoute) => {
        const airportsBranch = [airports[0], airports[1]];
        for (let i = 0; i < finalRoute.length; i++) {
          airportsBranch.push(finalRoute[i]);
        }

        return { nodeId, airline, airports: airportsBranch };
      });
    });

    // Right now we have an array of arrays that contain one or more routes,
    // but we just want an array of routes
    const routes = nestedRoutes.reduce((finalArray, routeArray) => {
      finalArray.push(...routeArray);
      return finalArray;
    }, []);

    // Remove any null routes, so that we're left with an array of routes only
    return routes.filter(route => (route));
  }

  render() {
    const { routeData } = this.props;
    let routes = [];

    if (routeData.loading) {
      return <div>Loading...</div>;
    }

    if (routeData.allRoutes) {
      routes = this.createRoutesFromData(routeData.allRoutes.nodes);

      if (routes.length > 0) {
        return <RouteList routes={routes} />;
      }
    }

    return <div>No routes were found. Please Try Different Search Terms.</div>;
  }
}

RouteListMultiStopComponent.defaultProps = {
  airline: '',
  sourceAirport: '',
  destinationAirport: '',
  routeData: {},
  selectedRouteId: '',
};

RouteListMultiStopComponent.propTypes = {
  airline: React.PropTypes.string,
  sourceAirport: React.PropTypes.string,
  destinationAirport: React.PropTypes.string,
  routeData: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    allRoutes: React.PropTypes.object,
  }).isRequired,
  onErrorMessage: React.PropTypes.func.isRequired,
};

export default graphql(twoStops, {
  name: 'routeData',
  options: ({ airline, sourceAirport, destinationAirport }) => ({
    variables: { airline, sourceAirport, destinationAirport },
  }),
})(RouteListMultiStopComponent);
