/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchFields from '../../client/components/SearchFields';

describe('<SearchFields />', () => {
  let wrapper;
  const sourceAirport = '';
  const destinationAirport = '';
  const onSourceAirportInput = () => {};
  const onDestinationAirportInput = () => {};
  const props = {
    sourceAirport,
    destinationAirport,
    onSourceAirportInput,
    onDestinationAirportInput,
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

  it('passes input to onSourceAirportInput prop function', () => {
    const handleSourceAirportInputSpy = spy();
    props.onSourceAirportInput = handleSourceAirportInputSpy;
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', { target: { value: 'CDG' } });
    expect(handleSourceAirportInputSpy.calledOnce).to.equal(true);
    expect(handleSourceAirportInputSpy.calledWith('CDG')).to.equal(true);
  });

  it('passes input to onDestinationAirportInput prop function', () => {
    const handleDestinationAirportInputSpy = spy();
    props.onDestinationAirportInput = handleDestinationAirportInputSpy;
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', { target: { value: 'BCN' } });
    expect(handleDestinationAirportInputSpy.calledOnce).to.equal(true);
    expect(handleDestinationAirportInputSpy.calledWith('BCN')).to.equal(true);
  });

  it('departure input shows the correct sourceAirport', () => {
    props.sourceAirport = 'SFO';
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(0);
    expect(input.prop('value')).to.equal('SFO');
  });

  it('destination input shows the correct destinationAirport', () => {
    props.destinationAirport = 'CDG';
    wrapper = mount(<SearchFields {...props} />);
    const input = wrapper.find('input').at(1);
    expect(input.prop('value')).to.equal('CDG');
  });
});
