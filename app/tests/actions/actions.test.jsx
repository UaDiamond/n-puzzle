import expect from 'expect';
import df from 'deep-freeze-strict';

import * as actions from 'actions';


describe('Actions', () => {
  it('should exist', () => {
    expect(actions).toExist();
  });


  it('should generate start game action', () => {
    const expected = df({
      type: 'START_GAME',
      gameSize: 5
    });

    const actual = actions.startGame(expected.gameSize);

    expect(actual.type).toBe(expected.type);
    expect(actual.gameSize).toBe(expected.gameSize);
    expect(actual.tiles).toBeA(Array);
    expect(actual.tiles.length).toBe(Math.pow(expected.gameSize, 2));
  });


  it('should generate new game action', () => {
    const expected = df({
      type: 'NEW_GAME'
    });

    const actual = actions.newGame();

    expect(actual).toEqual(expected);
  });


  it('should generate set start time action', () => {
    const expected = df({
      type: 'SET_START_TIME',
      startTime: Date.now()
    });

    const actual = actions.setStartTime();

    expect(actual.type).toEqual(expected.type);
    expect(Math.round(actual.startTime / 1000)).toEqual(Math.round(expected.startTime / 1000));
  });


  it('should generate won game action', () => {
    const expected = df({
      type: 'WON_GAME'
    });

    const actual = actions.wonGame();

    expect(actual).toEqual(expected);
  });


  it('should generate move tiles action', () => {
    const expected = df({
      type: 'MOVE_TILES',
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    });

    const actual = actions.moveTiles(expected.tiles);

    expect(actual).toEqual(expected);
  });
});