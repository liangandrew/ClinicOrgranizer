import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import AppointmentScreen from "./components/AppointmentScreen";
import NewAppointment from "./components/NewAppointment";
import {login, getAppointments, deleteAppointment, createAppointment, createReminder, editAppointment } from "./components/ApiFunctions";

import axios from 'axios';


class App extends Component {
  constructor(){
    super()
    this.state={
      logged_in:false,
      user_email:'',
      is_org:false,
      fetched_data:false,
      deleted_data:false,
      new_data:false,
      edited_data:false,
      appointments:[]
    }
  }

  checkAuth(){
    axios.get('/api/login/status',{withCredentials:true}).then(res=>{
        if(res.data.logged_in && !this.state.logged_in){
            this.setState({
                logged_in:true,
                user_email:res.data.user_email,
                is_org:res.data.is_org
            })
        }
        else if(!res.data.logged_in && this.state.logged_in){
            this.setState({
                logged_in:false,
                user_email:'',
                is_org:false
            })
        }
    }).catch(err=>{
        console.log(err)
    })
  }

  componentDidMount(){
    this.checkAuth()
    console.log(this.state)
  }

  componentDidUpdate(){
    if(this.state.logged_in && (!this.state.fetched_data || this.state.deleted_data || this.state.new_data || this.state.edited_data)){
      
      getAppointments().then(data=>{
        if(data.success){
          this.setState({appointments:data.appointments, fetched_data:true, new_data:false,deleted_data:false,edited_data:false})
          console.log(data)
        }
        
      })
    }
  }

  navbarLogout=()=>{
    axios.get('/api/logout',{withCredentials:true}).then(res=>{
      console.log(res)
      if(res.data.success){
        this.setState({
          logged_in:false,
          user_email:'',
          is_org:false
        })
      }
      console.log("state after logging out")
      console.log(this.state)
      }).catch(err=>{
        console.log(err)
    })
  }

  handleLogin=(user)=>{
    
    login(user).then(res=>{
      console.log(res)
      if(res.success){
        this.setState({
          logged_in:true,
          is_org:res.is_org,
          user_email:res.user_email
        })
      }
      // console.log(this.state)

    })
  }

  handleDelete=(id)=>{
    deleteAppointment(id).then(res=>{
      console.log(res)
      if(res.data.success){
        this.setState({edited_data:true})
      }
    })
  }

  handleNewAppointment=(apt)=>{
    //make axios request to add appointment
    //change state new_data to rerender
    createAppointment(apt).then(res=>{
      console.log(res)
      this.setState({new_data:true})
    }).catch(err=>{
      console.log(err)
    })
  }

  handleNewReminder=(rem)=>{
    createReminder(rem).then(res=>{
      console.log(res)
      this.setState({edited_data:true})
    })
  }

  handleEditAppointment=(edits)=>{
    console.log(edits)
    editAppointment(edits).then(res=>{
      console.log(res)
      this.setState({edited_data:true})
    }).catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={this.state.logged_in} logout={this.navbarLogout}/>
          <Route exact path="/" render={(props) => <Welcome {...props} isAuthenticated={this.state.logged_in}/>} />
          <Switch>
            <Route exact path="/register" render={(props) => <Register {...props} isAuthenticated={this.state.logged_in}/>} />
            <Route exact path="/login" render={(props) => <Login {...props} isAuthenticated={this.state.logged_in} appLogin={this.handleLogin}/>}  />
            <Route exact path="/profile" render={(props) => <Profile {...props} isAuthenticated={this.state.logged_in} appointments={this.state.appointments}/>} />
            <Route exact path="/make_appointment" render={(props) => <NewAppointment {...props} isAuthenticated={this.state.logged_in} is_org={this.state.is_org} user_email={this.state.user_email} createNewAppointment={this.handleNewAppointment} new_data={this.state.new_data}/>}/>
            <Route path="/appointments/:id" render={(props) => <AppointmentScreen {...props} isAuthenticated={this.state.logged_in} handleNewReminder={this.handleNewReminder} handleDelete={this.handleDelete} handleEdit={this.handleEditAppointment}edited_data={this.state.edited_data}/>} />
            <Route path="/:any" component={Welcome}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
