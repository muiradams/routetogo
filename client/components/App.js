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
      destinationAirport: '',
      advancedOptions: { nonstop: false, airline: 'all' },
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

  handleSourceAirportInput(sourceAirport) {
    this.setState({ sourceAirport });
  }

  handleDestinationAirportInput(destinationAirport) {
    this.setState({ destinationAirport });
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
      destinationAirport,
      advancedOptions: { nonstop, airline },
    } = this.state;
    let airlineQuery;

    if (airline === 'all') {
      airlineQuery = '';
    } else {
      airlineQuery = airline;
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
      this.handleErrorMessage('Both departure and destination airports must be provided.');
      return;
    }

    if (!nonstop && !airlineQuery) {
      this.handleErrorMessage('An airline must be provided.');
      return;
    }

    const query = {
      sourceAirport,
      destinationAirport,
      advancedOptions: {
        nonstop,
        airline: airlineQuery,
      },
    };

    this.setState({ query });
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;

    if (errorMessage) {
      return <div className="error">{errorMessage}</div>;
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
        <h1 id="site-title"><i className="fa fa-plane"></i>RouteToGo</h1>
        <h2 id="site-description">Find all possible flight routes between two cities.</h2>
        <SearchFieldsWithData
          onSourceAirportInput={this.handleSourceAirportInput}
          onDestinationAirportInput={this.handleDestinationAirportInput}
        />
        <SearchAdvancedWithData
          onAdvancedOptionsInput={this.handleAdvancedOptionsInput}
        />
        <SearchButton onSubmit={this.createQuery} />
        <div>
          {this.renderErrorMessage()}
          {this.renderRouteList()}
        </div>
      </div>
    );
  }
}
