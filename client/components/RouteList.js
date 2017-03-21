import React, { Component } from 'react';

class RouteList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
  }

  handleClick(route) {
    this.props.onSelectedRouteInput(route);
  }

  renderRoutes() {
    const selectedRouteId = this.props.selectedRouteId;

    return this.props.routes.map((route, index) => {
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
          onClick={() => this.handleClick(route)}
        >
          {route.sourceAirport} to {route.destinationAirport}
        </li>
      );
    });
  }

  render() {
    return (
      <ul>
        {this.renderRoutes()}
      </ul>
    );
  }
}

RouteList.defaultProps = {
  routes: [],
  selectedRouteId: '',
};

RouteList.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.object),
  selectedRouteId: React.PropTypes.string,
  onSelectedRouteInput: React.PropTypes.func.isRequired,
};

export default RouteList;
