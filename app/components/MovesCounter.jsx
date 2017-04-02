import React from 'react';
import {connect} from 'react-redux';


/**
 * MovesCounter React PureComponent
 */
export class MovesCounter extends React.PureComponent {
  render() {
    return (
      <div className="moves-counter">
        {`Moves: ${this.props.movesCount}`}
      </div>
    );
  }
}


export default connect(state => {
  return {
    movesCount: state.movesCount
  };
})(MovesCounter);