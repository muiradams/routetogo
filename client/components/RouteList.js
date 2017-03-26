import React, { Component } from 'react';
import RouteMap from './RouteMap';

class RouteList extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedRoute: {} };

    this.handleSelectRoute = this.handleSelectRoute.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
  }

  handleSelectRoute(route) {
    this.setState({ selectedRoute: route });
  }

  renderRoutes() {
    const { routes } = this.props;
    const { selectedRoute } = this.state;
    let selectedRouteId = '';

    if (selectedRoute) {
      if (selectedRoute.nodeId) {
        selectedRouteId = selectedRoute.nodeId;
      }
    }

    return routes.map((route, index) => {
      // Highlight the selected route
      let className;
      if (!selectedRouteId) {
        if (index === 0) {
          className = 'highlight';
        } else {
          className = '';
        }
      } else if (route.nodeId === selectedRouteId) {
        className = 'highlight';
      } else {
        className = '';
      }

      return (
        <li
          key={route.nodeId}
          className={className}
          onClick={() => this.handleSelectRoute(route)}
        >
          {route.sourceAirport} to {route.destinationAirport}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <RouteMap selectedRoute={this.state.selectedRoute} />
        <ul>
          {this.renderRoutes()}ROUTES LIST IS HERE!
        </ul>
      </div>
    );
  }
}

RouteList.defaultProps = {
  routes: [],
};

RouteList.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default RouteList;
