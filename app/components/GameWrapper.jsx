import React from 'react';


/**
 * GameWrapper React PureComponent
 */
export class GameWrapper extends React.PureComponent {
  render() {
    return (
      <div className="row game-wrapper">
        <div className="column small-centered small-12 medium-6 large-4">
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default GameWrapper;