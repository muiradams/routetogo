/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RouteListOneStopComponent } from '../../client/containers/RouteListOneStop';
import RouteList from '../../client/components/RouteList';

describe('<RouteListOneStop />', () => {
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
        secondAirport: {
          name: 'Jack Mc Namara Field Airport',
          iata: 'CEC',
          latitude: 41.78020096,
          longitude: -124.2369995,
          nextAirport: {
            nodes: [
              {
                finalAirport: {
                  iata: 'DEN',
                  name: 'Denver International Airport',
                  latitude: 39.861698150635,
                  longitude: -104.672996521,
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
        airportByDestinationAirportId: {
          name: 'San Francisco International Airport',
          iata: 'SFO',
          latitude: 37.6189994812012,
          longitude: -122.375,
          nextAirport: {
            nodes: [
              {
                finalAirport: {
                  iata: 'LAX',
                  name: 'Los Angeles International Airport',
                  latitude: 33.94250107,
                  longitude: -118.4079971,
                },
              },
            ],
          },
        },
      }],
    },
  };

  beforeEach(() => {
    wrapper = shallow(<RouteListOneStopComponent
      routeData={routeDataLoaded}
      onErrorMessage={onErrorMessage}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders a div if the routeData is loading', () => {
    wrapper = shallow(<RouteListOneStopComponent
      routeData={routeDataLoading}
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('renders a <RouteList /> if there are routes', () => {
    wrapper = shallow(<RouteListOneStopComponent
      routeData={routeDataLoaded}
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find(RouteList)).to.have.length(1);
  });

  it('should send an error message to onErrorMessage when there are no routes', () => {
    const handleErrorMessageSpy = spy();
    wrapper = shallow(<RouteListOneStopComponent
      routeData={routeDataLoading}
      onErrorMessage={handleErrorMessageSpy}
    />);
    wrapper.setProps({ routeData: routeDataEmpty });
    expect(handleErrorMessageSpy.called).to.equal(true);
  });

  it('passes routes to <RouteList /> as a prop', () => {
    wrapper = shallow(<RouteListOneStopComponent
      routeData={routeDataEmpty}
      onErrorMessage={onErrorMessage}
    />);
    const routeList = wrapper.find(RouteList);
    expect(routeList.prop('routes')).to.eql([]);
  });

  it('createRoutesFromData takes routeData and converts it into routes', () => {
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
    const routes = wrapper.instance().createRoutesFromData(routeDataLoaded.allRoutes.nodes);
    expect(routes).to.eql(expectedRoutes);
  });
});
