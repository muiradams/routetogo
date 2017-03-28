/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RouteList from '../../client/components/RouteList';
import RouteMap from '../../client/components/RouteMap';
import Route from '../../client/components/Route';

describe('<RouteList />', () => {
  let wrapper;
  const onSelectedRouteInput = () => {};
  const onErrorMessage = () => {};
  const props = { onSelectedRouteInput, onErrorMessage };
  const selectedRoute = {
    nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==',
    sourceAirport: 'SFO',
    destinationAirport: 'CDG',
  };
  const routes = [{
    nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==',
    airline: 'United Airlines',
    airports: [{
      iata: 'ACV',
      name: 'Arcata Airport',
      latitude: 40.978099822998,
      longitude: -124.109001159668,
    },
    {
      iata: 'CEC',
      name: 'Jack Mc Namara Field Airport',
      latitude: 41.78020096,
      longitude: -124.2369995,
    }],
  },
  {
    nodeId: 'WyJyb3V0ZXMiLDU1NzY5XQ==',
    airline: 'United Airlines',
    airports: [{
      iata: 'ACV',
      name: 'Arcata Airport',
      latitude: 40.978099822998,
      longitude: -124.109001159668,
    },
    {
      iata: 'SFO',
      name: 'San Francisco International Airport',
      latitude: 37.6189994812012,
      longitude: -122.375,
    }],
  }];

  beforeEach(() => {
    wrapper = shallow(<RouteList
      routes={routes}
      onSelectedRouteInput={onSelectedRouteInput}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows a <RouteMap /> component', () => {
    expect(wrapper.find(RouteMap)).to.have.length(1);
  });

  it('passes selectedRoute to <RouteMap /> as props', () => {
    wrapper.setState({ selectedRoute });
    const routeMap = wrapper.find(RouteMap);
    const selectedRouteState = wrapper.state('selectedRoute');
    expect(routeMap.prop('selectedRoute')).to.equal(selectedRouteState);
  });

  it('renders zero routes', () => {
    wrapper = shallow(<RouteList {...props} />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders undefined routes', () => {
    wrapper = shallow(<RouteList routes={undefined} {...props} />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders routes', () => {
    expect(wrapper.find(Route)).to.have.length(2);
  });

  it('passes route to <Route /> as a prop', () => {
    const route = wrapper.find(Route).at(0);
    expect(route.prop('route')).to.eql(routes[0]);
  });

  it('highlights the first route if selectedRouteId prop is empty', () => {
    wrapper = shallow(<RouteList routes={routes} {...props} />);
    expect(wrapper.find('li').at(0)).to.have.className('highlight');
  });

  it('highlights one selected route based on selectedRouteId prop', () => {
    wrapper = shallow(<RouteList routes={routes} selectedRouteId={'WyJyb3V0ZXMiLDU1NzcwXQ=='} {...props} />);
    expect(wrapper.find('li.highlight')).to.have.length(1);
  });

  it('should set selectedRoute state with correct route when route is clicked', () => {
    const secondRoute = wrapper.find('li').at(1);
    secondRoute.simulate('click');
    expect(wrapper.state('selectedRoute')).to.equal(routes[1]);
  });
});
