/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SearchButton from '../../client/components/SearchButton';

describe('<SearchButton />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchButton />);
  });

  it('component renders', () => {
    expect(wrapper).to.have.length(1);
  });

  it('has a button', () => {
    expect(wrapper.find('button')).to.exist;
  });

  it('should call onSubmit when button is clicked', () => {
    const fetchRoutesSpy = spy();
    wrapper = shallow(<SearchButton onSubmit={fetchRoutesSpy} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(fetchRoutesSpy.calledOnce).to.equal(true);
  });
});
