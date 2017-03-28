import React from 'react';

const Route = (props) => {
  const route = props.route;

  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  if (isEmpty(route)) return null;

  const { airline, airports } = route;
  const stops = airports.length - 2;

  function renderAirports() {
    return airports.map(airport => <li key={airport.iata}>{airport.iata}</li>);
  }

  return (
    <ul>
      {renderAirports()}
      <li>{stops}</li>
      <li>{airline}</li>
    </ul>
  );
};

Route.defaultProps = {
  route: {},
};

Route.propTypes = {
  route: React.PropTypes.shape({
    airline: React.PropTypes.string,
    airports: React.PropTypes.arrayOf(
      React.PropTypes.object
    ),
  }),
};

export default Route;
