import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import $ from 'jquery';

import GameAPI from 'GameAPI';


/**
 * Nav React PureComponent
 */
export class Nav extends React.PureComponent {
  componentDidMount() {
    const $rightMenu = $("#right-menu");

    $(document).on('click', function(e) {
      if (!Foundation.MediaQuery.atLeast('medium') && $rightMenu.css('display') !== 'none') {
        const $topBar = $('.top-bar');

        if ($('.top-bar a').is(e.target) || (!$topBar.is(e.target) && $topBar.has(e.target).length === 0 )) {
          $rightMenu.hide();
        }
      }
    });
  }


  render() {
    const {gameSize, location, startTime, wonGame} = this.props,
      patt = /\/game\/[2-7]$/,
      isGamePage = patt.test(location.pathname);

    return (
      <nav className="top-bar" data-topbar="" role="navigation">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-toggle" data-hide-for="medium" data-responsive-toggle="right-menu">
              <button className="menu-icon" data-toggle="" type="button"></button>
            </li>
            <li className="menu-text">{GameAPI.getGameName(gameSize)}</li>
            {gameSize && !isGamePage && !wonGame ? (
              <li>
                <NavLink activeClassName="active" to={`/game/${gameSize}`}>
                  {startTime ? 'Continue' : 'Play'}
                </NavLink>
              </li>
            ) : null }
          </ul>

        </div>
        <div className="top-bar-right">
          <ul className="menu dropdown vertical medium-horizontal" id="right-menu">
            <li><NavLink activeClassName="active" exact to="/">New game</NavLink></li>
            <li><NavLink activeClassName="active" to="/game/random">Random</NavLink></li>
            <li><NavLink activeClassName="active" to="/info">Info</NavLink></li>
          </ul>
        </div>
      </nav>
    );
  }
}


export default withRouter(connect(state => {
  return {
    gameSize: state.gameSize,
    startTime: state.startTime,
    wonGame: state.wonGame
  };
})(Nav));