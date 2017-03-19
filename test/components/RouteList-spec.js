/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RouteList from '../../client/components/RouteList';

describe('<RouteList />', () => {
  let wrapper;
  const seedData = [
    {
      sourceAirport: 'ACV',
      destinationAirport: 'CEC',
      airlineByAirlineId: {
        name: 'United Airlines',
      },
      airportBySourceAirportId: {
        name: 'Arcata Airport',
        iata: 'ACV',
        city: 'Arcata CA',
        country: 'United States',
        latitude: 40.978099822998,
        longitude: -124.109001159668,
      },
      airportByDestinationAirportId: {
        name: 'Jack Mc Namara Field Airport',
        iata: 'CEC',
        city: 'Crescent City',
        country: 'United States',
        latitude: 41.78020096,
        longitude: -124.2369995,
      },
    },
    {
      sourceAirport: 'ACV',
      destinationAirport: 'SFO',
      airlineByAirlineId: {
        name: 'United Airlines',
      },
      airportBySourceAirportId: {
        name: 'Arcata Airport',
        iata: 'ACV',
        city: 'Arcata CA',
        country: 'United States',
        latitude: 40.978099822998,
        longitude: -124.109001159668,
      },
      airportByDestinationAirportId: {
        name: 'San Francisco International Airport',
        iata: 'SFO',
        city: 'San Francisco',
        country: 'United States',
        latitude: 37.6189994812012,
        longitude: -122.375,
      },
    },
    {
      sourceAirport: 'ACV',
      destinationAirport: 'SMF',
      airlineByAirlineId: {
        name: 'United Airlines',
      },
      airportBySourceAirportId: {
        name: 'Arcata Airport',
        iata: 'ACV',
        city: 'Arcata CA',
        country: 'United States',
        latitude: 40.978099822998,
        longitude: -124.109001159668,
      },
      airportByDestinationAirportId: {
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
    wrapper = shallow(<RouteList routes={seedData} />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });
});
