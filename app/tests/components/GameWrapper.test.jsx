import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jQuery';

import {GameWrapper} from 'GameWrapper';


describe('GameWrapper Component', () => {
  it('should exist', () => {
    expect(GameWrapper).toExist();
  });


  describe('render', () => {
    it('should render element with class "game-wrapper"', () => {
      const gameWrapper = TestUtils.renderIntoDocument(<GameWrapper/>),
        $el = $(ReactDOM.findDOMNode(gameWrapper));

      const actual = $el.hasClass('game-wrapper');

      expect(actual).toBe(true);
    });


    it('should properly render children elements', () => {
      const testClass = 'test-element',
        testText = 'Test',
        gameWrapper = TestUtils.renderIntoDocument(<GameWrapper>
          <div className={testClass}>{testText}</div>
        </GameWrapper>),
        actualChildren = TestUtils.scryRenderedDOMComponentsWithClass(gameWrapper, testClass),
        actualChild = actualChildren[0];

      expect(actualChildren.length).toBe(1);
      expect(actualChild.innerText).toBe(testText);
    });
  });
});