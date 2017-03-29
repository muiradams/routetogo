import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import RouteList from '../components/RouteList';
import oneStop from '../queries/onestop';

export class RouteListOneStopComponent extends Component {
  constructor(props) {
    super(props);
    this.createRoutesFromData = this.createRoutesFromData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeData.allRoutes.nodes.length === 0) {
      this.props.onErrorMessage('No routes found. Please try different search terms.');
    }
  }

  createRoutesFromData(routeData) {
    if (routeData.length === 0) {
      return [];
    }

    const { destinationAirport } = this.props;

    const routes = routeData.map((route) => {
      const { nodeId, sourceAirport, secondAirport } = route;
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
        iata: secondAirport.iata,
        name: secondAirport.name,
        latitude: secondAirport.latitude,
        longitude: secondAirport.longitude,
      });

      if (secondAirport.iata !== destinationAirport) {
        if (secondAirport.finalAirports) {
          finalAirports = secondAirport.finalAirports.nodes;
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

RouteListOneStopComponent.defaultProps = {
  airline: '',
  sourceAirport: '',
  destinationAirport: '',
  routeData: {},
  selectedRouteId: '',
};

RouteListOneStopComponent.propTypes = {
  airline: React.PropTypes.string,
  sourceAirport: React.PropTypes.string,
  destinationAirport: React.PropTypes.string,
  routeData: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    allRoutes: React.PropTypes.object,
  }).isRequired,
  onErrorMessage: React.PropTypes.func.isRequired,
};

export default graphql(oneStop, {
  name: 'routeData',
  options: ({ airline, sourceAirport }) => ({
    variables: { airline, sourceAirport },
  }),
})(RouteListOneStopComponent);
