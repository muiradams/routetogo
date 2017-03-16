/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { renderComponent, expect } from '../test_helper';
import SearchButton from '../../client/components/SearchButton';
import React from 'react';

describe('SearchButton', function () {
  let component;

  beforeEach('render component', function () {
    component = renderComponent(SearchButton);
  });

  it('has a button', function () {
    expect(component.find('button')).to.exist;
  });
});
