import React, { Component } from 'react';
import SearchFields from './SearchFields';
import SearchAdvanced from './SearchAdvanced';
import SearchButton from './SearchButton';
import RouteListNonstop from '../containers/RouteListNonstop';
import RouteListOneStop from '../containers/RouteListOneStop';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceAirport: '',
      destinationAirport: '',
      advancedOptions: { stops: '0', airline: 'all', alliance: 'none' },
      query: {},
      errorMessage: '',
    };

    this.handleSourceAirportInput = this.handleSourceAirportInput.bind(this);
    this.handleDestinationAirportInput = this.handleDestinationAirportInput.bind(this);
    this.handleAdvancedOptionsInput = this.handleAdvancedOptionsInput.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
    this.createQuery = this.createQuery.bind(this);
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
    // console.log('Error: ', errorMessage);
  }

  createQuery() {
    const {
      sourceAirport,
      destinationAirport,
      advancedOptions: { stops, airline, alliance },
    } = this.state;
    const numStops = Number(stops);
    let airlineQuery;

    if (airline === 'all') {
      airlineQuery = '';
    } else {
      airlineQuery = airline;
    }

    let allianceQuery;

    if (alliance === 'none') {
      allianceQuery = '';
    } else {
      allianceQuery = alliance;
    }

    if (!sourceAirport && !destinationAirport) {
      this.setState({ errorMessage: 'Either departure or destination airport must be provided for nonstop routes.' });
      return;
    }

    if (stops > 0 && (!sourceAirport || !destinationAirport)) {
      this.setState({ errorMessage: 'Both departure and destination airports must be provided if there are stops.' });
      return;
    }

    const query = {
      sourceAirport,
      destinationAirport,
      advancedOptions: {
        stops: numStops,
        airline: airlineQuery,
        alliance: allianceQuery,
      },
    };

    this.setState({ query });
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
          stops,
          airline,
          alliance,
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

      if (stops === 0) {
        return <RouteListNonstop {...props} {...queryProps} />;
      }

      if (stops === 1) {
        return <RouteListOneStop {...props} {...queryProps} />;
      }
    }

    // A query is not set yet, so display nothing
    return null;
  }

  render() {
    return (
      <div>
        <h1 id="site-title">ROUTE to GO</h1>
        <h2 id="site-description">Find all possible flight routes between two cities.</h2>
        <SearchFields
          sourceAirport={this.state.sourceAirport}
          destinationAirport={this.state.destinationAirport}
          onSourceAirportInput={this.handleSourceAirportInput}
          onDestinationAirportInput={this.handleDestinationAirportInput}
        />
        <SearchAdvanced
          onAdvancedOptionsInput={this.handleAdvancedOptionsInput}
        />
        <SearchButton onSubmit={this.createQuery} />
        <div>
          {this.renderRouteList()}
        </div>
      </div>
    );
  }
}
