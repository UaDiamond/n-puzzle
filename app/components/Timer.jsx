import React from 'react';
import {connect} from 'react-redux';

import TimeAPI from 'TimeAPI';


/**
 * Timer React Component
 */
export class Timer extends React.Component {
  constructor(props) {
    super(props);

    const {startTime} = props,
      gameTime = TimeAPI.getDiffInSecondsFromMoment(startTime);

    // Save startTime & gameTime to component state
    this.state = {
      gameTime,
      startTime
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }


  componentDidMount() {
    this.startTimer();
  }


  componentWillUnmount() {
    this.stopTimer();
  }


  /**
   * Helper method: Begin time counting when user starts to play
   */
  startTimer() {
    // Initialize timer and save its Id to internal property
    this._activeTimerId = setInterval(() => {
      const gameTime = TimeAPI.getDiffInSecondsFromMoment(this.state.startTime);

      this.setState({gameTime});
    }, 1000);
  }


  /**
   * Helper method: Stop time counting on game end or when user switches to another tab
   */
  stopTimer() {
    // Stop timer
    clearInterval(this._activeTimerId);

    // Clear ref to active timer
    this._activeTimerId = null;
  }


  render() {
    const time = TimeAPI.formatSecondsForOutput(this.state.gameTime);

    return (
      <div className="time-counter">
        {`Your time: ${time}`}
      </div>
    );
  }
}


export default connect((state) => {
  return {startTime: state.startTime};
})(Timer);