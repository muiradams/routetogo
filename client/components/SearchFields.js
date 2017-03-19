import React, { Component } from 'react';

class SearchFields extends Component {
  constructor(props) {
    super(props);
    this.state = { departureCity: '', destinationCity: '' };
    this.setDepartureCity = this.setDepartureCity.bind(this);
    this.setDestinationCity = this.setDestinationCity.bind(this);
  }

  setDepartureCity(event) {
    this.setState({ departureCity: event.target.value });
  }

  setDestinationCity(event) {
    this.setState({ destinationCity: event.target.value });
  }

  render() {
    return (
      <div>
        <label htmlFor="departure">Departure</label>
        <input
          id="departure"
          type="text"
          value={this.state.departureCity}
          placeholder="Departure"
          onChange={this.setDepartureCity}
        />
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={this.state.destinationCity}
          placeholder="Destination"
          onChange={this.setDestinationCity}
        />
      </div>
    );
  }
}

SearchFields.propTypes = {
  onDepartureCityInput: React.PropTypes.func.isRequired,
  onDestinationCityInput: React.PropTypes.func.isRequired,
};

export default SearchFields;
