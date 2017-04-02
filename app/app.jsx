import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'configureStore';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import $ from 'jquery';

import GameApp from 'GameApp';
import Info from 'Info';
import Nav from 'Nav';
import NewGame from 'NewGame';
import NotFound from 'NotFound';
import Random from 'Random';


// Load App styles
import 'applicationStyles';


// Create Redux store
const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route exact path="/" component={NewGame} />
          <Route path="/game/:gameSize([2-7])" component={GameApp} />
          <Route path="/game/random" component={Random} />
          <Route path="/info" component={Info} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('game')
);


// Init Foundation
$(document).foundation();