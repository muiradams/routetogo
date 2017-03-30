import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import RouteList from '../components/RouteList';
import twoStops from '../queries/twoStops';

export class RouteListTwoStopsComponent extends Component {
  constructor(props) {
    super(props);
    this.createRoutesFromData = this.createRoutesFromData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeData.allRoutes.nodes.length === 0) {
      this.props.onErrorMessage('No routes found. Please try different search terms.');
    } else {
      this.props.onErrorMessage('');
    }
  }

  createRoutesFromData(routeData) {
    if (routeData.length === 0) {
      return [];
    }

    const { destinationAirport } = this.props;

    const routes = routeData.map((route) => {
      const { nodeId, sourceAirport, firstStop } = route;
      const airline = route.airline.name;
      const airports = [];
      let finalAirports;

      airports.push({
        iata: sourceAirport.iata,
        name: sourceAirport.name,
        latitude: sourceAirport.latitude,
        longitude: sourceAirport.longitude,
      });

      airports.push({
        iata: firstStop.iata,
        name: firstStop.name,
        latitude: firstStop.latitude,
        longitude: firstStop.longitude,
      });

      if (firstStop.iata !== destinationAirport) {
        if (firstStop.finalAirports) {
          finalAirports = firstStop.finalAirports.nodes;
        } else {
          return null;
        }

        const finalAirport = finalAirports.find((airport) => {
          return airport.airport.iata === destinationAirport;
        });

        if (!finalAirport) return null;

        airports.push({
          iata: finalAirport.airport.iata,
          name: finalAirport.airport.name,
          latitude: finalAirport.airport.latitude,
          longitude: finalAirport.airport.longitude,
        });
      }

      return { nodeId, airline, airports };
    });

    return routes.filter(route => (route));
  }

  render() {
    const { routeData } = this.props;
    let routes = [];

    if (routeData.allRoutes) {
      routes = this.createRoutesFromData(routeData.allRoutes.nodes);
    }

    if (routeData.loading) {
      return <div>Loading...</div>;
    }

    return <RouteList routes={routes} />;
  }
}

RouteListTwoStopsComponent.defaultProps = {
  airline: '',
  sourceAirport: '',
  destinationAirport: '',
  routeData: {},
  selectedRouteId: '',
};

RouteListTwoStopsComponent.propTypes = {
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
  options: ({ airline, sourceAirport }) => ({
    variables: { airline, sourceAirport },
  }),
})(RouteListTwoStopsComponent);