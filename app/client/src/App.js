import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Welcome} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile}/>
            <Route path="/:any" component={Welcome}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
