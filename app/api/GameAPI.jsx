class GameAPI {
  /**
   * Get min game size
   *
   * @returns {number} min game size
   */
  static getMinGameSize() {
    return 2;
  }


  /**
   * Get max game size
   *
   * @returns {number} max game size
   */
  static getMaxGameSize() {
    return 7;
  }


  /**
   * Generate tiles array for game
   *
   * @param {number} gameSize
   * @returns {Array} tiles array
   */
  static createTilesArray(gameSize) {
    // Validate gameSize
    const validGameSize = GameAPI.limitGameSize(gameSize);

    const tilesCount = GameAPI.getTilesCountByGameSize(validGameSize),
      tempArray = [];

    // Generate tiles
    for (let i = 0; i < tilesCount; i++) {
      tempArray.push({
        index: i,
        num: i,
        canMove: false
      });
    }

    let shuffledTilesArray;
    do {
      shuffledTilesArray = GameAPI.shuffleTiles(tempArray);
    } while (!GameAPI.isSolvable(shuffledTilesArray) || GameAPI.isSolved(shuffledTilesArray));

    return GameAPI.markMovableTiles(shuffledTilesArray, validGameSize);
  }


  /**
   * Limit gameSize to allowed range
   *
   * @param {number} gameSize
   * @returns {number} gameSize
   */
  static limitGameSize(gameSize) {
    const minSize = GameAPI.getMinGameSize(),
      maxSize = GameAPI.getMaxGameSize();

    return Math.min(Math.max(parseInt(gameSize, 10), minSize), maxSize);
  }


  /**
   * Randomly shuffle tiles in array
   *
   * @param {Array} tilesArray
   * @return {Array} shuffled tiles array
   */
  static shuffleTiles(tilesArray) {
    let shuffledTiles = JSON.parse(JSON.stringify(tilesArray));

    for (let i = shuffledTiles.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [shuffledTiles[i - 1].index, shuffledTiles[j].index] = [shuffledTiles[j].index, shuffledTiles[i - 1].index];
    }

    return shuffledTiles;
  }


  /**
   * Calculate tiles count by game size
   *
   * @param {number} gameSize
   * @returns {number} tiles count
   */
  static getTilesCountByGameSize(gameSize) {
    return Math.pow(parseInt(gameSize, 10), 2);
  }


  /**
   * Calculate game size by tiles count
   *
   * @param {number} tilesCount
   * @returns {number} game size
   */
  static getGameSizeByTilesCount(tilesCount) {
    return Math.sqrt(parseInt(tilesCount, 10));
  }


  /**
   * Check if needle exists in haystack (using strict comparison)
   *
   * @param {*} needle
   * @param {Array} haystack
   * @returns {boolean}
   */
  static isInArray(needle, haystack) {
    for (let elem of haystack) {
      if (JSON.stringify(needle) === JSON.stringify(elem)) return true;
    }
    return false;
  }


  /**
   * Check if tiles arrays are identical
   *
   * @param {Array} array1
   * @param {Array} array2
   * @returns {boolean}
   */
  static compareArrays(array1, array2) {
    return array1.length === array2.length && JSON.stringify(array1) === JSON.stringify(array2);
  }


  /**
   * Find gap index in tiles array
   *
   * @param {Array} tilesArray
   * @returns {number} gap index
   */
  static getGapIndex(tilesArray) {
    const tempArray = JSON.parse(JSON.stringify(tilesArray));

    let gapIndex;

    for (let tile of tempArray) {
      if (0 === tile.num) {
        gapIndex = tile.index;
        break;
      }
    }

    return parseInt(gapIndex, 10);
  }


  /**
   * Convert tile index to coordinates object
   *
   * @param {number} tileIndex
   * @param {number} gameSize
   * @returns { {y: {number}, x: {number}} } coordinate object
   */
  static convertIndexToCoordinates(tileIndex, gameSize) {
    const id = parseInt(tileIndex, 10) + 1,
      x = id % gameSize ? id % gameSize : gameSize,
      y = Math.floor(id / gameSize) + (gameSize === x ? 0 : 1);

    return y > gameSize || x > gameSize ? false : {x, y};
  }


  /**
   * Convert coordinates object to Tile Index
   *
   * @param {Object} coordinates object
   * @param {number} gameSize
   * @returns {number} tile index
   */
  static convertCoordinatesToIndex(coordinates, gameSize) {
    const {x, y} = coordinates;

    if (x > gameSize || y > gameSize) return false;

    const calc_x = x - 1;
    const calc_y = (y - 1) * gameSize;

    return calc_x + calc_y;
  }


  /**
   * Find gap coordinates object
   *
   * @param {Array} tilesArray
   * @returns { {y: {number}, x: {number}} } coordinates object
   */
  static findGapCoordinates(tilesArray) {
    const gameSize = GameAPI.getGameSizeByTilesCount(tilesArray.length);

    return GameAPI.convertIndexToCoordinates(GameAPI.getGapIndex(tilesArray), gameSize);
  }


  /**
   * Create array with movable tiles indexes
   *
   * @param {Array} tilesArray
   * @returns {Array} movable tiles indexes array
   */
  static findMovableTilesIndexes(tilesArray) {
    const gameSize = GameAPI.getGameSizeByTilesCount(tilesArray.length),
      {x, y} = GameAPI.findGapCoordinates(tilesArray),
      movableTilesIndexes = [];

    // Find X-tiles
    for (let i = 1; i <= gameSize; i++) {
      if (i === x) continue;
      movableTilesIndexes.push(GameAPI.convertCoordinatesToIndex({y, x: i}, gameSize));
    }

    // Find Y-tiles
    for (let i = 1; i <= gameSize; i++) {
      if (i === y) continue;
      movableTilesIndexes.push(GameAPI.convertCoordinatesToIndex({x, y: i}, gameSize));
    }

    return movableTilesIndexes.sort();
  }


  /**
   * Mark movable tiles in tiles array
   *
   * @param {Array} tilesArray
   * @returns {Array} tiles array
   */
  static markMovableTiles(tilesArray) {
    // Check if puzzle is solved
    const solved = GameAPI.isSolved(tilesArray);

    // Produce array with movable
    const movableTilesIndexes = (!solved) ? GameAPI.findMovableTilesIndexes(tilesArray) : [];

    // Set canMove property to true for movable tiles
    return tilesArray.map(tile => {
      return {
        ...tile,
        canMove: GameAPI.isInArray(tile.index, movableTilesIndexes)
      };
    });
  }


  /**
   * Get tile number by tile index
   *
   * @param {number} tileIndex
   * @param {Array} tilesArray
   * @returns {number} tile number
   */
  static getTileNumberByIndex(tileIndex, tilesArray) {
    const tempArray = JSON.parse(JSON.stringify(tilesArray));

    for (let {index, num} of tempArray) {
      if (index === tileIndex) return num;
    }

    return false;
  }


  /**
   * Move tiles to new positions
   *
   * @param {number} tileIndex
   * @param {Array} tilesArray
   * @param {boolean} clicked (Use this param to avoid multiple markMovableTiles call in recursion)
   * @returns {Array} tiles array
   */
  static moveTiles(tileIndex, tilesArray, clicked = true) {
    let tempArray = JSON.parse(JSON.stringify(tilesArray));
    const tileNum = GameAPI.getTileNumberByIndex(tileIndex, tempArray);
    if (!tempArray[tileNum].canMove) return tempArray;

    let gapIndex = GameAPI.getGapIndex(tempArray);

    const gameSize = GameAPI.getGameSizeByTilesCount(tempArray.length),
      {x: gapX, y: gapY} = this.convertIndexToCoordinates(gapIndex, gameSize),
      {x: tileX, y: tileY} = this.convertIndexToCoordinates(tileIndex, gameSize),
      isInRow = gapY === tileY,
      isNextInRow = isInRow && Math.abs(gapX - tileX) === 1,
      isInColumn = gapX === tileX,
      isNextInColumn = isInColumn && Math.abs(gapY - tileY) === 1;

    if (!(isNextInRow || isNextInColumn)) {
      let nextTile, nextTileIndex, nextTileX, nextTileY;

      if (isInRow) {
        nextTileX = ((gapX - tileX) > 0) ? tileX + 1 : tileX - 1;
        nextTile = {y: tileY, x: nextTileX};
      } else {
        nextTileY = ((gapY - tileY) > 0) ? tileY + 1 : tileY - 1;
        nextTile = {y: nextTileY, x: tileX};
      }
      gapIndex = nextTileIndex = this.convertCoordinatesToIndex(nextTile, gameSize);
      tempArray = GameAPI.moveTiles(nextTileIndex, tempArray, false);
    }

    const gapNum = GameAPI.getTileNumberByIndex(gapIndex, tempArray);

    // Moving tiles
    tempArray[tileNum].index = gapIndex;
    tempArray[gapNum].index = tileIndex;

    // Make sure that mark movable elements only once per each recursion and return result
    return (clicked) ? GameAPI.markMovableTiles(tempArray, gameSize) : tempArray;
  }


  /**
   * Check if given puzzle is solvable
   *
   * @param {Array} tilesArray
   * @returns {boolean}
   */
  static isSolvable(tilesArray) {
    const tempArray = tilesArray.slice(),
      tilesNumber = tempArray.length,
      gridWidth = GameAPI.getGameSizeByTilesCount(tilesNumber);

    let number = 0,
      row = 0,
      blankRow = 0;

    for (let i = 0; i < tilesNumber; i++) {
      const iTileNum = GameAPI.getTileNumberByIndex(i, tempArray);
      if (i % gridWidth === 0) {
        row++;
      }
      if (iTileNum === 0) {
        blankRow = row;
        continue;
      }
      for (let j = i + 1; j < tilesNumber; j++) {
        const jTileNum = GameAPI.getTileNumberByIndex(j, tempArray);

        if (iTileNum > jTileNum && jTileNum !== 0) {
          number++;
        }
      }
    }

    if (gridWidth % 2 === 0) {
      if (blankRow % 2 === 0) {
        return number % 2 === 0;
      } else {
        return number % 2 !== 0;
      }
    } else {
      return number % 2 === 0;
    }
  }


  /**
   * Check if puzzle is solved
   *
   * @param {Array} tilesArray
   * @returns {boolean}
   */
  static isSolved(tilesArray) {
    const tempArray = JSON.parse(JSON.stringify(tilesArray)).slice(1);

    for (let tile of tempArray) {
      if (tile.num !== tile.index + 1) return false;
    }

    return true;
  }


  /**
   * Game name generator
   *
   * @param {number} gameSize
   * @returns {string} name
   */
  static getGameName(gameSize = null) {
    const number = gameSize ? Math.pow(gameSize, 2) - 1 : 'N';
    return number + ' Puzzle'
  }


  /**
   * Generate random game size
   *
   * @returns {number} game size
   */
  static getRandomGameSize() {
    const minGameSize = GameAPI.getMinGameSize(),
      maxGameSize = GameAPI.getMaxGameSize();

    return Math.floor(Math.random() * (maxGameSize - minGameSize + 1)) + minGameSize;
  }
}


export default GameAPI;