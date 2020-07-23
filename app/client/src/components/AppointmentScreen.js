import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class AppointmentScreen extends Component{
    state={
        id:'',
        org:'',
        patient:'',
        patient_email:'',
        date_created:'',
        start_time:'',
        reason:''
    }

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                Appointment details
            </div>
        )
    }

}

export default AppointmentScreen