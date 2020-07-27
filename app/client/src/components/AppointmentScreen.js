import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {getAppointment} from './ApiFunctions';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

class AppointmentScreen extends Component{
    _isMounted=false;
    state={
        id:'',
        org:'',
        org_email:'',
        patient:'',
        patient_email:'',
        start_time:'',
        reason:'',
        reminders:[],
        new_reminder:''
    }

    componentDidMount(){
        this._isMounted = true;
        const {id} = this.props.match.params;
        getAppointment(id).then(res=>{
            console.log(res)
            if(res.success && this._isMounted){
                let start=moment(res.appointment.start_time)
                console.log(start)
                let new_rem=moment()
                console.log(new_rem)
                this.setState({
                    id:id,
                    org:res.appointment.o.name,
                    org_email:res.appointment.o.email,
                    patient:res.appointment.p.name,
                    patient_email:res.appointment.p.email,
                    start_time:start,
                    reason:res.appointment.reason_for_visit,
                    reminders:JSON.parse(res.appointment.reminders),
                    new_reminder:new_rem
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
        // console.log(e.target.value);
        console.log(this.state);
    }

    handleDateChange=(date)=>{
        this.setState({
            start_time:date._d
        })
        console.log(this.state.start_time)
    }

    handleReminderChange=(date)=>{
        this.setState({
            new_reminder:date._d
        })
        console.log(this.state.start_time)
    }

    handleDelete=(id)=>{
        console.log('delete appointment')
    }


    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.handleSave}>
                            <h2>Appointment {this.state.id} Details</h2>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="org">Organization</label>
                                        <input 
                                            readOnly 
                                            value={this.state.org}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="org_email">Organization Email</label>
                                        <input 
                                            readOnly 
                                            value={this.state.org_email}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="patient">Patient</label>
                                            <input 
                                                readOnly 
                                                value={this.state.patient}
                                                className="form-control"
                                            />
                                    </div>
                                </div>
                                <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="patient_email">Patient Email</label>
                                            <input 
                                                readOnly 
                                                value={this.state.patient_email}
                                                className="form-control"
                                            />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="start_time">Start Time</label>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker
                                        name="start_time"
                                        variant="inline"
                                        ampm={true}
                                        value={this.state.start_time}
                                        onChange={this.handleDateChange}
                                        onError={console.log}
                                        disablePast={true}
                                        format="YYYY-MM-DD hh:mm a"
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="reason">Reason For Appointment</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="reason"
                                    placeholder="optional"
                                    value={this.state.reason}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <span className="card-title col ">Current Reminders Set</span>
                                    <ul className="list-group list-group-flush">
                                        {this.state.reminders.length && this.state.reminders.map(rem=>{
                                            let reminder_time=moment(rem).format('YYYY-MM-DD HH:mm a')
                                            // console.log(start_time.toLocaleString())
                                            return(
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <span className="card-title col ">{reminder_time}</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="start_time">Create New Reminder</label>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <DateTimePicker
                                                name="reminder_time"
                                                variant="inline"
                                                ampm={true}
                                                value={this.state.new_reminder}
                                                onChange={this.handleReminderChange}
                                                onError={console.log}
                                                disablePast={true}
                                                format="YYYY-MM-DD hh:mm a"
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                
            </div>
        )
    }

}

export default AppointmentScreen