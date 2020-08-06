import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
// import {getAppointments} from "./ApiFunctions";

class Profile extends Component{
    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        if(this.props.is_org){
            return(
                <div className="container">
                    <h1>Profile</h1>
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <span className="card-title col ">ID #</span>
                                <span className="card-title col ">Date Created</span>
                                <span className="card-title col ">Organization</span>
                                <span className="card-title col">Patient</span>
                                <span className="card-title col ">Start Time</span>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            {this.props.appointments && this.props.appointments.map(apt=>{
                                let created_date=new Date(apt.created)
                                // console.log(created_date.toString())
                                let start_time=new Date(apt.start_time)
                                // console.log(start_time.toLocaleString())
                                return(
                                <Link key={apt.ap_id} to={'/appointments/' + apt.ap_id} style={{ textDecoration: 'none' }}>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <span className="card-title col ">{apt.ap_id}</span>
                                            <span className="card-title col ">{created_date.toLocaleString()}</span>
                                            <span className="card-title col ">{apt.o.name}</span>
                                            <span className="card-title col">{apt.p.name}</span>
                                            <span className="card-title col ">{start_time.toLocaleString()}</span>
                                        </div>
                                    </li>
                                </Link>
                                )
                            })}
                        </ul>
                    </div>
                    <br/>
                    <Link to={'/make_appointment'} style={{ textDecoration: 'none' }}>
                        New Appointment
                    </Link>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <h1>Profile</h1>
                    <br/>
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <span className="card-title col ">ID #</span>
                                <span className="card-title col ">Date Created</span>
                                <span className="card-title col ">Organization</span>
                                <span className="card-title col">Patient</span>
                                <span className="card-title col ">Start Time</span>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            {this.props.appointments && this.props.appointments.map(apt=>{
                                let created_date=new Date(apt.created)
                                // console.log(created_date.toString())
                                let start_time=new Date(apt.start_time)
                                // console.log(start_time.toLocaleString())
                                return(
                                <Link key={apt.ap_id} to={'/appointments/' + apt.ap_id} style={{ textDecoration: 'none' }}>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <span className="card-title col ">{apt.ap_id}</span>
                                            <span className="card-title col ">{created_date.toLocaleString()}</span>
                                            <span className="card-title col ">{apt.o.name}</span>
                                            <span className="card-title col">{apt.p.name}</span>
                                            <span className="card-title col ">{start_time.toLocaleString()}</span>
                                        </div>
                                    </li>
                                </Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
        
    }
}

export default Profile