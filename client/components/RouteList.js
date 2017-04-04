import React, { Component } from 'react';
// import RouteMap from './RouteMap';
import Route from './Route';

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

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    // This function uses the Haversine Formula
    const R = 6371;

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
      (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  renderRoutes() {
    const { routes } = this.props;
    const { selectedRoute } = this.state;
    let selectedRouteId = '';

    function createUniqueKey(route) {
      return route.nodeId + route.airports.reduce((key, airport) => key + airport.iata, '');
    }

    if (selectedRoute) {
      if (selectedRoute.nodeId) {
        selectedRouteId = selectedRoute.nodeId;
      }
    }

    // Sort routes first by stops, then by total distance of route
    const mappedRoutes = routes.map((route, routeIndex) => {
      let totalDistance = route.airports.reduce((total, airport, airportIndex, airports) => {
        let distance = 0;
        const { latitude: lat1, longitude: lon1 } = airport;
        if (airportIndex < airports.length - 1) {
          const { latitude: lat2, longitude: lon2 } = airports[airportIndex + 1];
          distance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
        }
        return total + distance;
      }, 0);

      const stops = route.airports.length - 2;

      if (stops > 0) {
        totalDistance += (stops * 100000);
      }

      return { routeIndex, totalDistance };
    });

    mappedRoutes.sort((a, b) => a.totalDistance - b.totalDistance);
    const sortedRoutes = mappedRoutes.map(route => routes[route.routeIndex]);

    return sortedRoutes.map((route, index) => {
      const key = createUniqueKey(route);
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
          key={key}
          className={className}
          onClick={() => this.handleSelectRoute(route)}
        >
          <Route route={route} keyStart={key} />
        </li>
      );
    });
  }

  render() {
    if (this.props.routes.length > 0) {
      return (
        <div>
          <ul>
            {this.renderRoutes()}
          </ul>
        </div>
      );
    }

    return null;
  }
}

RouteList.defaultProps = {
  routes: [],
};

RouteList.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default RouteList;
