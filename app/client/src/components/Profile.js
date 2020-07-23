import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import {getAppointments} from "./ApiFunctions";

class Profile extends Component{
    _isMounted=false;
    state={
        appointments:[]
    }

    componentDidMount(){
        this._isMounted = true;
        let apt=getAppointments().then(data=>{
            if(this._isMounted){
                this.setState({appointments:data.appointments})
                console.log(data.appointments)
            }
            
        })
        
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                <h1>Profile</h1>
                <br/>
                {this.state.appointments && this.state.appointments.map(apt=>(
                    <Link to={'/appointments/'+apt.ap_id} key={apt.ap_id}>
                        {apt.ap_id}
                    </Link>
                ))}
            </div>
        )
    }
}

export default Profile