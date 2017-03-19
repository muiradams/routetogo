/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
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

  it('passes input to onDepartureCityInput prop function', () => {
    const handleDepartureCityInputSpy = spy();
    wrapper = mount(<SearchFields onDepartureCityInput={handleDepartureCityInputSpy} />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', { target: { value: 'CDG' } });
    expect(handleDepartureCityInputSpy.calledOnce).to.equal(true);
    expect(handleDepartureCityInputSpy.calledWith('CDG')).to.equal(true);
  });
  
  it('passes input to onDestinationCityInput prop function', () => {
    const handleDestinationCityInputSpy = spy();
    wrapper = mount(<SearchFields onDestinationCityInput={handleDestinationCityInputSpy} />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', { target: { value: 'BCN' } });
    expect(handleDestinationCityInputSpy.calledOnce).to.equal(true);
    expect(handleDestinationCityInputSpy.calledWith('BCN')).to.equal(true);
  });

  it('departure input shows the correct departureCity', () => {
    wrapper = mount(<SearchFields departureCity={'SFO'} />);
    const input = wrapper.find('input').at(0);
    expect(input.prop('value')).to.equal('SFO');
  });

  it('destination input shows the correct destinationCity', () => {
    wrapper = mount(<SearchFields destinationCity={'CDG'} />);
    const input = wrapper.find('input').at(1);
    expect(input.prop('value')).to.equal('CDG');
  });
});
