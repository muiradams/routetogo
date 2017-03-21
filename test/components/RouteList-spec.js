/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import RouteList from '../../client/components/RouteList';

describe('<RouteList />', () => {
  let wrapper;
  const onSelectedRouteInput = () => {};
  const props = { onSelectedRouteInput };
  const seedData = [
    {
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
    },
    {
      nodeId: 'WyJyb3V0ZXMiLDU1NzY5XQ==',
      sourceAirport: 'ACV',
      destinationAirport: 'SFO',
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
        nodeId: 'WyJhaXJwb3J0cyIsMzQ2OV0=',
        name: 'San Francisco International Airport',
        iata: 'SFO',
        city: 'San Francisco',
        country: 'United States',
        latitude: 37.6189994812012,
        longitude: -122.375,
      },
    },
    {
      nodeId: 'WyJyb3V0ZXMiLDU1NzcwXQ==',
      sourceAirport: 'ACV',
      destinationAirport: 'SMF',
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
        nodeId: 'WyJhaXJwb3J0cyIsMzgxN10=',
        name: 'Sacramento International Airport',
        iata: 'SMF',
        city: 'Sacramento',
        country: 'United States',
        latitude: 38.6954002380371,
        longitude: -121.591003417969,
      },
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<RouteList
      routes={seedData}
      onSelectedRouteInput={onSelectedRouteInput}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('renders zero routes', () => {
    wrapper = shallow(<RouteList />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders undefined routes', () => {
    wrapper = shallow(<RouteList routes={undefined} />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders routes', () => {
    expect(wrapper.find('li')).to.have.length(3);
  });

  it('highlights the first route if selectedRouteId prop is empty', () => {
    wrapper = shallow(<RouteList routes={seedData} {...props} />);
    expect(wrapper.find('li').at(0)).to.have.className('highlight');
  });

  it('highlights one selected route based on selectedRouteId prop', () => {
    wrapper = shallow(<RouteList routes={seedData} selectedRouteId={'WyJyb3V0ZXMiLDU1NzcwXQ=='} {...props} />);
    expect(wrapper.find('li.highlight')).to.have.length(1);
  });

  it('should call onSelectedRouteInput with correct route when route is clicked', () => {
    const setSelectedRouteSpy = spy();
    wrapper = shallow(<RouteList routes={seedData} onSelectedRouteInput={setSelectedRouteSpy} />);
    const secondRoute = wrapper.find('li').at(1);
    secondRoute.simulate('click');
    expect(setSelectedRouteSpy.calledOnce).to.equal(true);
    expect(setSelectedRouteSpy.calledWith(seedData[1])).to.equal(true);
  });
});
