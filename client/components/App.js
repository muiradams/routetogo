import React, { Component } from 'react';
import SearchFields from './SearchFields';
import SearchAdvanced from './SearchAdvanced';
import SearchButton from './SearchButton';
import RouteMap from './RouteMap';
import RouteList from './RouteList';
import seedData from '../../data/seed-data-for-dev.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      selectedRoute: {},
      departureCity: '',
      destinationCity: '',
      advancedOptions: {},
    };
    this.fetchRoutes = this.fetchRoutes.bind(this);
    this.handleDepartureCityInput = this.handleDepartureCityInput.bind(this);
    this.handleDestinationCityInput = this.handleDestinationCityInput.bind(this);
    this.handleAdvancedOptionsInput = this.handleAdvancedOptionsInput.bind(this);
    this.handleSelectedRouteInput = this.handleSelectedRouteInput.bind(this);
  }

  fetchRoutes() {
    console.log(`fetching routes for ${this.state.departureCity} to ${this.state.destinationCity}...`);
    this.setState({ routes: seedData.data.allRoutes.nodes });
  }

  handleDepartureCityInput(departureCity) {
    this.setState({ departureCity });
  }

  handleDestinationCityInput(destinationCity) {
    this.setState({ destinationCity });
  }

  handleAdvancedOptionsInput(advancedOptions) {
    this.setState({ advancedOptions });
  }

  handleSelectedRouteInput(selectedRoute) {
    this.setState({ selectedRoute });
  }

  render() {
    const selectedRoute = this.state.selectedRoute;
    let selectedRouteId = '';
    if (selectedRoute) {
      if (selectedRoute.nodeId) {
        selectedRouteId = selectedRoute.nodeId;
      }
    }

    return (
      <div>
        <h1 id="site-title">ROUTE to GO</h1>
        <h2 id="site-description">Find all possible flight routes between two cities.</h2>
        <SearchFields
          departureCity={this.state.departureCity}
          destinationCity={this.state.destinationCity}
          onDepartureCityInput={this.handleDepartureCityInput}
          onDestinationCityInput={this.handleDestinationCityInput}
        />
        <SearchAdvanced
          advancedOptions={this.state.advancedOptions}
          onAdvancedOptionsInput={this.handleAdvancedOptionsInput}
        />
        <SearchButton onSubmit={this.fetchRoutes} />
        {this.state.routes.length > 0 &&
          <div>
            <RouteMap selectedRoute={this.state.selectedRoute} />
            <RouteList
              routes={this.state.routes}
              selectedRouteId={selectedRouteId}
              onSelectedRouteInput={this.handleSelectedRouteInput}
            />
          </div>
        }
      </div>
    );
  }
}
