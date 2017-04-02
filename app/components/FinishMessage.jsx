import React from 'react';
import {connect} from 'react-redux';

import TimeAPI from 'TimeAPI';


/**
 * FinishMessage React PureComponent
 */
export class FinishMessage extends React.PureComponent {
  render() {
    const {movesCount, startTime} = this.props,
      gameTimeInSeconds = TimeAPI.getDiffInSecondsFromMoment(startTime),
      gameTime = TimeAPI.formatSecondsForOutput(gameTimeInSeconds, true);

    return (
      <div className="finish-message">
        <span>{`You've made ${movesCount} moves in ${gameTime}`}<br /></span>
      </div>
    );
  }
}


export default connect(state => {
  return {
    movesCount: state.movesCount,
    startTime: state.startTime
  };
})(FinishMessage);