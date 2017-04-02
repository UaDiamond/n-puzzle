import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from 'actions';
import FinishMessage from 'FinishMessage';
import GameAPI from 'GameAPI';
import GameBoard from 'GameBoard';
import GameControls from 'GameControls';
import GameWrapper from 'GameWrapper';
import MovesCounter from 'MovesCounter';
import StartMessage from 'StartMessage';
import Timer from 'Timer';


/**
 * GameApp React Component
 */
export class GameApp extends React.Component {
  componentWillMount() {
    const queryGameSize = parseInt(this.props.match.params.gameSize, 10),
      {gameSize} = this.props;

    if (gameSize !== queryGameSize) {
      this.handleGameSizeChange(queryGameSize);
    }
  }


  componentWillReceiveProps({match}) {
    const queryGameSize = parseInt(match.params.gameSize, 10),
      {gameSize} = this.props;

    if (gameSize !== queryGameSize) {
      this.handleGameSizeChange(queryGameSize);
    }
  }


  /**
   * Handler for gameSize change
   *
   * @param {number} newGameSize
   */
  handleGameSizeChange(newGameSize) {
    this._validGameSize = (!isNaN(newGameSize)) ? GameAPI.limitGameSize(newGameSize) : null;

    if (isNaN(newGameSize)) {
      this._redirectTo = '/';
    } else if (newGameSize !== this._validGameSize) {
      this._redirectTo = '/game/' + this._validGameSize;
    }

    if (!this._redirectTo) {
      const {dispatch} = this.props;
      dispatch(actions.startGame(this._validGameSize));
    }
  }


  render() {
    if (this._redirectTo) {
      return <Redirect to={this._redirectTo}/>;
    }

    const {movesCount, startTime, tiles, wonGame} = this.props,
      showStartMessage = Boolean(0 === movesCount && !wonGame),
      showCounters = Boolean(startTime && !wonGame),
      showFinishMessage = Boolean(wonGame),
      showGameBoard = Boolean(tiles.length),
      showGameControls = Boolean(tiles.length);


    function renderCounters() {
      return (
        <div className="game-counters">
          <MovesCounter/>
          <Timer/>
        </div>
      );
    }

    return (
      <GameWrapper>
        <div className="game-info">
          { showStartMessage && <StartMessage/> }
          { showCounters && renderCounters() }
          { showFinishMessage && <FinishMessage/> }
        </div>
        { showGameBoard && <GameBoard/> }
        { showGameControls && <GameControls/> }
      </GameWrapper>
    );
  }
}


export default connect(state => {
  return {
    gameSize: state.gameSize,
    movesCount: state.movesCount,
    startTime: state.startTime,
    tiles: state.tiles,
    wonGame: state.wonGame
  };
})(GameApp);