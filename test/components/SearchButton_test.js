/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SearchButton from '../../client/components/SearchButton';

describe('<SearchButton />', function () {
  let component;

  beforeEach(function () {
    component = shallow(<SearchButton />);
  });

  it('component renders', function () {
    expect(component).to.have.length(1);
  });

  it('has a button', function () {
    expect(component.find('button')).to.exist;
  });
});
