import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {Timer} from 'Timer';


describe('Timer Component', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });


  describe('render', () => {
    it('should render element with class "time-counter"', () => {
      const timer = TestUtils.renderIntoDocument(<Timer startTime={Date.now()}/>),
        $el = $(ReactDOM.findDOMNode(timer));

      const actual = $el.hasClass('time-counter');

      expect(actual).toBe(true);
    });


    it('should start time counting after element has been rendered', (done) => {
      const timer = TestUtils.renderIntoDocument(<Timer startTime={Date.now()}/>);

      expect(timer.state.gameTime).toEqual(0);

      setTimeout(() => {
        expect(timer.state.gameTime).toBeGreaterThanOrEqualTo(1); // sometimes at this moment browser produces 2 instead of 1
        done();
      }, 1000);
    });
  });
});