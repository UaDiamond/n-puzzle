import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {Info} from 'Info';


describe('Info Component', () => {
  it('should exist', () => {
    expect(Info).toExist();
  });


  describe('render', () => {
    it('should render element with class "page-info"', () => {
      const info = TestUtils.renderIntoDocument(<Info/>),
        $el = $(ReactDOM.findDOMNode(info));

      const actual = $el.hasClass('page-info');

      expect(actual).toBe(true);
    });
  });
});