import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {BrowserRouter} from 'react-router-dom';
import expect from 'expect';
import $ from 'jQuery';

import {NewGame} from 'NewGame';


describe('NewGame Component', () => {
  it('should exist', () => {
    expect(NewGame).toExist();
  });


  describe('render', () => {
    it('should dispatch newGame action when element is rendered', () => {
      const spy = expect.createSpy();

      TestUtils.renderIntoDocument(<BrowserRouter><NewGame dispatch={spy}/></BrowserRouter>);

      expect(spy).toHaveBeenCalled();
    });


    it('should render 6 buttons with gameSizes', () => {
      const spy = expect.createSpy(),
        newGame = TestUtils.renderIntoDocument(<BrowserRouter><NewGame dispatch={spy}/></BrowserRouter>),
        $el = $(ReactDOM.findDOMNode(newGame));

      const actualButtons = $el.find('.game-buttons a');

      expect(actualButtons.length).toBe(6);
    });


    it('should render random game size button', () => {
      const spy = expect.createSpy(),
        newGame = TestUtils.renderIntoDocument(<BrowserRouter><NewGame dispatch={spy}/></BrowserRouter>),
        $el = $(ReactDOM.findDOMNode(newGame));

      const actualButton = $el.find('.button-random');

      expect(actualButton.length).toBe(1);
    });
  });
});