import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Provider} from 'react-redux';
import expect from 'expect';
import $ from 'jQuery';

import ConnectedGameBoard, {GameBoard} from 'GameBoard';
import configureStore from 'configureStore';


describe('GameBoard Component', () => {
  it('should exist', () => {
    expect(GameBoard).toExist();
  });


  describe('render', () => {
    it('should render game board', () => {
      const gameBoard = TestUtils.renderIntoDocument(<GameBoard gameSize={2} tiles={[]} wonGame={false}/>),
        $el = $(ReactDOM.findDOMNode(gameBoard));

      const actual = $el.hasClass('game-board');

      expect(actual).toBe(true);
    });


    it('should render element with proper gameSize class', () => {
      const gameBoard = TestUtils.renderIntoDocument(<GameBoard gameSize={4} tiles={[]} wonGame={false}/>),
        $el = $(ReactDOM.findDOMNode(gameBoard));

      const actual = $el.hasClass('game-4');

      expect(actual).toBe(true);
    });


    it('should render element with proper tiles quantity', () => {
      const initialState = {
          gameSize: 3,
          tiles: [
            {num: 0, index: 2},
            {num: 1, index: 5},
            {num: 2, index: 6},
            {num: 3, index: 0},
            {num: 4, index: 7},
            {num: 5, index: 1},
            {num: 6, index: 8},
            {num: 7, index: 3},
            {num: 8, index: 4}
          ],
          wonGame: false
        },
        store = configureStore(initialState),
        gameBoard = TestUtils.renderIntoDocument(<Provider store={store}><ConnectedGameBoard /></Provider>),
        $el = $(ReactDOM.findDOMNode(gameBoard));

      const actualTiles = $el.find('.tile');

      expect(actualTiles.length).toBe(initialState.tiles.length);
    });


    it('should render element with class "game-won" when puzzle is solved', () => {
      const gameBoard = TestUtils.renderIntoDocument(<GameBoard gameSize={2} tiles={[]} wonGame={true}/>),
        $el = $(ReactDOM.findDOMNode(gameBoard));

      const actual = $el.hasClass('game-won');

      expect(actual).toBe(true);
    });
  });
});