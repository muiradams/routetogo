/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RouteSearch from '../../client/components/RouteSearch';
import SearchBoxes from '../../client/components/SearchBoxes';
import SearchAdvanced from '../../client/components/SearchAdvanced';
import SearchButton from '../../client/components/SearchButton';

describe('<RouteSearch />', function () {
  let component;

  beforeEach(function () {
    component = shallow(<RouteSearch />);
  });

  it('component renders', function () {
    expect(component).to.have.length(1);
  });

  it('shows the title of the page as an h1', function () {
    expect(component.find('h1')).to.exist;
    expect(component.find('h1')).to.have.id('title-large');
  });

  it('shows a description of the page as an h2', function () {
    expect(component.find('h2')).to.exist;
    expect(component.find('h2')).to.have.id('site-description');
  });

  it('has a <SearchBoxes /> component', function () {
    expect(component.find(SearchBoxes)).to.have.length(1);
  });

  it('has a <SearchAdvanced /> component', function () {
    expect(component.find(SearchAdvanced)).to.have.length(1);
  });

  it('has a <SearchButton /> component', function () {
    expect(component.find(SearchButton)).to.have.length(1);
  });
});
