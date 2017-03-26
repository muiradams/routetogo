/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { RouteListNonstopComponent } from '../../client/containers/RouteListNonstop';
import RouteList from '../../client/components/RouteList';

describe('<RouteListNonstop />', () => {
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
        sourceAirport: 'ACV',
        destinationAirport: 'CEC',
        airlineByAirlineId: {
          name: 'United Airlines',
        },
        airportBySourceAirportId: {
          nodeId: 'WyJhaXJwb3J0cyIsNDM4NF0=',
          name: 'Arcata Airport',
          iata: 'ACV',
          city: 'Arcata CA',
          country: 'United States',
          latitude: 40.978099822998,
          longitude: -124.109001159668,
        },
        airportByDestinationAirportId: {
          nodeId: 'WyJhaXJwb3J0cyIsNTcyN10=',
          name: 'Jack Mc Namara Field Airport',
          iata: 'CEC',
          city: 'Crescent City',
          country: 'United States',
          latitude: 41.78020096,
          longitude: -124.2369995,
        },
      }],
    },
  };

  beforeEach(() => {
    wrapper = shallow(<RouteListNonstopComponent
      routeData={routeDataLoaded}
      onErrorMessage={onErrorMessage}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders a div if the routeData is loading', () => {
    wrapper = shallow(<RouteListNonstopComponent
      routeData={routeDataLoading}
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('renders a <RouteList /> if there are routes', () => {
    wrapper = shallow(<RouteListNonstopComponent
      routeData={routeDataLoaded}
      onErrorMessage={onErrorMessage}
    />);
    expect(wrapper.find(RouteList)).to.have.length(1);
  });

  it('should send an error message to onErrorMessage when there are no routes', () => {
    const handleErrorMessageSpy = spy();
    wrapper = shallow(<RouteListNonstopComponent
      routeData={routeDataLoading}
      onErrorMessage={handleErrorMessageSpy}
    />);
    wrapper.setProps({ routeData: routeDataEmpty });
    expect(handleErrorMessageSpy.called).to.equal(true);
  });

  it('passes routes to <RouteList /> as a prop', () => {
    wrapper = shallow(<RouteListNonstopComponent
      routeData={routeDataEmpty}
      onErrorMessage={onErrorMessage}
    />);
    const routeList = wrapper.find(RouteList);
    expect(routeList.prop('routes')).to.eql([]);
  });

  // FUNCTION LOGIC
  context('createRoutesFromData function', () => {
    it('takes routeData and converts it into an array of routes');
  });
});
