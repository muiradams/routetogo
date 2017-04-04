import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import airlinesQuery from '../queries/airlines';

const getSuggestionValue = suggestion => suggestion.iata;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonstop: false,
      airline: '',
      suggestions: [],
    };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
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
        const name = airline.name.toLowerCase();

        return (name.indexOf(inputValue) !== -1);
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

  handleNonstopChange() {
    const { airline } = this.state;
    let { nonstop } = this.state;

    nonstop = !this.state.nonstop;
    this.setState({ nonstop });
    this.props.onAdvancedOptionsInput({ nonstop, airline });
  }

  handleSetAirline(event, { newValue }) {
    const { nonstop } = this.state;
    this.setState({ airline: newValue });
    this.props.onAdvancedOptionsInput({ nonstop, airline: newValue });
  }

  render() {
    const { airline, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Airline',
      value: airline,
      onChange: this.handleSetAirline,
    };

    return (
      <div>
        <input
          type="checkbox"
          name="nonstop"
          id="nonstop"
          onChange={this.handleNonstopChange}
        />
        <label htmlFor="nonstop">Nonstop</label>
        <Autosuggest
          id="airline"
          name="airline"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
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
