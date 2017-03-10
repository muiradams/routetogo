import { renderComponent , expect } from '../test_helper';
import App from '../../client/components/App';

describe('App' , function() {
  let component;

  beforeEach('render component', function() {
    component = renderComponent(App);
  });

  it('renders something', function() {
    expect(component).to.exist;
  });
});
