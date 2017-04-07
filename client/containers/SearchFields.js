import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import airportsQuery from '../queries/airports';

// Only show suggestions when input value is at least 3 characters long
const shouldRenderSuggestions = value => value.trim().length > 2;

const getSuggestionValue = suggestion => `(${suggestion.iata}) ${suggestion.name}`;

const renderSuggestion = suggestion => (
  <div>
    ({suggestion.iata}) {suggestion.name}
  </div>
);

export class SearchFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceValue: '',
      sourceIATA: '',
      sourceName: '',
      destinationValue: '',
      destinationIATA: '',
      destinationName: '',
      suggestions: [],
    };
    this.setSourceAirport = this.setSourceAirport.bind(this);
    this.setDestinationAirport = this.setDestinationAirport.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSourceSelected = this.onSourceSelected.bind(this);
    this.onDestinationSelected = this.onDestinationSelected.bind(this);
    this.isSourceValid = this.isSourceValid.bind(this);
    this.isDestinationValid = this.isDestinationValid.bind(this);
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

  onSourceSelected(event, { suggestion: source }) {
    this.setState({ sourceIATA: source.iata, sourceName: source.name });
    this.props.onSourceAirportInput({ sourceAirport: source.iata, isSourceValid: true });
  }

  onDestinationSelected(event, { suggestion: destination }) {
    this.setState({ destinationIATA: destination.iata, destinationName: destination.name });
    this.props.onDestinationAirportInput({ destinationAirport: destination.iata, isDestinationValid: true });
  }

  setSourceAirport(event, { newValue }) {
    const { sourceIATA } = this.state;
    let isSourceValid = true;

    if (newValue) {
      isSourceValid = this.isSourceValid(newValue);
    }

    this.setState({ sourceValue: newValue });
    this.props.onSourceAirportInput({ sourceAirport: sourceIATA, isSourceValid });
  }

  setDestinationAirport(event, { newValue }) {
    const { destinationIATA } = this.state;
    let isDestinationValid = true;

    if (newValue) {
      isDestinationValid = this.isDestinationValid(newValue);
    }

    this.setState({ destinationValue: newValue });
    this.props.onDestinationAirportInput({ destinationAirport: destinationIATA, isDestinationValid });
  }

  isSourceValid(sourceValue) {
    const { sourceIATA, sourceName } = this.state;
    return sourceValue === getSuggestionValue({ name: sourceName, iata: sourceIATA });
  }

  isDestinationValid(destinationValue) {
    const { destinationIATA, destinationName } = this.state;
    return destinationValue === getSuggestionValue({ name: destinationName, iata: destinationIATA });
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
          onSuggestionSelected={this.onSourceSelected}
          shouldRenderSuggestions={shouldRenderSuggestions}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={sourceInputProps}
        />
        <Autosuggest
          id="destination"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onDestinationSelected}
          shouldRenderSuggestions={shouldRenderSuggestions}
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
