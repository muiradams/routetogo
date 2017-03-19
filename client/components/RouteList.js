import React, { Component } from 'react';

class RouteList extends Component {
  render() {
    return (
      <div>RouteList</div>
    );
  }
}

RouteList.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSelectedRouteInput: React.PropTypes.func.isRequired,
};

export default RouteList;
