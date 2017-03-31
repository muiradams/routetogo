import React, { Component } from 'react';

class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonstop: false,
      airline: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
    this.airlineFirstOption = this.airlineFirstOption.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const { airline } = this.state;
    let { nonstop } = this.state;

    switch (name) {
      case 'nonstop':
        nonstop = !this.state.nonstop;
        this.setState({ nonstop });
        this.props.onAdvancedOptionsInput({ nonstop, airline });
        break;
      case 'airline':
        this.setState({ airline: value });
        this.props.onAdvancedOptionsInput({ nonstop, airline: value });
        break;
      default:
        break;
    }
  }

  airlineFirstOption() {
    if (this.state.nonstop) {
      return <option value="all">All Airlines</option>;
    } else {
      return <option value="all">-----</option>;
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="nonstop">Nonstop</label>
        <input
          type="checkbox"
          name="nonstop"
          id="nonstop"
          onChange={this.handleChange}
        />
        <label htmlFor="airline">Airline</label>
        <select
          name="airline"
          id="airline"
          value={this.state.airline}
          onChange={this.handleChange}
        >
          { this.airlineFirstOption() }
          <option value="UA">United Airlines</option>
          <option value="AA">American Airlines</option>
        </select>
      </div>
    );
  }
}

SearchAdvanced.propTypes = {
  onAdvancedOptionsInput: React.PropTypes.func.isRequired,
};

export default SearchAdvanced;
