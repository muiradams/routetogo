/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../client/components/App';

describe('<App />', function () {
  let component;

  beforeEach(function () {
    component = shallow(<App />);
  });

  it('component renders', function () {
    expect(component).to.have.length(1);
  });

  it('contains a form', function () {
    expect(component.find('form')).to.exist;
  });

  it('displays any children passed to it', function () {
    const wrapper = shallow(
      <App>
        <div className="unique" />
      </App>
    );
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
});
