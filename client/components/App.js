import React, { Component } from 'react';
import SearchFieldsWithData from '../containers/SearchFields';
import SearchButton from './SearchButton';
import SearchAdvancedWithData from '../containers/SearchAdvanced';
import RouteListNonstop from '../containers/RouteListNonstop';
import RouteListMultiStop from '../containers/RouteListMultiStop';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceAirport: '',
      isSourceValid: true,
      destinationAirport: '',
      isDestinationValid: true,
      advancedOptions: { nonstop: false, airline: '', isAirlineValid: true },
      query: {},
      errorMessage: '',
    };

    this.handleSourceAirportInput = this.handleSourceAirportInput.bind(this);
    this.handleDestinationAirportInput = this.handleDestinationAirportInput.bind(this);
    this.handleAdvancedOptionsInput = this.handleAdvancedOptionsInput.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.createQuery = this.createQuery.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.renderRouteList = this.renderRouteList.bind(this);
  }

  handleSourceAirportInput({ sourceAirport, isSourceValid }) {
    this.setState({ sourceAirport, isSourceValid });
  }

  handleDestinationAirportInput({ destinationAirport, isDestinationValid }) {
    this.setState({ destinationAirport, isDestinationValid });
  }

  handleAdvancedOptionsInput(advancedOptions) {
    this.setState({ advancedOptions });
  }

  handleErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  createQuery() {
    const {
      sourceAirport,
      isSourceValid,
      destinationAirport,
      isDestinationValid,
      advancedOptions: { nonstop, airline, isAirlineValid },
    } = this.state;

    if(!isSourceValid) {
      this.handleErrorMessage('Please choose a valid source airport.');
      return;
    }

    if(!isDestinationValid) {
      this.handleErrorMessage('Please choose a valid destination airport.');
      return;
    }

    if (!isAirlineValid) {
      this.handleErrorMessage('Please choose a valid airline.');
      return;
    }

    if (!sourceAirport && !destinationAirport) {
      this.handleErrorMessage('Either departure or destination airport must be provided for nonstop routes.');
      return;
    }

    if (sourceAirport === destinationAirport) {
      this.handleErrorMessage('Departure and destination airports must be different.');
      return;
    }

    if (!nonstop && (!sourceAirport || !destinationAirport)) {
      this.handleErrorMessage('Both departure and destination airports must be provided for routes with stops.');
      return;
    }

    if (!nonstop && !airline) {
      this.handleErrorMessage('Airline must be provided for routes with stops.');
      return;
    }

    const query = {
      sourceAirport,
      destinationAirport,
      advancedOptions: {
        nonstop,
        airline,
      },
    };

    this.setState({ query });
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;

    if (errorMessage) {
      return <div className="error alert alert-danger">{errorMessage}</div>;
    }

    return null;
  }

  renderRouteList() {
    function isEmpty(object) {
      return Object.keys(object).length === 0;
    }

    if (!isEmpty(this.state.query)) {
      let {
        sourceAirport,
        destinationAirport,
        advancedOptions: {
          nonstop,
          airline,
        },
      } = this.state.query;

      sourceAirport = sourceAirport.toUpperCase();
      destinationAirport = destinationAirport.toUpperCase();

      const props = { onErrorMessage: this.handleErrorMessage };

      let queryProps;

      if (sourceAirport) {
        if (destinationAirport) {
          if (airline) {
            queryProps = { airline, sourceAirport, destinationAirport };
          } else {
            queryProps = { sourceAirport, destinationAirport };
          }
        } else if (airline) {
          queryProps = { airline, sourceAirport };
        } else {
          queryProps = { sourceAirport };
        }
      } else if (airline) {
        queryProps = { airline, destinationAirport };
      } else {
        queryProps = { destinationAirport };
      }

      if (nonstop) {
        return <RouteListNonstop {...props} {...queryProps} />;
      }

      return <RouteListMultiStop {...props} {...queryProps} />;
    }

    // A query is not yet set, so don't display anything
    return null;
  }

  render() {
    return (
      <div className="app">
        <h1 id="site-title"><i className="fa fa-plane" />RouteToGo</h1>
        <h2 id="site-description">Find all flight routes between two cities.</h2>
        <SearchFieldsWithData
          onSourceAirportInput={this.handleSourceAirportInput}
          onDestinationAirportInput={this.handleDestinationAirportInput}
        />
        <SearchAdvancedWithData
          onAdvancedOptionsInput={this.handleAdvancedOptionsInput}
        />
        <SearchButton onSubmit={this.createQuery} />
        <div className="query-results">
          {this.renderErrorMessage()}
          {this.renderRouteList()}
        </div>
      </div>
    );
  }
}
