import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import RouteList from '../components/RouteList';
import oneStop from '../queries/oneStop';

export class RouteListOneStopComponent extends Component {
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

        const finalAirport = finalAirports.find(airport =>
          airport.airport.iata === destinationAirport);

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

    if (routeData.loading) {
      return <div className="loading"></div>;
    }

    if (routeData.allRoutes) {
      routes = this.createRoutesFromData(routeData.allRoutes.nodes);
      if (routes.length > 0) {
        return <RouteList routes={routes} />;
      }
    }

    return <div className="route-list panel panel-default">No routes were found. Please Try Different Search Terms.</div>;
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
