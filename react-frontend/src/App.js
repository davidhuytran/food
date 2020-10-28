import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/" component={Login}/> 
              <Route exact path="/home" component={Home}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;