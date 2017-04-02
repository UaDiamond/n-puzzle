import React from 'react';


/**
 * Info React PureComponent
 */
export class Info extends React.PureComponent {
  render() {
    return (
      <div className="row page-info">
        <div className="column small-centered small-11 medium-10 large-8">
          <h4 className="page-title">Info</h4>
          <p>The N-puzzle (also called Gem Puzzle, Boss Puzzle, Game of Fifteen, Mystic Square and many others) is a
            sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing.</p>
          <p>The puzzle also exists in other sizes, particularly the smaller 8-puzzle. If the size is 3×3 tiles, the
            puzzle is called the 8-puzzle, and if 4×4 tiles, the puzzle is called the 15-puzzle named for the number of
            tiles and so on.</p>
          <p className="info-box">The object of the puzzle is to place the tiles in order by making sliding moves that use
            the empty space.</p>
        </div>
      </div>
    );
  }
}


export default Info;