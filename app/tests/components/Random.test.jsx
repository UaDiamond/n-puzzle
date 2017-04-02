import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {MemoryRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import expect from 'expect';

import {Random} from 'Random';


describe('Random Component', () => {
  it('should exist', () => {
    expect(Random).toExist();
  });


  describe('render', () => {
    it('should redirect to game page with gameSize', () => {
      const router = TestUtils.renderIntoDocument(<MemoryRouter><Random/></MemoryRouter>),
        random = TestUtils.findRenderedComponentWithType(router, Random),
        redirects = TestUtils.scryRenderedComponentsWithType(random, Redirect),
        redirect = redirects[0];

      expect(redirects.length).toBe(1);
      expect(redirect.props.to).toMatch(/game\/[2-7]?/);
    });


    it('should redirect to gameSize not equal to the previous one', () => {
      const router = TestUtils.renderIntoDocument(<MemoryRouter><Random gameSize={5}/></MemoryRouter>),
        random = TestUtils.findRenderedComponentWithType(router, Random),
        redirect = TestUtils.findRenderedComponentWithType(random, Redirect);

      expect(redirect.props.to).toExclude(random.props.gameSize);
    });
  });
});