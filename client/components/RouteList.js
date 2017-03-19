import React from 'react';

const RouteList= () => (
  <div>RouteList</div>
);

RouteList.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSelectedRouteInput: React.PropTypes.func.isRequired,
};

export default RouteList;
