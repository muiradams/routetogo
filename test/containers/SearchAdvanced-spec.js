/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import Autosuggest from 'react-autosuggest';
import { SearchAdvanced } from '../../client/containers/SearchAdvanced';

describe('<SearchAdvanced />', () => {
  let wrapper;
  const onAdvancedOptionsInput = () => {};
  const airlines = {
    nodes: [
      {
        name: 'American Airlines',
      },
      {
        name: 'United Airlines',
      },
    ],
  };
  const props = {
    airlines,
    onAdvancedOptionsInput,
  };

  beforeEach(() => {
    wrapper = shallow(<SearchAdvanced {...props} />);
  });

  // RENDERS COMPONENTS
  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows one input and one <Autosuggest /> component', () => {
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find(Autosuggest)).to.have.length(1);
  });

  // INITIALIZES THE STATE
  it('starts with nonstop set to false', () => {
    expect(wrapper.state('nonstop')).to.eql(false);
  });

  // UPDATES THE STATE
  it('nonstop checkbox updates the state on change', () => {
    wrapper.instance().handleNonstopChange({ target: { newValue: 'on' } });
    expect(wrapper.state('nonstop')).to.eql(true);
  });

  it('airline input updates the state on change', () => {
    wrapper.instance().handleSetAirline(null, { newValue: 'AA' });
    expect(wrapper.state('airline')).to.eql('AA');
  });

  // PASSES INPUT TO PARENT FUNCTION
  it('passes input to onAdvancedOptionsInput prop function', () => {
    const handleStopsInputSpy = spy();
    wrapper = mount(<SearchAdvanced
      onAdvancedOptionsInput={handleStopsInputSpy}
    />);
    const input = wrapper.find('#nonstop');
    input.simulate('change', { target: { newValue: 'on' } });
    expect(handleStopsInputSpy.called).to.equal(true);
    expect(handleStopsInputSpy.calledWith({
      nonstop: true,
      airline: '',
    })).to.equal(true);
  });

  // HELPER FUNCTION
  it('onSuggestionsFetchRequested function finds airlines, or returns []', () => {
    wrapper = shallow(<SearchAdvanced {...props} />);
    wrapper.instance().onSuggestionsFetchRequested({ value: 'Ame' });
    expect(wrapper.state('suggestions')).to.eql([airlines.nodes[0]]);
  });
});
