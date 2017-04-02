import GameAPI from 'GameAPI';


/**
 * Start game action generator
 *
 * @param {number} gameSize
 * @returns {Object} Action for appReducer
 */
export const startGame = function(gameSize) {
  // Validate gameSize
  const validGameSize = GameAPI.limitGameSize(gameSize);

  return {
    type: 'START_GAME',
    gameSize: validGameSize,
    tiles: GameAPI.createTilesArray(validGameSize)
  };
};


/**
 * New game action generator
 *
 * @returns {Object} Action for appReducer
 */
export const newGame = function() {
  return {
    type: 'NEW_GAME'
  };
};


/**
 * Set start time action generator
 *
 * @returns {Object} Action for appReducer
 */
export const setStartTime = function() {
  return {
    type: 'SET_START_TIME',
    startTime: Date.now()
  };
};


/**
 * Won game action generator
 *
 * @returns {Object} Action for appReducer
 */
export const wonGame = function() {
  return {
    type: 'WON_GAME'
  };
};


/**
 * Move tiles action generator
 *
 * @param {Array} tiles
 * @returns {Object} Action for appReducer
 */
export const moveTiles = function(tiles) {
  return {
    type: 'MOVE_TILES',
    tiles
  };
};