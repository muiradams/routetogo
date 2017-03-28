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

    return routeData.map((route) => {
      const nodeId = route.nodeId;
      const airline = route.airlineByAirlineId.name;
      const sourceAirport = route.airportBySourceAirportId;
      const destinationAirport = route.airportByDestinationAirportId;
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
  options: ({ airline, sourceAirport, destinationAirport }) => ({
    variables: { airline, sourceAirport, destinationAirport },
  }),
})(RouteListOneStopComponent);
