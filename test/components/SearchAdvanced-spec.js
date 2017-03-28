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

  it('shows three select fields', () => {
    expect(wrapper.find('select')).to.have.length(3);
  });

  // INITIALIZES THE STATE
  context('state is initialized correctly', () => {
    it('starts with stops set to 0', () => {
      expect(wrapper.state('stops')).to.eql('0');
    });

    it('starts with airline set to all', () => {
      expect(wrapper.state('airline')).to.eql('all');
    });

    it('starts with alliance set to none', () => {
      expect(wrapper.state('alliance')).to.eql('none');
    });
  });

  // UPDATES THE STATE
  context('<select> elements update the state on change', () => {
    it('stops', () => {
      wrapper.instance().handleChange({ target: { name: 'stops', value: '3' } });
      expect(wrapper.state('stops')).to.eql('3');
    });
    
    it('airline', () => {
      wrapper.instance().handleChange({ target: { name: 'airline', value: 'AA' } });
      expect(wrapper.state('airline')).to.eql('AA');
    });
    
    it('alliance', () => {
      wrapper.instance().handleChange({ target: { name: 'alliance', value: 'oneworld' } });
      expect(wrapper.state('alliance')).to.eql('oneworld');
    });
  });

  // PASSES INPUT TO PARENT FUNCTION
  it('passes input to onAdvancedOptionsInput prop function', () => {
    const handleStopsInputSpy = spy();
    wrapper = shallow(<SearchAdvanced
      onAdvancedOptionsInput={handleStopsInputSpy}
    />);
    const input = wrapper.find('#stops');
    input.simulate('change', { target: { name: 'stops', value: '2' } });
    expect(handleStopsInputSpy.called).to.equal(true);
    expect(handleStopsInputSpy.calledWith({
      stops: '2',
      airline: 'all',
      alliance: 'none',
    })).to.equal(true);
  });
});
