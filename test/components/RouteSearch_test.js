/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { renderComponent, expect } from '../test_helper';
import RouteSearch from '../../client/components/RouteSearch';

describe('RouteSearch', function () {
  let component;

  beforeEach('render component', function () {
    component = renderComponent(RouteSearch);
  });

  it('has the correct id', function () {
    expect(component).to.have.id('route-search');
  });

  it('shows the title of the page as an h1', function () {
    expect(component.find('h1')).to.exist;
    expect(component.find('h1')).to.have.id('title-large');
  });

  it('shows a description of the page as an h2', function () {
    expect(component.find('h2')).to.exist;
    expect(component.find('h2')).to.have.id('site-description');
  });

  it('renders the SearchBoxes component with correct id', function () {
    expect(component.find('#search-boxes')).to.exist;
  });

  it('renders the SearchAdvanced component with correct id', function () {
    expect(component.find('#search-advanced')).to.exist;
  });

  it('renders the SearchButton component with correct id', function () {
    expect(component.find('#search-button')).to.exist;
  });
});
