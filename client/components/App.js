import React, { Component } from 'react';
import SearchFields from './SearchFields';
import SearchAdvanced from './SearchAdvanced';
import SearchButton from './SearchButton';
import RouteMap from './RouteMap';
import RouteList from './RouteList';

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
  }

  fetchRoutes() {
    console.log('fetching routes...');
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
        <RouteMap selectedRoute={this.state.selectedRoute} />
        <RouteList
          routes={this.state.routes}
          onSelectedRouteInput={this.handleSelectedRouteInput}
        />
        <div>City: {this.state.routes}</div>
      </div>
    );
  }
}
