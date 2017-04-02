import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {BrowserRouter as Router} from 'react-router-dom';
import expect from 'expect';
import $ from 'jQuery';

import * as actions from 'actions';
import {GameControls} from 'GameControls';


describe('GameControls Component', () => {
  it('should exist', () => {
    expect(GameControls).toExist();
  });


  describe('render', () => {
    it('should render component with class "game-controls" to the output', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={false}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls));

      const actual = $el.hasClass('game-controls');

      expect(actual).toBe(true);
    });


    it('should render buttons with class "hollow" when game is not finished', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={false}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $buttons = $el.find('.hollow');

      const actual = $buttons.length;

      expect(actual).toBe(2);
    });


    it('should render buttons without class "hollow" when game is finished', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={true}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $buttons = $el.find('.hollow');

      const actual = $buttons.length;

      expect(actual).toBe(0);
    });


    it('should render restart button with text "Shuffle" when game is not started', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={null} wonGame={false}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $restartButton = $el.find('.button')[0];

      const actualText = $restartButton.innerText;

      expect(actualText).toInclude('Shuffle');
    });


    it('should render restart button with text "Restart" when game is started', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={false}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $restartButton = $el.find('.button')[0];

      const actualText = $restartButton.innerText;

      expect(actualText).toInclude('Restart');
    });


    it('should render restart button with text "Play again" when game is finished', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={true}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $restartButton = $el.find('.button')[0];

      const actualText = $restartButton.innerText;

      expect(actualText).toInclude('Play again');
    });


    it('should render new game link to start page', () => {
      const gameControls = TestUtils.renderIntoDocument(
        <Router>
          <GameControls startTime={Date.now()} wonGame={false}/>
        </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $restartButton = $el.find('.button')[1];

      const actualLink = $restartButton.attributes.href.nodeValue;

      expect(actualLink).toBe('/');
    });
  });

  describe('handleRestart', () => {
    it('should call dispatcher with startGame action when user clicks on restart button', () => {
      const spy = expect.createSpy(),
        gameSize = 3,
        startGameAction = actions.startGame(gameSize),
        gameControls = TestUtils.renderIntoDocument(
          <Router>
            <GameControls dispatch={spy} gameSize={gameSize} startTime={Date.now()} wonGame={false}/>
          </Router>),
        $el = $(ReactDOM.findDOMNode(gameControls)),
        $restartButton = $el.find('.button')[0];

      TestUtils.Simulate.click($restartButton);

      expect(spy).toHaveBeenCalled();
      expect(spy.calls[0].arguments[0].gameSize).toBe(gameSize);
      expect(spy.calls[0].arguments[0].type).toBe(startGameAction.type);
      expect(spy.calls[0].arguments[0].tiles.length).toBe(startGameAction.tiles.length);
    });
  });
});