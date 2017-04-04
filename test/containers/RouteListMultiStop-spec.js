/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RouteListMultiStopComponent } from '../../client/containers/RouteListMultiStop';
import RouteList from '../../client/components/RouteList';

describe('<RouteListMultiStop />', () => {
  let wrapper;
  const onErrorMessage = () => {};
  const routeDataLoading = {
    loading: true,
    allRoutes: {
      nodes: [],
    },
  };
  const routeDataEmpty = {
    loading: false,
    allRoutes: {
      nodes: [],
    },
  };
  const routeDataLoaded = {
    loading: false,
    allRoutes: {
      nodes: [{
        nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==',
        airline: {
          name: 'United Airlines',
        },
        sourceAirport: {
          name: 'Arcata Airport',
          iata: 'ACV',
          latitude: 40.978099822998,
          longitude: -124.109001159668,
        },
        firstStop: {
          name: 'Jack Mc Namara Field Airport',
          iata: 'CEC',
          latitude: 41.78020096,
          longitude: -124.2369995,
          secondStop: {
            nodes: [
              {
                airport: {
                  iata: 'CDG',
                  name: 'Charles de Gaulle International Airport',
                  latitude: 49.0127983093,
                  longitude: 2.54999995232,
                  finalAirports: {
                    nodes: [],
                  },
                },
              },
              {
                airport: {
                  iata: 'ORD',
                  name: 'Chicago O\'Hare International Airport',
                  latitude: 41.97859955,
                  longitude: -87.90480042,
                  finalAirports: {
                    nodes: [
                      {
                        airport: {
                          iata: 'CDG',
                          name: 'Charles de Gaulle International Airport',
                          latitude: 49.0127983093,
                          longitude: 2.54999995232,
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        nodeId: 'WyJyb3V0ZXMiLDU1NzY5XQ==',
        airline: {
          name: 'United Airlines',
        },
        sourceAirport: {
          name: 'Arcata Airport',
          iata: 'ACV',
          latitude: 40.978099822998,
          longitude: -124.109001159668,
        },
        firstStop: {
          name: 'San Francisco International Airport',
          iata: 'SFO',
          latitude: 37.6189994812012,
          longitude: -122.375,
          secondStop: {
            nodes: [
              {
                airport: {
                  iata: 'LAX',
                  name: 'Los Angeles International Airport',
                  latitude: 33.94250107,
                  longitude: -118.4079971,
                  finalAirports: {
                    nodes: [
                      {
                        airport: {
                          iata: 'CDG',
                          name: 'Charles de Gaulle International Airport',
                          latitude: 49.0127983093,
                          longitude: 2.54999995232,
                        },
                      },
                    ],
                  },
                },
              },
              {
                airport: {
                  iata: 'ORD',
                  name: 'Chicago O\'Hare International Airport',
                  latitude: 41.97859955,
                  longitude: -87.90480042,
                  finalAirports: {
                    nodes: [],
                  },
                },
              },
            ],
          },
        },
      }],
    },
  };

  const expectedRoutes = [{
    nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==',
    airline: 'United Airlines',
    airports: [{
      iata: 'ACV',
      name: 'Arcata Airport',
      latitude: 40.978099822998,
      longitude: -124.109001159668,
    },
    {
      name: 'Jack Mc Namara Field Airport',
      iata: 'CEC',
      latitude: 41.78020096,
      longitude: -124.2369995,
    },
    {
      iata: 'CDG',
      name: 'Charles de Gaulle International Airport',
      latitude: 49.0127983093,
      longitude: 2.54999995232,
    }],
  },
  {
    nodeId: 'WyJyb3V0ZXMiLDU1NzY4XQ==',
    airline: 'United Airlines',
    airports: [{
      iata: 'ACV',
      name: 'Arcata Airport',
      latitude: 40.978099822998,
      longitude: -124.109001159668,
    },
    {
      name: 'Jack Mc Namara Field Airport',
      iata: 'CEC',
      latitude: 41.78020096,
      longitude: -124.2369995,
    },
    {
      iata: 'ORD',
      name: 'Chicago O\'Hare International Airport',
      latitude: 41.97859955,
      longitude: -87.90480042,
    },
    {
      iata: 'CDG',
      name: 'Charles de Gaulle International Airport',
      latitude: 49.0127983093,
      longitude: 2.54999995232,
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
    },
    {
      iata: 'LAX',
      name: 'Los Angeles International Airport',
      latitude: 33.94250107,
      longitude: -118.4079971,
    },
    {
      iata: 'CDG',
      name: 'Charles de Gaulle International Airport',
      latitude: 49.0127983093,
      longitude: 2.54999995232,
    }],
  }];

  beforeEach(() => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoaded}
      onErrorMessage={onErrorMessage}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders a div if the routeData is loading', () => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoading}
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('renders a <RouteList /> if there are routes', () => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoaded}
      destinationAirport="CDG"
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find(RouteList)).to.have.length(1);
  });

  it('shows an error message when there are no routes', () => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoaded}
      destinationAirport="ABC"
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('clears error message with onErrorMessage when there are routes', () => {
    const handleErrorMessageSpy = spy();
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoading}
      onErrorMessage={handleErrorMessageSpy}
    />);
    wrapper.setProps({ routeData: routeDataEmpty });
    expect(wrapper.find('div')).to.have.length(1);
    wrapper.setProps({ routeData: routeDataLoaded });
    expect(handleErrorMessageSpy.calledWith('')).to.equal(true);
  });

  it('passes routes to <RouteList /> as a prop', () => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoaded}
      destinationAirport="CDG"
      onErrorMessage={onErrorMessage}
    />);
    const routeList = wrapper.find(RouteList);
    expect(routeList.prop('routes')).to.eql(expectedRoutes);
  });

  it('createRoutesFromData takes routeData and converts it into routes', () => {
    wrapper = shallow(<RouteListMultiStopComponent
      routeData={routeDataLoaded}
      destinationAirport="CDG"
      onErrorMessage={onErrorMessage}
    />);
    const routes = wrapper.instance().createRoutesFromData(routeDataLoaded.allRoutes.nodes);
    expect(routes).to.eql(expectedRoutes);
  });
});
