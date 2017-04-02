import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {MovesCounter} from 'MovesCounter';


describe('MovesCounter Component', () => {
  it('should exist', () => {
    expect(MovesCounter).toExist();
  });


  describe('render', () => {
    it('should render element with class "moves-counter"', () => {
      const movesCounter = TestUtils.renderIntoDocument(<MovesCounter/>),
        $el = $(ReactDOM.findDOMNode(movesCounter));

      const actual = $el.hasClass('moves-counter');

      expect(actual).toBe(true);
    });


    it('should include proper moves count', () => {
      const movesCount = 53601,
        movesCounter = TestUtils.renderIntoDocument(<MovesCounter movesCount={movesCount}/>);

      const actualText = ReactDOM.findDOMNode(movesCounter).innerText;

      expect(actualText).toInclude(movesCount);
    });
  });
});