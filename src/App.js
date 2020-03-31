import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { NoFound } from './pages/NoFound';
import Home from './pages/Home';
import Judge from './pages/Judge/Judge';
import Player from './pages/Player/Player';
import Header from './components/header/header'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ width: "100%", height:200, border: "1px solid red" }}>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/Judge" component={ Judge } />
            <Route exact path="/Player" component={ Player } />
            <Route component={ NoFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
