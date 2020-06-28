import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
