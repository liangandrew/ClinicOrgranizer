import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import axios from 'axios';


class App extends Component {
  constructor(){
    super()
    this.state={
      logged_in:false
    }
  }

  checkAuth(){
    axios.get('api/login/status',{withCredentials:true}).then(res=>{
        console.log(res)
        if(res.data.logged_in && !this.state.logged_in){
            this.setState({
                logged_in:true
            })
        }
        else if(!res.data.logged_in && this.state.logged_in){
            this.setState({
                logged_in:false
            })
        }
    }).catch(err=>{
        console.log(err)
    })
  }

  componentDidMount(){
    this.checkAuth()
  }

  navbarLogout=()=>{
    axios.get('api/logout',{withCredentials:true}).then(res=>{
      console.log(res)
      if(res.data.success){
        this.setState({
          logged_in:false
        })
        // return <Redirect to="/"/>
      }
      console.log("state after logging out")
      console.log(this.state.logged_in)
      }).catch(err=>{
        console.log(err)
    })
  }

  handleLogin=()=>{
    this.setState({logged_in:true})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={this.state.logged_in} logout={this.navbarLogout}/>
          <Route exact path="/" render={(props) => <Welcome {...props} isAuthenticated={this.state.logged_in}/>} />
          <Switch>
            <Route exact path="/register" render={(props) => <Login {...props} isAuthenticated={this.state.logged_in}/>} />
            <Route exact path="/login" render={(props) => <Login {...props} isAuthenticated={this.state.logged_in} appLogin={this.handleLogin}/>}  />
            <Route exact path="/profile" render={(props) => <Profile {...props} isAuthenticated={this.state.logged_in}/>} />
            <Route path="/:any" component={Welcome}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
