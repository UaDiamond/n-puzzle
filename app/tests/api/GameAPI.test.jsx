import expect from 'expect';
import df from 'deep-freeze-strict';

import GameAPI from 'GameAPI';


describe('GameAPI', () => {
  it('should exist', () => {
    expect(GameAPI).toExist();
  });


  describe('getMinGameSize', () => {
    it('should return min game size number', () => {
      const minGameSize = df(GameAPI.getMinGameSize());

      expect(minGameSize).toBeA('number');
      expect(minGameSize).toBeGreaterThan(1);
    });
  });


  describe('getMinGameSize', () => {
    it('should return max game size number', () => {
      const maxGameSize = df(GameAPI.getMaxGameSize());

      expect(maxGameSize).toBeA('number');
      expect(maxGameSize).toBeGreaterThan(1);
    });
  });


  describe('createTilesArray', () => {
    it('should create array with proper quantity of tiles', () => {
      const gameSize1 = df(3),
        gameSize2 = df(4),
        gameSize3 = df(5),
        testArray1 = df(GameAPI.createTilesArray(gameSize1)),
        testArray2 = df(GameAPI.createTilesArray(gameSize2)),
        testArray3 = df(GameAPI.createTilesArray(gameSize3));

      expect(testArray1.length).toEqual(Math.pow(gameSize1, 2));
      expect(testArray2.length).toEqual(Math.pow(gameSize2, 2));
      expect(testArray3.length).toEqual(Math.pow(gameSize3, 2));
    });
  });


  describe('limitGameSize', () => {
    it('should return number when it is in range', () => {
      const validGameSize = df(4);

      const actual = GameAPI.limitGameSize(validGameSize);

      expect(actual).toBe(validGameSize);
    });


    it('should limit number to minimal game size when smaller number passed', () => {
      const smallerSize = df(1);

      const actual = df(GameAPI.limitGameSize(smallerSize));

      expect(actual).toBe(2);
    });


    it('should limit number to maximal game size when bigger number passed', () => {
      const biggerSize = df(45);

      const actual = df(GameAPI.limitGameSize(biggerSize));

      expect(actual).toBe(7);
    });
  });


  describe('shuffleTiles', () => {
    it('should shuffle tiles array', () => {
      const arraySize = 16,
        initialTiles = [];

      // Create initial array
      for (let i = 0; i < arraySize; i++) {
        initialTiles.push({
          index: i,
          num: i
        });
      }

      const shuffledTiles = GameAPI.shuffleTiles(df(initialTiles));

      expect(shuffledTiles.length).toEqual(arraySize);
      expect(shuffledTiles).toNotEqual(initialTiles);
    });


    it('should change indexes in tiles array', () => {
      const arraySize = 9,
        initialTiles = [],
        prevIndexes = [],
        nextIndexes = [];

      // Create initial array
      for (let i = 0; i < arraySize; i++) {
        initialTiles.push({
          index: i,
          num: i
        });
      }

      const shuffledTiles = GameAPI.shuffleTiles(df(initialTiles));

      // Check if indexes shuffled in a right way
      for (let i = 0; i < arraySize; i++) {
        prevIndexes.push(initialTiles[i].index);
        nextIndexes.push(shuffledTiles[i].index);
      }

      expect(shuffledTiles.length).toEqual(arraySize);
      expect(nextIndexes).toNotEqual(prevIndexes);
    });


    it('should not change other properties in tiles array', () => {
      const arraySize = 16,
        initialTiles = [],
        prevTiles = [],
        nextTiles = [];

      // Create initial array
      for (let i = 0; i < arraySize; i++) {
        initialTiles.push({
          index: i,
          num: i,
          canMove: false
        });
      }

      const shuffledTiles = GameAPI.shuffleTiles(df(initialTiles));

      // Check if other properties have the same values
      for (let i = 0; i < arraySize; i++) {
        prevTiles.push({
          ...initialTiles[i],
          index: null
        });
        nextTiles.push({
          ...shuffledTiles[i],
          index: null
        });
      }

      expect(shuffledTiles.length).toEqual(arraySize);
      expect(prevTiles).toEqual(nextTiles);
    });
  });


  describe('getTilesCountByGameSize', () => {
    it('should calculate tiles count by game size', () => {
      const gameSize = df(5),
        expectedTilesCount = df(Math.pow(gameSize, 2));

      const actualTilesCount = GameAPI.getTilesCountByGameSize(gameSize);

      expect(actualTilesCount).toEqual(expectedTilesCount);
    });
  });


  describe('getGameSizeByTilesCount', () => {
    it('should calculate game size by tiles count', () => {
      const tilesCount = df(36),
        expectedGameSize = df(Math.sqrt(tilesCount));

      const actualGameSize = GameAPI.getGameSizeByTilesCount(tilesCount);

      expect(actualGameSize).toEqual(expectedGameSize);
    });
  });


  describe('isInArray', () => {
    it('should return true when element exists in array', () => {
      const element = df({num: 1, index: 1}),
        array = df(['1', 2, 34, 56, 'dffj', {num: 1, index: 1}, 'fjk', 213]);

      const actual = GameAPI.isInArray(element, array);

      expect(actual).toBe(true);
    });


    it('should return false when element not exists in array', () => {
      const element = df('abc'),
        array = df(['1', 2, 34, 56, 'dffj', 'fjk', 213]);

      const actual = GameAPI.isInArray(element, array);

      expect(actual).toBe(false);
    });
  });

  describe('compareArrays', () => {
    it('should return true when arrays are identical', () => {
      const arr1 = [],
        arr2 = [];

      for (let i = 0; i < 10; i++) {
        arr1.push({num: i, index: i});
        arr2.push({num: i, index: i});
      }

      const result = GameAPI.compareArrays(df(arr1), df(arr2));

      expect(result).toBe(true);
    });


    it('should return false when arrays are not identical', () => {
      const arr1 = [],
        arr2 = [];

      for (let i = 0; i < 10; i++) {
        arr1.push({num: i, index: i});
        arr2.push({num: i, index: i});
      }
      arr2.splice(5, 1, {num: 54, index: 54});

      const result = GameAPI.compareArrays(df(arr1), df(arr2));

      expect(result).toBe(false);
    });
  });


  describe('getGapIndex', () => {
    it('should return proper gap index in tiles array', () => {
      const gapObj = df({num: 0, index: 5}),
        tilesArray = df([
          gapObj,
          {num: 1, index: 0},
          {num: 2, index: 4},
          {num: 3, index: 7},
          {num: 4, index: 3},
          {num: 5, index: 4},
          {num: 6, index: 2},
          {num: 7, index: 8},
          {num: 8, index: 1}
        ]);

      const gapIndex = GameAPI.getGapIndex(tilesArray);

      expect(gapIndex).toEqual(gapObj.index);
    });
  });


  describe('convertIndexToCoordinates', () => {
    it('should convert tile index to coordinates object', () => {
      expect(GameAPI.convertIndexToCoordinates(0, 3)).toEqual(df({y: 1, x: 1}));
      expect(GameAPI.convertIndexToCoordinates(8, 3)).toEqual(df({y: 3, x: 3}));

      expect(GameAPI.convertIndexToCoordinates(0, 4)).toEqual(df({y: 1, x: 1}));
      expect(GameAPI.convertIndexToCoordinates(7, 4)).toEqual(df({y: 2, x: 4}));
      expect(GameAPI.convertIndexToCoordinates(15, 4)).toEqual(df({y: 4, x: 4}));

      expect(GameAPI.convertIndexToCoordinates(0, 5)).toEqual(df({y: 1, x: 1}));
      expect(GameAPI.convertIndexToCoordinates(12, 5)).toEqual(df({y: 3, x: 3}));
      expect(GameAPI.convertIndexToCoordinates(24, 5)).toEqual(df({y: 5, x: 5}));
    });


    it('should return false when invalid data passed', () => {
      const invalidIndex = df(45),
        gameSize = df(4);

      const actual = GameAPI.convertIndexToCoordinates(invalidIndex, gameSize);

      expect(actual).toBe(false);
    });
  });


  describe('convertCoordinatesToIndex', () => {
    it('should convert coordinates to tile index', () => {
      expect(GameAPI.convertCoordinatesToIndex(df({y: 1, x: 1}), 3)).toEqual(0);
      expect(GameAPI.convertCoordinatesToIndex(df({y: 3, x: 3}), 3)).toEqual(8);

      expect(GameAPI.convertCoordinatesToIndex(df({y: 1, x: 1}), 4)).toEqual(0);
      expect(GameAPI.convertCoordinatesToIndex(df({y: 2, x: 4}), 4)).toEqual(7);
      expect(GameAPI.convertCoordinatesToIndex(df({y: 4, x: 4}), 4)).toEqual(15);

      expect(GameAPI.convertCoordinatesToIndex(df({y: 1, x: 1}), 5)).toEqual(0);
      expect(GameAPI.convertCoordinatesToIndex(df({y: 3, x: 2}), 5)).toEqual(11);
      expect(GameAPI.convertCoordinatesToIndex(df({y: 5, x: 5}), 5)).toEqual(24);
    });


    it('should return false when invalid data passed', () => {
      const invalidCoordinates = df({y: 12, x: 12}),
        gameSize = df(7);

      const actual = GameAPI.convertCoordinatesToIndex(invalidCoordinates, gameSize);

      expect(actual).toBe(false);
    });
  });


  describe('findGapCoordinates', () => {
    it('should find gap coordinates in passed tiles array', () => {
      const expected = df({x: 2, y: 3}),
        tilesArray = df([
          {num: 0, index: 7},
          {num: 1, index: 0},
          {num: 2, index: 4},
          {num: 3, index: 5},
          {num: 4, index: 3},
          {num: 5, index: 4},
          {num: 6, index: 2},
          {num: 7, index: 8},
          {num: 8, index: 1}
        ]);

      const actual = GameAPI.findGapCoordinates(tilesArray);

      expect(actual).toEqual(expected);
    });
  });


  describe('findMovableTilesIndexes', () => {
    it('should return array with movable tiles indexes (size: 3)', () => {
      const expected = df([8, 0, 5, 1].sort()),
        tilesArray = df([
          {num: 0, index: 2},
          {num: 1, index: 5},
          {num: 2, index: 6},
          {num: 3, index: 0},
          {num: 4, index: 7},
          {num: 5, index: 1},
          {num: 6, index: 8},
          {num: 7, index: 3},
          {num: 8, index: 4}
        ]);

      const actual = GameAPI.findMovableTilesIndexes(tilesArray);

      expect(actual).toEqual(expected);
    });


    it('should return array with movable tiles indexes (size: 4)', () => {
      const expected = df([7, 4, 10, 2, 5, 14].sort()),
        tilesArray = df([
          {num: 0, index: 6},
          {num: 1, index: 8},
          {num: 2, index: 4},
          {num: 3, index: 12},
          {num: 4, index: 0},
          {num: 5, index: 2},
          {num: 6, index: 15},
          {num: 7, index: 11},
          {num: 8, index: 7},
          {num: 9, index: 8},
          {num: 10, index: 14},
          {num: 11, index: 1},
          {num: 12, index: 10},
          {num: 13, index: 13},
          {num: 14, index: 3},
          {num: 15, index: 5}
        ]);

      const actual = GameAPI.findMovableTilesIndexes(tilesArray);

      expect(actual).toEqual(expected);
    });
  });


  describe('markMovableTiles', () => {
    it('should return tiles array with marked movable elements (size: 3)', () => {
      const expected = df([
          {num: 0, index: 2, canMove: false},
          {num: 1, index: 5, canMove: true},
          {num: 2, index: 6, canMove: false},
          {num: 3, index: 0, canMove: true},
          {num: 4, index: 7, canMove: false},
          {num: 5, index: 1, canMove: true},
          {num: 6, index: 8, canMove: true},
          {num: 7, index: 3, canMove: false},
          {num: 8, index: 4, canMove: false}
        ]),
        tilesArray = df(expected.map(tile => {
          return {...tile, canMove: false};
        }));

      const actual = GameAPI.markMovableTiles(tilesArray);

      expect(actual).toEqual(expected);
    });


    it('should return tiles array with marked movable elements (size: 4)', () => {
      const expected = df([
          {num: 0, index: 6, canMove: false},
          {num: 1, index: 8, canMove: false},
          {num: 2, index: 4, canMove: true},
          {num: 3, index: 12, canMove: false},
          {num: 4, index: 0, canMove: false},
          {num: 5, index: 2, canMove: true},
          {num: 6, index: 15, canMove: false},
          {num: 7, index: 11, canMove: false},
          {num: 8, index: 7, canMove: true},
          {num: 9, index: 8, canMove: false},
          {num: 10, index: 14, canMove: true},
          {num: 11, index: 1, canMove: false},
          {num: 12, index: 10, canMove: true},
          {num: 13, index: 13, canMove: false},
          {num: 14, index: 3, canMove: false},
          {num: 15, index: 5, canMove: true}
        ]),
        tilesArray = df(expected.map(tile => {
          return {...tile, canMove: false};
        }));

      const actual = GameAPI.markMovableTiles(tilesArray);

      expect(actual).toEqual(expected);
    });


    it('should set canMove property to false when puzzle is solved', () => {
      const inputArray = df([
          {num: 0, index: 15, canMove: false},
          {num: 1, index: 0, canMove: false},
          {num: 2, index: 1, canMove: true},
          {num: 3, index: 2, canMove: false},
          {num: 4, index: 3, canMove: false},
          {num: 5, index: 4, canMove: true},
          {num: 6, index: 5, canMove: false},
          {num: 7, index: 6, canMove: false},
          {num: 8, index: 7, canMove: true},
          {num: 9, index: 8, canMove: false},
          {num: 10, index: 9, canMove: true},
          {num: 11, index: 10, canMove: false},
          {num: 12, index: 11, canMove: true},
          {num: 13, index: 12, canMove: false},
          {num: 14, index: 13, canMove: false},
          {num: 15, index: 14, canMove: true}
        ]),
        expected = df(inputArray.map(tile => {
          return {...tile, canMove: false};
        }));

      const actual = GameAPI.markMovableTiles(inputArray);

      expect(actual).toEqual(expected);
    });
  });


  describe('getTileNumberByIndex', () => {
    it('should return tile number by tile index', () => {
      const obj1 = {num: 0, index: 2, canMove: false},
        obj2 = {num: 1, index: 5, canMove: true},
        obj3 = {num: 2, index: 6, canMove: false},
        tilesArray = df([
          obj1,
          obj2,
          obj3,
          {num: 3, index: 0, canMove: true},
          {num: 4, index: 7, canMove: false},
          {num: 5, index: 1, canMove: true},
          {num: 6, index: 8, canMove: true},
          {num: 7, index: 3, canMove: false},
          {num: 8, index: 4, canMove: false}
        ]);

      expect(GameAPI.getTileNumberByIndex(obj1.index, tilesArray)).toBe(obj1.num);
      expect(GameAPI.getTileNumberByIndex(obj2.index, tilesArray)).toBe(obj2.num);
      expect(GameAPI.getTileNumberByIndex(obj3.index, tilesArray)).toBe(obj3.num);
    });
  });


  describe('moveTiles', () => {
    it('should successfully move one tile (size: 2)', () => {
      const tilesArray = df([
          {num: 0, index: 1, canMove: false},
          {num: 1, index: 0, canMove: true},
          {num: 2, index: 3, canMove: true},
          {num: 3, index: 2, canMove: false}
        ]),

        expected = df([
          {num: 0, index: 0, canMove: false},
          {num: 1, index: 1, canMove: true},
          {num: 2, index: 3, canMove: false},
          {num: 3, index: 2, canMove: true}
        ]);

      const actual = GameAPI.moveTiles(0, tilesArray);

      expect(actual).toEqual(expected);
    });


    it('should successfully move three tiles (size: 4)', () => {
      const tilesArray = df([
        {num: 0, index: 8, canMove: false},
        {num: 1, index: 2, canMove: false},
        {num: 2, index: 6, canMove: false},
        {num: 3, index: 14, canMove: false},
        {num: 4, index: 3, canMove: false},
        {num: 5, index: 10, canMove: true},
        {num: 6, index: 0, canMove: true},
        {num: 7, index: 9, canMove: true},
        {num: 8, index: 1, canMove: false},
        {num: 9, index: 12, canMove: true},
        {num: 10, index: 11, canMove: true},
        {num: 11, index: 5, canMove: false},
        {num: 12, index: 15, canMove: false},
        {num: 13, index: 4, canMove: true},
        {num: 14, index: 13, canMove: false},
        {num: 15, index: 7, canMove: false}
      ]);

      const expected = df([
        {num: 0, index: 11, canMove: false},
        {num: 1, index: 2, canMove: false},
        {num: 2, index: 6, canMove: false},
        {num: 3, index: 14, canMove: false},
        {num: 4, index: 3, canMove: true},
        {num: 5, index: 9, canMove: true},
        {num: 6, index: 0, canMove: false},
        {num: 7, index: 8, canMove: true},
        {num: 8, index: 1, canMove: false},
        {num: 9, index: 12, canMove: false},
        {num: 10, index: 10, canMove: true},
        {num: 11, index: 5, canMove: false},
        {num: 12, index: 15, canMove: true},
        {num: 13, index: 4, canMove: false},
        {num: 14, index: 13, canMove: false},
        {num: 15, index: 7, canMove: true}
      ]);

      const actual = GameAPI.moveTiles(11, tilesArray);

      expect(actual).toEqual(expected);
    });


    it('should not move any tile when clicked on not movable tile', () => {
      const expected = df([
        {num: 0, index: 3, canMove: false},
        {num: 1, index: 7, canMove: false},
        {num: 2, index: 4, canMove: true},
        {num: 3, index: 1, canMove: false},
        {num: 4, index: 6, canMove: true},
        {num: 5, index: 0, canMove: true},
        {num: 6, index: 5, canMove: true},
        {num: 7, index: 2, canMove: false},
        {num: 8, index: 8, canMove: false}
      ]);

      const actual = GameAPI.moveTiles(1, expected);

      expect(actual).toEqual(expected);
    });
  });


  describe('isSolvable', () => {
    it('should return true when [2x2] puzzle is solvable [v1]', () => {
      const solvableArray = df([
        {num: 0, index: 2},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 3}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(true);
    });


    it('should return true when [2x2] puzzle is solvable [v2]', () => {
      const solvableArray = df([
        {num: 0, index: 1},
        {num: 1, index: 3},
        {num: 2, index: 2},
        {num: 3, index: 0}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(true);
    });


    it('should return true when [3x3] puzzle is solvable [v1]', () => {
      const solvableArray = df([
        {num: 0, index: 7},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 6},
        {num: 8, index: 8}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(true);
    });


    it('should return true when [3x3] puzzle is solvable [v2]', () => {
      const solvableArray = df([
        {num: 0, index: 3},
        {num: 1, index: 7},
        {num: 2, index: 4},
        {num: 3, index: 1},
        {num: 4, index: 6},
        {num: 5, index: 0},
        {num: 6, index: 5},
        {num: 7, index: 2},
        {num: 8, index: 8}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(true);
    });


    it('should return true when [4x4] puzzle is solvable', () => {
      const solvableArray = df([
        {num: 0, index: 14},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 6},
        {num: 8, index: 7},
        {num: 9, index: 8},
        {num: 10, index: 9},
        {num: 11, index: 10},
        {num: 12, index: 11},
        {num: 13, index: 12},
        {num: 14, index: 13},
        {num: 15, index: 15},
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(true);
    });


    it('should return false when [2x2] puzzle is unsolvable', () => {
      const solvableArray = df([
        {num: 0, index: 3},
        {num: 1, index: 0},
        {num: 2, index: 2},
        {num: 3, index: 1}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(false);
    });


    it('should return false when [3x3] puzzle is unsolvable', () => {
      const solvableArray = df([
        {num: 0, index: 7},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 8},
        {num: 8, index: 6}
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(false);
    });


    it('should return false when [4x4] puzzle is unsolvable', () => {
      const solvableArray = df([
        {num: 0, index: 14},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 6},
        {num: 8, index: 7},
        {num: 9, index: 8},
        {num: 10, index: 9},
        {num: 11, index: 10},
        {num: 12, index: 11},
        {num: 13, index: 12},
        {num: 14, index: 15},
        {num: 15, index: 13},
      ]);

      const actual = GameAPI.isSolvable(solvableArray);

      expect(actual).toBe(false);
    });
  });


  describe('isSolved', () => {
    it('should return true when [3x3] puzzle is solved', () => {
      const solvedArray = df([
        {num: 0, index: 8},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 6},
        {num: 8, index: 7}
      ]);

      const actual = GameAPI.isSolved(solvedArray);

      expect(actual).toBe(true);
    });


    it('should return true when [4x4] puzzle is solved', () => {
      const solvedArray = df([
        {num: 0, index: 15},
        {num: 1, index: 0},
        {num: 2, index: 1},
        {num: 3, index: 2},
        {num: 4, index: 3},
        {num: 5, index: 4},
        {num: 6, index: 5},
        {num: 7, index: 6},
        {num: 8, index: 7},
        {num: 9, index: 8},
        {num: 10, index: 9},
        {num: 11, index: 10},
        {num: 12, index: 11},
        {num: 13, index: 12},
        {num: 14, index: 13},
        {num: 15, index: 14}
      ]);

      const actual = GameAPI.isSolved(solvedArray);

      expect(actual).toBe(true);
    });


    it('should return false when puzzle is not solved', () => {
      const solvedArray = df([
        {num: 0, index: 0},
        {num: 1, index: 1},
        {num: 2, index: 2},
        {num: 3, index: 3},
        {num: 4, index: 4},
        {num: 5, index: 5},
        {num: 6, index: 6},
        {num: 7, index: 7},
        {num: 8, index: 8}
      ]);

      const actual = GameAPI.isSolved(solvedArray);

      expect(actual).toBe(false);
    });
  });


  describe('getGameName', () => {
    it('should return general name when gameSize is not provided', () => {
      const expected = df('N Puzzle');

      const actual = GameAPI.getGameName();

      expect(actual).toBe(expected);
    });


    it('should return specific name when gameSize is passed', () => {
      const expected = df('15 Puzzle'),
        gameSize = 4;

      const actual = GameAPI.getGameName(gameSize);

      expect(actual).toBe(expected);
    });
  });


  describe('getRandomGameSize', () => {
    it('should return number, that is in range [minGameSize; maxGameSize]', () => {
      const minGameSize = df(2),
        maxGameSize = df(7);

      const actual = GameAPI.getRandomGameSize();

      expect(actual).toBeA('number');
      expect(actual).toBeGreaterThanOrEqualTo(minGameSize);
      expect(actual).toBeLessThanOrEqualTo(maxGameSize);
    });
  });
});
