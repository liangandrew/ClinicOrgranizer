import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Register}/>
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
