import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {StartMessage} from 'StartMessage';


describe('StartMessage Component', () => {
  it('should exist', () => {
    expect(StartMessage).toExist();
  });


  describe('render', () => {
    it('should render element with class "start-message"', () => {
      const startMessageComponent = TestUtils.renderIntoDocument(<StartMessage />),
        $el = $(ReactDOM.findDOMNode(startMessageComponent));

      const actual = $el.hasClass('start-message');

      expect(actual).toBe(true);
    });
  });
});