import React, { Component } from 'react';

class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stops: '0',
      airline: 'all',
      alliance: 'none',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const { stops, airline, alliance } = this.state;

    switch (name) {
      case 'stops':
        this.setState({ stops: value });
        this.props.onAdvancedOptionsInput({ stops: value, airline, alliance });
        break;
      case 'airline':
        if (value !== 'all') this.setState({ alliance: 'none' });
        this.setState({ airline: value });
        this.props.onAdvancedOptionsInput({ stops, airline: value, alliance });
        break;
      case 'alliance':
        if (value !== 'none') this.setState({ airline: 'all' });
        this.setState({ alliance: value });
        this.props.onAdvancedOptionsInput({ stops, airline, alliance: value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="stops">Max. Stops</label>
        <select
          name="stops"
          id="stops"
          value={this.state.stops}
          onChange={this.handleChange}
        >
          <option value="0">Nonstop</option>
          <option value="1">1 Stop</option>
          <option value="2">2 Stops</option>
          <option value="3">3 Stops</option>
          <option value="4">4 Stops</option>
          <option value="5">5 Stops</option>
        </select>
        <label htmlFor="airline">Airline</label>
        <select
          name="airline"
          id="airline"
          value={this.state.airline}
          onChange={this.handleChange}
        >
          <option value="all">All Airlines</option>
          <option value="UA">United Airlines</option>
          <option value="AA">American Airlines</option>
        </select>
        <label htmlFor="alliance">Alliance</label>
        <select
          name="alliance"
          id="alliance"
          value={this.state.alliance}
          onChange={this.handleChange}
        >
          <option value="none">None</option>
          <option value="staralliance">Star Alliance</option>
          <option value="oneworld">Oneworld</option>
          <option value="skyteam">SkyTeam</option>
        </select>
      </div>
    );
  }
}

SearchAdvanced.propTypes = {
  onAdvancedOptionsInput: React.PropTypes.func.isRequired,
};

export default SearchAdvanced;
