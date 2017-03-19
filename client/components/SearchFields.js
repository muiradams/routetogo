import React, { Component } from 'react';

class SearchFields extends Component {
  constructor(props) {
    super(props);
    this.setDepartureCity = this.setDepartureCity.bind(this);
    this.setDestinationCity = this.setDestinationCity.bind(this);
  }

  setDepartureCity(event) {
    this.props.onDepartureCityInput(event.target.value);
  }

  setDestinationCity(event) {
    this.props.onDestinationCityInput(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="departure">Departure</label>
        <input
          id="departure"
          type="text"
          value={this.props.departureCity}
          placeholder="Departure"
          onChange={this.setDepartureCity}
        />
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={this.props.destinationCity}
          placeholder="Destination"
          onChange={this.setDestinationCity}
        />
      </div>
    );
  }
}

SearchFields.propTypes = {
  departureCity: React.PropTypes.string.isRequired,
  destinationCity: React.PropTypes.string.isRequired,
  onDepartureCityInput: React.PropTypes.func.isRequired,
  onDestinationCityInput: React.PropTypes.func.isRequired,
};

export default SearchFields;
