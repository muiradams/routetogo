import React, { Component } from 'react';

class SearchFields extends Component {
  constructor(props) {
    super(props);
    this.setSourceAirport = this.setSourceAirport.bind(this);
    this.setDestinationAirport = this.setDestinationAirport.bind(this);
  }

  setSourceAirport(event) {
    this.props.onSourceAirportInput(event.target.value);
  }

  setDestinationAirport(event) {
    this.props.onDestinationAirportInput(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="departure">Departure</label>
        <input
          id="departure"
          type="text"
          value={this.props.sourceAirport}
          placeholder="Departure"
          onChange={this.setSourceAirport}
        />
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={this.props.destinationAirport}
          placeholder="Destination"
          onChange={this.setDestinationAirport}
        />
      </div>
    );
  }
}

SearchFields.propTypes = {
  sourceAirport: React.PropTypes.string.isRequired,
  destinationAirport: React.PropTypes.string.isRequired,
  onSourceAirportInput: React.PropTypes.func.isRequired,
  onDestinationAirportInput: React.PropTypes.func.isRequired,
};

export default SearchFields;
