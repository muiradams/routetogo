/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import { renderComponent, expect } from '../test_helper';
import App from '../../client/components/App';

describe('App', function () {
  let component;

  beforeEach('render component', function () {
    component = renderComponent(App);
  });

  it('contains a form', function () {
    expect(component.find('form')).to.exist;
  });
});
