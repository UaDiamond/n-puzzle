import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import GameAPI from 'GameAPI';


/**
 * Random React PureComponent
 */
export class Random extends React.PureComponent {
  render() {
    const {gameSize} = this.props;
    let newGameSize;

    // generate new game with gameSize that not equals to the previous
    do {
      newGameSize = GameAPI.getRandomGameSize();
    } while (typeof gameSize === 'number' && newGameSize === gameSize);

    return <Redirect to={"/game/" + newGameSize}/>;
  }
}


export default connect(state => {
  return {
    gameSize: state.gameSize
  };
})(Random);