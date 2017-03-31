/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchAdvanced from '../../client/components/SearchAdvanced';

describe('<SearchAdvanced />', () => {
  let wrapper;
  const onAdvancedOptionsInput = () => {};

  beforeEach(() => {
    wrapper = shallow(<SearchAdvanced
      onAdvancedOptionsInput={onAdvancedOptionsInput}
    />);
  });

  // RENDERS COMPONENTS
  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('shows one input and one select field', () => {
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });

  // INITIALIZES THE STATE
  context('state is initialized correctly', () => {
    it('starts with nonstop set to false', () => {
      expect(wrapper.state('nonstop')).to.eql(false);
    });

    it('starts with airline set to all', () => {
      expect(wrapper.state('airline')).to.eql('all');
    });
  });

  // UPDATES THE STATE
  context('<input> & <select> elements update the state on change', () => {
    it('nonstop', () => {
      wrapper.instance().handleChange({ target: { name: 'nonstop', value: 'on' } });
      expect(wrapper.state('nonstop')).to.eql(true);
    });

    it('airline', () => {
      wrapper.instance().handleChange({ target: { name: 'airline', value: 'AA' } });
      expect(wrapper.state('airline')).to.eql('AA');
    });
  });

  // PASSES INPUT TO PARENT FUNCTION
  it('passes input to onAdvancedOptionsInput prop function', () => {
    const handleStopsInputSpy = spy();
    wrapper = shallow(<SearchAdvanced
      onAdvancedOptionsInput={handleStopsInputSpy}
    />);
    const input = wrapper.find('#nonstop');
    input.simulate('change', { target: { name: 'nonstop', value: 'on' } });
    expect(handleStopsInputSpy.called).to.equal(true);
    expect(handleStopsInputSpy.calledWith({
      nonstop: true,
      airline: 'all',
    })).to.equal(true);
  });
});
