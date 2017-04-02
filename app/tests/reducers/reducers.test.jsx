import expect from 'expect';
import GameAPI from 'GameAPI';
import df from 'deep-freeze-strict';

import reducer from 'reducers';


describe('Reducer', () => {
  it('should exist', () => {
    expect(reducer).toExist();
  });


  it('should handle start game action', () => {
    const prevState = df({
      gameSize: null,
      movesCount: null,
      startTime: null,
      tiles: [],
      wonGame: null
    });
    const gameSize = 4;
    const validAction = df({
      type: 'START_GAME',
      gameSize,
      tiles: GameAPI.createTilesArray(gameSize)
    });

    const actualState = reducer(prevState, validAction);

    expect(actualState.gameSize).toBe(validAction.gameSize);
    expect(actualState.movesCount).toBe(0);
    expect(actualState.startTime).toBe(null);
    expect(actualState.tiles).toEqual(validAction.tiles);
    expect(actualState.wonGame).toBe(false);
  });


  it('should handle reset game action', () => {
    const prevState = df({
      gameSize: 5,
      movesCount: 321,
      startTime: 465764545,
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      wonGame: false
    });
    const validAction = df({
      type: 'NEW_GAME'
    });

    const actualState = reducer(prevState, validAction);

    expect(actualState.gameSize).toBe(null);
    expect(actualState.movesCount).toBe(null);
    expect(actualState.startTime).toBe(null);
    expect(actualState.tiles.length).toEqual(0);
    expect(actualState.wonGame).toBe(null);
  });


  it('should handle won game action', () => {
    const prevState = df({
      gameSize: 3,
      movesCount: 123,
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 0],
      startTime: 546778778,
      wonGame: false
    });
    const validAction = df({
      type: 'WON_GAME'
    });
    const expectedState = df({
      gameSize: prevState.gameSize,
      movesCount: prevState.movesCount,
      tiles: prevState.tiles,
      startTime: prevState.startTime,
      wonGame: true
    });

    const actualState = reducer(prevState, validAction);

    expect(actualState).toEqual(expectedState);
  });


  it('should set new tiles and increment moves count', () => {
    const prevState = df({
      gameSize: 3,
      movesCount: 123,
      tiles: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      startTime: 546778778,
      wonGame: false
    });
    const validAction = df({
      type: 'MOVE_TILES',
      tiles: [1, 2, 3, 4, 0, 5, 6, 7, 8]
    });
    const expectedState = df({
      gameSize: prevState.gameSize,
      movesCount: prevState.movesCount + 1,
      tiles: validAction.tiles,
      startTime: prevState.startTime,
      wonGame: prevState.wonGame
    });

    const actualState = reducer(prevState, validAction);

    expect(actualState).toEqual(expectedState);
  });


  it('should handle set start time', () => {
    const prevState = df({
      gameSize: 3,
      movesCount: 123,
      tiles: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      startTime: null,
      wonGame: false
    });
    const validAction = df({
      type: 'SET_START_TIME',
      startTime: Date.now()
    });

    const actualState = reducer(prevState, validAction);

    expect(actualState.gameSize).toBe(prevState.gameSize);
    expect(actualState.movesCount).toBe(prevState.movesCount);
    expect(actualState.startTime).toBe(validAction.startTime);
    expect(actualState.tiles).toEqual(prevState.tiles);
    expect(actualState.wonGame).toBe(prevState.wonGame);
  });


  it('should not change state when invalid action passed', () => {
    const prevState = df({
      gameSize: 3,
      movesCount: 444,
      tiles: [1, 2, 3, 4, 5, 6, 8, 9],
      startTime: 3454657,
      wonGame: false
    });
    const invalidAction = df({
      type: 'INVALID_ACTION',
      tiles: [1, 2, 3, 4, 0, 5, 6, 7, 8]
    });

    const actualState = reducer(prevState, invalidAction);

    expect(actualState).toEqual(prevState);
  });
});