/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Route from '../../client/components/Route';

describe('<Route />', () => {
  let wrapper;
  const route = {
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
  };

  beforeEach(() => {
    wrapper = shallow(<Route
      route={route}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows a <ul>', () => {
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('renders zero routes', () => {
    wrapper = shallow(<Route />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders undefined routes', () => {
    wrapper = shallow(<Route routes={undefined} />);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('renders an <li> for each airport', () => {
    expect(wrapper.find('li')).to.have.length(4);
  });
});
