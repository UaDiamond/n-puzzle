import React from 'react';
import {connect} from 'react-redux';

import Tile from 'Tile';


/**
 * GameBoard React PureComponent
 */
export class GameBoard extends React.PureComponent {
  render() {
    const {gameSize, tiles, wonGame} = this.props,
      gameSizeClass = ' game-' + gameSize,
      wonClass = wonGame ? ' game-won' : '';

    return (
      <div className={'game-board' + gameSizeClass + wonClass}>
        {tiles.map(({num}) => <Tile num={num} key={num}/>)}
      </div>
    );
  }
}


export default connect(state => {
  return {
    gameSize: state.gameSize,
    tiles: state.tiles,
    wonGame: state.wonGame
  };
})(GameBoard);