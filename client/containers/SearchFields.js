import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import airportsQuery from '../queries/airports';

const getSuggestionValue = suggestion => suggestion.iata;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.iata} - {suggestion.name}
  </div>
);

export class SearchFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceValue: '',
      destinationValue: '',
      suggestions: [],
    };
    this.setSourceAirport = this.setSourceAirport.bind(this);
    this.setDestinationAirport = this.setDestinationAirport.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onSuggestionsFetchRequested({ value }) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let airports = [];
    let suggestions = [];

    if (this.props.airports) {
      airports = this.props.airports.nodes;
    }

    if (inputLength > 0) {
      suggestions = airports.filter((airport) => {
        const iata = airport.iata.toLowerCase();
        const name = airport.name.toLowerCase();

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

  setSourceAirport(event, { newValue }) {
    this.setState({
      sourceValue: newValue,
    });
    this.props.onSourceAirportInput(newValue);
  }

  setDestinationAirport(event, { newValue }) {
    this.setState({
      destinationValue: newValue,
    });
    this.props.onDestinationAirportInput(newValue);
  }

  render() {
    const { sourceValue, destinationValue, suggestions } = this.state;

    const sourceInputProps = {
      placeholder: 'Source Airport',
      value: sourceValue,
      onChange: this.setSourceAirport,
    };

    const destinationInputProps = {
      placeholder: 'Destination Airport',
      value: destinationValue,
      onChange: this.setDestinationAirport,
    };

    return (
      <div className="search-fields">
        <Autosuggest
          id="source"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={sourceInputProps}
        />
        <Autosuggest
          id="destination"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={destinationInputProps}
        />
      </div>
    );
  }
}

SearchFields.defaultProps = {
  airports: {},
};

SearchFields.propTypes = {
  airports: React.PropTypes.shape({
    nodes: React.PropTypes.array,
  }),
  onSourceAirportInput: React.PropTypes.func.isRequired,
  onDestinationAirportInput: React.PropTypes.func.isRequired,
};

export default graphql(airportsQuery, {
  props: ({ data: { airports } }) => ({
    airports,
  }),
})(SearchFields);
