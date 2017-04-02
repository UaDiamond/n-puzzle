import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import df from 'deep-freeze-strict';
import $ from 'jQuery';

import {Tile} from 'Tile';


describe('Tile Component', () => {
  const tilesArray = df([
      {num: 0, index: 3, canMove: false},
      {num: 1, index: 7, canMove: false},
      {num: 2, index: 4, canMove: true},
      {num: 3, index: 1, canMove: false},
      {num: 4, index: 6, canMove: true},
      {num: 5, index: 0, canMove: true},
      {num: 6, index: 5, canMove: true},
      {num: 7, index: 2, canMove: false},
      {num: 8, index: 8, canMove: false}
    ]),
    gameSize = df(3),
    MOVABLE_TILE = 2,
    IMMOVABLE_TILE = 1,
    GAP_TILE = 0;

  it('should exist', () => {
    expect(Tile).toExist();
  });


  describe('render', () => {
    it('should render element with class "tile"', () => {
      const num = 1,
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.hasClass('tile')).toBe(true);
    });


    it('should render gap (0-tile) with class "gap"', () => {
      const num = GAP_TILE,
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.hasClass('gap')).toBe(true);
    });


    it('should render regular tile without class "gap"', () => {
      const num = IMMOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.hasClass('gap')).toBe(false);
    });


    it('should render movable tile with class "movable" and positive tabIndex', () => {
      const num = MOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.hasClass('movable')).toBe(true);
      expect(+$el.attr('tabIndex')).toBeGreaterThan(0);
    });


    it('should render immovable tile without class "movable" and negative tabIndex', () => {
      const num = IMMOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.hasClass('movable')).toBe(false);
      expect(+$el.attr('tabIndex')).toBeLessThan(0);
    });


    it('should render tile with proper css position', () => {
      const num = 2, // index: 4 (Middle tile in 3x3 game)
        tile = TestUtils.renderIntoDocument(<Tile key={num} num={num} gameSize={gameSize} tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile));

      expect($el.css('top')).toEqual('33.33%');
      expect($el.css('left')).toEqual('33.33%');
    });
  });


  describe('handleClick', () => {
    it('should call handleClick method when user clicks on any tile', () => {
      const spy = expect.createSpy();

      // create Tile subclass to override handleClick method with spy for testing
      class TestTile extends Tile {
        handleClick() {
          spy('test1');
        }
      }

      const num = GAP_TILE,
        tile = TestUtils.renderIntoDocument(<TestTile gameSize={gameSize}
                                                      key={num}
                                                      num={num}
                                                      tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile))[0];

      TestUtils.Simulate.click($el);

      expect(spy).toHaveBeenCalledWith('test1');
    });


    it('should call dispatcher when user clicks on movable tile', () => {
      const spy = expect.createSpy(),
        num = MOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile dispatch={spy}
                                                  gameSize={gameSize}
                                                  key={num}
                                                  num={num}
                                                  tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile))[0];

      TestUtils.Simulate.click($el);

      expect(spy).toHaveBeenCalled();
    });


    it('should call dispatcher when user clicks on movable tile', () => {
      const spy = expect.createSpy(),
        num = MOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile dispatch={spy}
                                                  gameSize={gameSize}
                                                  key={num}
                                                  num={num}
                                                  tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile))[0];

      TestUtils.Simulate.click($el);

      expect(spy).toHaveBeenCalled();
    });


    it('should not call dispatcher when user clicks on immovable tile', () => {
      const spy = expect.createSpy(),
        num = IMMOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile dispatch={spy}
                                                  gameSize={gameSize}
                                                  key={num}
                                                  num={num}
                                                  tiles={tilesArray}/>),
        $el = $(ReactDOM.findDOMNode(tile))[0];

      TestUtils.Simulate.click($el);

      expect(spy).toNotHaveBeenCalled();
    });


    it('should not call dispatcher when puzzle is solved and user clicks on any tile', () => {
      const spy = expect.createSpy(),
        num = MOVABLE_TILE,
        tile = TestUtils.renderIntoDocument(<Tile dispatch={spy}
                                                  gameSize={gameSize}
                                                  key={num}
                                                  num={num}
                                                  tiles={tilesArray}
                                                  wonGame={true}/>),
        $el = $(ReactDOM.findDOMNode(tile))[0];

      TestUtils.Simulate.click($el);

      expect(spy).toNotHaveBeenCalled();
    });
  });
});