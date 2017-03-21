/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchAdvanced from '../../client/components/SearchAdvanced';

describe('<SearchAdvanced />', () => {
  let wrapper;
  const advancedOptions = {};
  const onAdvancedOptionsInput = () => {};

  beforeEach(() => {
    wrapper = shallow(<SearchAdvanced
      advancedOptions={advancedOptions}
      onAdvancedOptionsInput={onAdvancedOptionsInput}
    />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });
});
