import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import RouteList from '../components/RouteList';
import nonstop from '../queries/nonstop';

export class RouteListNonstopComponent extends Component {
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

    return routeData.map((route) => {
      const { nodeId, sourceAirport, destinationAirport } = route;
      const airline = route.airline.name;
      const airports = [];

      airports.push({
        iata: sourceAirport.iata,
        name: sourceAirport.name,
        latitude: sourceAirport.latitude,
        longitude: sourceAirport.longitude,
      });

      airports.push({
        iata: destinationAirport.iata,
        name: destinationAirport.name,
        latitude: destinationAirport.latitude,
        longitude: destinationAirport.longitude,
      });

      return { nodeId, airline, airports };
    });
  }

  render() {
    const { routeData } = this.props;
    let routes = [];

    if (routeData.allRoutes) {
      routes = this.createRoutesFromData(routeData.allRoutes.nodes);
      if (routes.length > 0) {
        return <RouteList routes={routes} />;
      }
    }

    if (routeData.loading) {
      return <div>Loading...</div>;
    }

    return <div>No routes were found. Please Try Different Search Terms.</div>;
  }
}

RouteListNonstopComponent.defaultProps = {
  airline: '',
  sourceAirport: '',
  destinationAirport: '',
  routeData: {},
  selectedRouteId: '',
};

RouteListNonstopComponent.propTypes = {
  airline: React.PropTypes.string,
  sourceAirport: React.PropTypes.string,
  destinationAirport: React.PropTypes.string,
  routeData: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    allRoutes: React.PropTypes.object,
  }).isRequired,
  onErrorMessage: React.PropTypes.func.isRequired,
};

export default graphql(nonstop, {
  name: 'routeData',
  options: ({ airline, sourceAirport, destinationAirport }) => ({
    variables: { airline, sourceAirport, destinationAirport },
  }),
})(RouteListNonstopComponent);
