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
      departureCity: '',
      destinationCity: '',
      advancedOptions: {},
    };
    this.fetchRoutes = this.fetchRoutes.bind(this);
    this.handleDepartureCityInput = this.handleDepartureCityInput.bind(this);
    this.handleDestinationCityInput = this.handleDestinationCityInput.bind(this);
  }

  fetchRoutes() {

  }

  handleDepartureCityInput(departureCity) {
    this.setState({ departureCity });
  }

  handleDestinationCityInput(destinationCity) {
    this.setState({ destinationCity });
  }

  render() {
    return (
      <div>
        <h1 id="site-title">ROUTE to GO</h1>
        <h2 id="site-description">Find all possible flight routes between two cities.</h2>
        <SearchFields
          onDepartureCityInput={this.handleDepartureCityInput}
          onDestinationCityInput={this.handleDestinationCityInput}
        />
        <SearchAdvanced />
        <SearchButton onSubmit={this.fetchRoutes} />
        <RouteMap />
        <RouteList />
        <div>City: {this.state.routes}</div>
      </div>
    );
  }
}