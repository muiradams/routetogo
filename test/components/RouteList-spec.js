/* eslint-disable no-unused-expressions */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import RouteList from '../../client/components/RouteList';

describe('<RouteList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RouteList />);
  });

  it('should display a list of routes');
});
