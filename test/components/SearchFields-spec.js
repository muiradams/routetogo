/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchFields from '../../client/components/SearchFields';

describe('<SearchFields />', () => {
  let wrapper;
  const departureCity = '';
  const destinationCity = '';
  const onDepartureCityInput = () => {};
  const onDestinationCityInput = () => {};
  const props = {
    departureCity,
    destinationCity,
    onDepartureCityInput,
    onDestinationCityInput,
  };

  beforeEach(() => {
    wrapper = shallow(<SearchFields {...props} />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows two input fields', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('passes input to onDepartureCityInput prop function', () => {
    const handleDepartureCityInputSpy = spy();
    props['onDepartureCityInput'] = handleDepartureCityInputSpy;
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', { target: { value: 'CDG' } });
    expect(handleDepartureCityInputSpy.calledOnce).to.equal(true);
    expect(handleDepartureCityInputSpy.calledWith('CDG')).to.equal(true);
  });

  it('passes input to onDestinationCityInput prop function', () => {
    const handleDestinationCityInputSpy = spy();
    props['onDestinationCityInput'] = handleDestinationCityInputSpy;
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', { target: { value: 'BCN' } });
    expect(handleDestinationCityInputSpy.calledOnce).to.equal(true);
    expect(handleDestinationCityInputSpy.calledWith('BCN')).to.equal(true);
  });

  it('departure input shows the correct departureCity', () => {
    props['departureCity'] = 'SFO';
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(0);
    expect(input.prop('value')).to.equal('SFO');
  });

  it('destination input shows the correct destinationCity', () => {
    props['destinationCity'] = 'CDG';
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(1);
    expect(input.prop('value')).to.equal('CDG');
  });
});
