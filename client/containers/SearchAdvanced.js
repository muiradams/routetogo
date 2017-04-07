import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import airlinesQuery from '../queries/airlines';

// Only show suggestions when input value is at least 2 characters long
const shouldRenderSuggestions = value => value.trim().length > 1;

const getSuggestionValue = suggestion => `${suggestion.name} (${suggestion.iata})`;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name} ({suggestion.iata})
  </div>
);

export class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonstop: false,
      airlineInput: '',
      airlineIATA: '',
      airlineName: '',
      suggestions: [],
    };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.isAirlineValid = this.isAirlineValid.bind(this);
    this.handleNonstopChange = this.handleNonstopChange.bind(this);
    this.handleSetAirline = this.handleSetAirline.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let airlines = [];
    let suggestions = [];

    if (this.props.airlines) {
      airlines = this.props.airlines.nodes;
    }

    if (inputLength > 0) {
      suggestions = airlines.filter((airline) => {
        const iata = airline.iata.toLowerCase();
        const name = airline.name.toLowerCase();

        return (iata.slice(0, inputLength) === inputValue || name.indexOf(inputValue) !== -1);
      });
    }

    this.setState({
      suggestions,
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    const { nonstop } = this.state;

    this.setState({ airlineIATA: suggestion.iata, airlineName: suggestion.name });
    this.props.onAdvancedOptionsInput({ nonstop, airline: suggestion.iata, isAirlineValid: true });
  }

  isAirlineValid(airlineInput) {
    const { airlineIATA, airlineName } = this.state;
    return airlineInput === getSuggestionValue({ name: airlineName, iata: airlineIATA });
  }

  handleNonstopChange() {
    const { airlineInput, airlineIATA } = this.state;
    let isAirlineValid = true;

    if (airlineInput && airlineInput !== 'All Airlines') {
      isAirlineValid = this.isAirlineValid(airlineInput);
    }

    let { nonstop } = this.state;

    nonstop = !this.state.nonstop;

    if (nonstop && !airlineInput) {
      this.setState({ airlineInput: 'All Airlines', nonstop });
    } else if (!nonstop && airlineInput === 'All Airlines') {
      this.setState({ airlineInput: '', nonstop })
    } else {
      this.setState({ nonstop });
    }

    this.props.onAdvancedOptionsInput({ nonstop, airline: airlineIATA, isAirlineValid });
  }

  handleSetAirline(event, { newValue }) {
    const { airlineIATA, airlineInput, nonstop } = this.state;
    const isAirlineValid = this.isAirlineValid(newValue);

    if (!newValue) {
      this.setState({ airlineInput: newValue });
      this.props.onAdvancedOptionsInput({ nonstop, airline: '', isAirlineValid: true });
    } else if (isAirlineValid) {
      this.setState({ airlineInput: newValue });
      this.props.onAdvancedOptionsInput({ nonstop, airline: airlineIATA, isAirlineValid });
    } else {
      this.setState({ airlineInput: newValue });
      this.props.onAdvancedOptionsInput({ nonstop, airline: '', isAirlineValid });
    }
  }

  render() {
    const { airlineInput, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Airline',
      value: airlineInput,
      onChange: this.handleSetAirline,
    };

    return (
      <div className="search-advanced">
        <Autosuggest
          id="airline"
          name="airline"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          shouldRenderSuggestions={shouldRenderSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <input
          type="checkbox"
          name="nonstop"
          id="nonstop"
          className="fancy-check"
          onChange={this.handleNonstopChange}
        />
        <label htmlFor="nonstop"><span>Nonstop?</span></label>
      </div>
    );
  }
}

SearchAdvanced.defaultProps = {
  airlines: {},
};

SearchAdvanced.propTypes = {
  airlines: React.PropTypes.shape({
    nodes: React.PropTypes.array,
  }),
  onAdvancedOptionsInput: React.PropTypes.func.isRequired,
};

export default graphql(airlinesQuery, {
  props: ({ data: { airlines } }) => ({
    airlines,
  }),
})(SearchAdvanced);
