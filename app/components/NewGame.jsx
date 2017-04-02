import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from 'actions';
import GameAPI from 'GameAPI';
import GameWrapper from 'GameWrapper';


/**
 * NewGame React Component
 */
export class NewGame extends React.Component {
  componentWillMount() {
    const {dispatch} = this.props;

    dispatch(actions.newGame());
  }


  render() {
    function generateButtons() {
      const min = GameAPI.getMinGameSize(),
        max = GameAPI.getMaxGameSize(),
        buttons = [];

      for (let i = min; i <= max; i++) {
        buttons.push(
          <li key={i}>
            <Link to={"/game/" + i} className="custom-button"><span>{i + "×" + i}</span></Link>
          </li>
        );
      }

      return buttons;
    }

    return (
      <GameWrapper>
        <h4 className="page-title">Select game size:</h4>
        <ul className="game-buttons">
          {generateButtons()}
        </ul>
        <h4 className="page-title">or</h4>
        <Link to="/game/random" className="button-random">Play random game</Link>
      </GameWrapper>
    );
  }
}


export default connect()(NewGame);