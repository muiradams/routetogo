import React from 'react';

const Route = (props) => {
  const { keyStart, route } = props;

  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  if (isEmpty(route)) return null;

  const { airports } = route;

  function renderAirports() {
    return airports.map((airport, index, array) => {
      if (index < array.length - 1) {
        return <li className="airport" key={keyStart + airport.iata}>{airport.iata}<i className="fa fa-long-arrow-right" /></li>;
      }

      return <li className="airport" key={keyStart + airport.iata}>{airport.iata}</li>;
    });
  }

  return <td><ul className="route">{renderAirports()}</ul></td>;
};

Route.defaultProps = {
  keyStart: '',
  route: {},
};

Route.propTypes = {
  keyStart: React.PropTypes.string,
  route: React.PropTypes.shape({
    airline: React.PropTypes.string,
    airports: React.PropTypes.arrayOf(
      React.PropTypes.object
    ),
  }),
};

export default Route;
