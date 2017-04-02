import React from 'react';
import {connect} from 'react-redux';

import * as actions from 'actions';
import GameAPI from 'GameAPI';


/**
 * Tile React Component
 */
export class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  /**
   * Handler for click on tile
   */
  handleClick() {
    const {num, movesCount, tiles, wonGame, dispatch} = this.props,
      {index, canMove} = tiles[num];

    if (wonGame) return false;

    if (canMove) {
      const updatedTiles = GameAPI.moveTiles(index, tiles);
      dispatch(actions.moveTiles(updatedTiles));

      if (0 === movesCount) {
        dispatch(actions.setStartTime());
      }

      if (GameAPI.isSolved(updatedTiles)) {
        dispatch(actions.wonGame());
      }
    }
  }


  render() {
    const {gameSize, num, tiles} = this.props,
      {index, canMove} = tiles[num],
      tileSize = Math.floor(10000 / gameSize) / 100,
      cs = GameAPI.convertIndexToCoordinates(index, gameSize),
      movable = canMove ? '1' : '-1';

    let tileClasses = 'tile';
    tileClasses += 0 === num ? ' gap' : '';
    tileClasses += canMove ? ' movable' : '';

    const tileStyles = {
      top: (cs.y - 1) * tileSize + '%',
      left: (cs.x - 1) * tileSize + '%'
    };

    return (
      <button className={tileClasses}
              style={tileStyles}
              tabIndex={movable}
              onClick={this.handleClick}>
        <span>{num}</span>
      </button>
    );
  }
}


export default connect(state => {
  return {
    gameSize: state.gameSize,
    movesCount: state.movesCount,
    tiles: state.tiles,
    wonGame: state.wonGame
  };
})(Tile);