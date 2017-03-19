/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import SearchFields from '../../client/components/SearchFields';

describe('<SearchFields />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchFields />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows two input fields', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('departure city field accepts input', () => {
    wrapper = mount(<SearchFields />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', { target: { value: 'CDG' } });
    expect(wrapper.state('departureCity')).to.equal('CDG');
    expect(input.prop('value')).to.equal('CDG');
  });

  it('destination city field accepts input', () => {
    wrapper = mount(<SearchFields />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', { target: { value: 'BCN' } });
    expect(wrapper.state('destinationCity')).to.equal('BCN');
    expect(input.prop('value')).to.equal('BCN');
  });
});
