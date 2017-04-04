/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Autosuggest from 'react-autosuggest';
import { SearchFields } from '../../client/containers/SearchFields';

describe('<SearchFields />', () => {
  let wrapper;
  const onSourceAirportInput = () => {};
  const onDestinationAirportInput = () => {};
  const airports = {
    nodes: [
      {
        iata: 'BCN',
        name: 'Barcelona International Airport',
      },
    ],
  };
  const props = {
    airports,
    onSourceAirportInput,
    onDestinationAirportInput,
  };

  beforeEach(() => {
    wrapper = shallow(<SearchFields {...props} />);
  });

  // RENDERS COMPONENTS
  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows two <Autosuggest /> components', () => {
    expect(wrapper.find(Autosuggest)).to.have.length(2);
  });

  // PASSES INPUT TO PARENT FUNCTIONS
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

  // HELPER FUNCTION
  it('onSuggestionsFetchRequested function finds airports, or returns []', () => {
    wrapper = shallow(<SearchFields {...props} />);
    wrapper.instance().onSuggestionsFetchRequested({ value: 'BCN' });
    expect(wrapper.state('suggestions')).to.eql(airports.nodes);
    wrapper.instance().onSuggestionsFetchRequested({ value: 'CDG' });
    expect(wrapper.state('suggestions')).to.eql([]);
  });
});
