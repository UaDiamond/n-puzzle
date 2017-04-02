import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {FinishMessage} from 'FinishMessage';


describe('FinishMessage Component', () => {
  it('should exist', () => {
    expect(FinishMessage).toExist();
  });


  describe('render', () => {
    it('should render component with class "finish-message"', () => {
      const finishMessageComponent = TestUtils.renderIntoDocument(<FinishMessage movesCount={1}
                                                                                 startTime={Date.now()}/>),
        $el = $(ReactDOM.findDOMNode(finishMessageComponent));

      expect($el.hasClass('finish-message')).toBe(true);
    });


    it('should render proper finish message text to the output', () => {
      const startTime = Date.now() - 14000,
        finishMessageComponent = TestUtils.renderIntoDocument(<FinishMessage movesCount={32} startTime={startTime}/>),
        $el = $(ReactDOM.findDOMNode(finishMessageComponent)),
        actualText = $el.text();

      expect(actualText).toEqual("You've made 32 moves in 00:14");
    });
  });
});