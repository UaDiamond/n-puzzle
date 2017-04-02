const appReducer = function(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameSize: action.gameSize,
        movesCount: 0,
        startTime: null,
        tiles: action.tiles,
        wonGame: false
      };


    case 'NEW_GAME':
      return {
        ...state,
        gameSize: null,
        movesCount: null,
        startTime: null,
        tiles: [],
        wonGame: null
      };


    case 'WON_GAME':
      return {
        ...state,
        wonGame: true
      };


    case 'MOVE_TILES':
      return {
        ...state,
        movesCount: state.movesCount + 1,
        tiles: action.tiles
      };


    case 'SET_START_TIME':
      return {
        ...state,
        startTime: action.startTime
      };


    default:
      return state;
  }
};


export default appReducer;