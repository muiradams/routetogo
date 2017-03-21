/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import App from '../../client/components/App';
import SearchFields from '../../client/components/SearchFields';
import SearchAdvanced from '../../client/components/SearchAdvanced';
import SearchButton from '../../client/components/SearchButton';
import RouteMap from '../../client/components/RouteMap';
import RouteList from '../../client/components/RouteList';

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  context('renders all child components', () => {
    it('shows the title of the page as an h1', () => {
      expect(wrapper.find('h1')).to.exist;
      expect(wrapper.find('h1')).to.have.id('site-title');
    });

    it('shows a description of the page as an h2', () => {
      expect(wrapper.find('h2')).to.exist;
      expect(wrapper.find('h2')).to.have.id('site-description');
    });

    it('shows a <SearchFields /> component', () => {
      expect(wrapper.find(SearchFields)).to.have.length(1);
    });

    it('shows a <SearchAdvanced /> component', () => {
      expect(wrapper.find(SearchAdvanced)).to.have.length(1);
    });

    it('shows a <SearchButton /> component', () => {
      expect(wrapper.find(SearchButton)).to.have.length(1);
    });

    it('shows a <RouteMap /> component if there are routes', () => {
      wrapper.setState({ routes: ['SFO', 'CDG'] })
      expect(wrapper.find(RouteMap)).to.have.length(1);
    });

    it('doesn\'t show <RouteMap /> component if there aren\'t routes', () => {
      expect(wrapper.find(RouteMap)).to.have.length(0);
    });

    it('shows a <RouteList /> component if there are routes', () => {
      wrapper.setState({ routes: ['SFO', 'CDG'] });
      expect(wrapper.find(RouteList)).to.have.length(1);
    });

    it('doesn\'t show <RouteList /> component if there aren\'t routes', () => {
      expect(wrapper.find(RouteList)).to.have.length(0);
    });
  });

  context('state is initialized correctly', () => {
    it('starts with an empty list of routes', () => {
      expect(wrapper.state('routes')).to.eql([]);
    });

    it('starts with an empty selectedRoute', () => {
      expect(wrapper.state('selectedRoute')).to.eql({});
    });

    it('starts with an empty departureCity', () => {
      expect(wrapper.state('departureCity')).to.eql('');
    });

    it('starts with an empty destinationCity', () => {
      expect(wrapper.state('destinationCity')).to.eql('');
    });

    it('starts with an empty advancedOptions', () => {
      expect(wrapper.state('advancedOptions')).to.eql({});
    });
  });

  context('updates the state', () => {
    it('adds departureCity to state', () => {
      wrapper.instance().handleDepartureCityInput('SMF');
      expect(wrapper.state('departureCity')).to.eql('SMF');
    });

    it('adds destinationCity to state', () => {
      wrapper.instance().handleDestinationCityInput('SMF');
      expect(wrapper.state('destinationCity')).to.eql('SMF');
    });

    it('adds advancedOptions to state', () => {
      wrapper.instance().handleAdvancedOptionsInput({ alliance: 'oneworld' });
      expect(wrapper.state('advancedOptions')).to.eql({ alliance: 'oneworld' });
    });

    it('adds selectedRoute to state', () => {
      wrapper.instance().handleSelectedRouteInput({ alliance: 'oneworld' });
      expect(wrapper.state('selectedRoute')).to.eql({ alliance: 'oneworld' });
    });
  });

  context('sends the correct props to <SearchFields />', () => {
    it('passes departureCity to SearchFields', () => {
      wrapper = mount(<App />);
      const searchFields = wrapper.find(SearchFields);
      wrapper.setState({ departureCity: 'SFO' });
      const departureCity = wrapper.state('departureCity');
      expect(searchFields.prop('departureCity')).to.equal(departureCity);
    });

    it('passes destinationCity to SearchFields', () => {
      wrapper = mount(<App />);
      const searchFields = wrapper.find(SearchFields);
      wrapper.setState({ destinationCity: 'CDG' });
      const destinationCity = wrapper.state('destinationCity');
      expect(searchFields.prop('destinationCity')).to.equal(destinationCity);
    });

    it('passes handleDepartureCityInput function to SearchFields', () => {
      const searchFields = wrapper.find(SearchFields);
      const handleDepartureCityInput = wrapper.instance().handleDepartureCityInput;
      expect(searchFields.prop('onDepartureCityInput')).to.eql(handleDepartureCityInput);
    });

    it('passes handleDestinationCityInput function to SearchFields', () => {
      const searchFields = wrapper.find(SearchFields);
      const handleDestinationCityInput = wrapper.instance().handleDestinationCityInput;
      expect(searchFields.prop('onDestinationCityInput')).to.eql(handleDestinationCityInput);
    });
  });

  context('sends the correct props to <SearchAdvanced />', () => {
    it('passes advancedOptions to SearchAdvanced', () => {
      wrapper = mount(<App />);
      const searchAdvanced = wrapper.find(SearchAdvanced);
      wrapper.setState({ advancedOptions: { alliance: 'oneworld' } });
      const advancedOptions = wrapper.state('advancedOptions');
      expect(searchAdvanced.prop('advancedOptions')).to.equal(advancedOptions);
    });

    it('passes handleAdvancedOptionsInput function to SearchAdvanced', () => {
      const searchAdvanced = wrapper.find(SearchAdvanced);
      const handleAdvancedOptionsInput = wrapper.instance().handleAdvancedOptionsInput;
      expect(searchAdvanced.prop('onAdvancedOptionsInput')).to.eql(handleAdvancedOptionsInput);
    });
  });

  context('sends the correct props to <SearchButton />', () => {
    it('passes fetchRoute function to SearchButton', () => {
      const searchButton = wrapper.find(SearchButton);
      const fetchRoutes = wrapper.instance().fetchRoutes;
      expect(searchButton.prop('onSubmit')).to.eql(fetchRoutes);
    });
  });

  context('sends the correct props to <RouteMap />', () => {
    it('passes selectedRoute to routeMap', () => {
      wrapper = mount(<App />);
      // first add routes so that RouteMap is rendered
      wrapper.setState({ routes: ['SFO', 'CDG'] });
      const routeMap = wrapper.find(RouteMap);
      wrapper.setState({ selectedRoute: { departureCity: 'SFO', destinationCity: 'CDG' } });
      const selectedRoute = wrapper.state('selectedRoute');
      expect(routeMap.prop('selectedRoute')).to.equal(selectedRoute);
    });
  });

  context('sends the correct props to <RouteList />', () => {
    it('passes routes to routeList', () => {
      wrapper = mount(<App />);
      // first add routes so that RouteList is rendered
      wrapper.setState({ routes: ['SFO', 'CDG'] });
      const routeList = wrapper.find(RouteList);
      wrapper.setState({
        routes: ['dog', 'cat'],
      });
      const routes = wrapper.state('routes');
      expect(routeList.prop('routes')).to.eql(routes);
    });

    it('passes selectedRoute to routeList', () => {
      wrapper = mount(<App />);
      // first add routes so that RouteList is rendered
      wrapper.setState({ routes: ['SFO', 'CDG'] });
      const routeList = wrapper.find(RouteList);
      wrapper.setState({
        selectedRoute: { nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==' },
      });
      const selectedRouteId = wrapper.state('selectedRoute').nodeId;
      expect(routeList.prop('selectedRouteId')).to.eql(selectedRouteId);
    });

    it('passes handleSelectedRouteInput function to RouteList', () => {
      // first add routes so that RouteList is rendered
      wrapper.setState({ routes: ['SFO', 'CDG'] });
      const routeList = wrapper.find(RouteList);
      const handleSelectedRouteInput = wrapper.instance().handleSelectedRouteInput;
      expect(routeList.prop('onSelectedRouteInput')).to.eql(handleSelectedRouteInput);
    });
  });

  context('fetchRoutes function', () => {
    it('validates that there is departure or destination city, else throws error');
    it('async queries GraphQL for data and adds fetched routes to state');
  });
});
