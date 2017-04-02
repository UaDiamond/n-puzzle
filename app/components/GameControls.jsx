import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from 'actions';


/**
 * GameControls React Component
 */
export class GameControls extends React.Component {
  constructor(props) {
    super(props);

    this.handleRestart = this.handleRestart.bind(this);
  }


  /**
   * Handler for restarting game with the same size
   */
  handleRestart() {
    const {gameSize, dispatch} = this.props;

    dispatch(actions.startGame(gameSize));
  }


  render() {
    const {wonGame, startTime} = this.props;
    const restartButtonText = wonGame ? 'Play again' : startTime ? 'Restart' : 'Shuffle';
    const hollowClass = wonGame ? '' : ' hollow';

    return (
      <div className="game-controls">
        <div className="row">
          <div className="column small-6">
            <button className={"button expanded success button-rounded" + hollowClass} onClick={this.handleRestart}>
              {restartButtonText}
            </button>
          </div>
          <div className="column small-6">
            <Link to="/" className={"button expanded button-rounded" + hollowClass}>New game</Link>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => {
  return {
    gameSize: state.gameSize,
    wonGame: state.wonGame,
    startTime: state.startTime
  };
})(GameControls);