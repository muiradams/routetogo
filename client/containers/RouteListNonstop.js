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
    if (nextProps.routeData.allRoutes.nodes.length === 0) {
      this.props.onErrorMessage('No Routes Found. Please Try Different Search Terms.');
    }
  }

  createRoutesFromData(routeData) {
    if (routeData.length === 0) {
      return [];
    }

    return routeData;
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
