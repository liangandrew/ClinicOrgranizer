import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {getAppointment} from './ApiFunctions';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

class AppointmentScreen extends Component{
    _isMounted=false;
    state={
        deleted:false,
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
                let new_rem=moment()
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
                console.log(this.state)
            }
            else{
                this.setState({deleted:true})
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
        // console.log(this.state);
    }

    handleDateChange=(date)=>{
        this.setState({
            start_time:date._d
        })
        // console.log(this.state.start_time)
    }

    handleReminderChange=(date)=>{
        this.setState({
            new_reminder:date._d
        })
        // console.log(this.state.start_time)
    }

    handleNewReminder=()=>{
        let rem=moment(this.state.new_reminder).format('YYYY-MM-DD HH:mm')
        const reminder={
            id:this.state.id,
            reminder:rem
        }
        // console.log(reminder)
        this.props.handleNewReminder(reminder)
    }

    handleDelete=()=>{
        // console.log('delete appointment')
        this.props.handleDelete(this.state.id)
    }

    handleEdit=()=>{
        const edits={
            id:this.state.id,
            start_time:moment(this.state.start_time).format('YYYY-MM-DD HH:mm'),
            reason_for_visit:this.state.reason
        }
        this.props.handleEdit(edits)
    }


    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        if(this.props.edited_data){
            return <Redirect to="/profile"/>;
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
                                            let reminder_time=moment(rem).format('YYYY-MM-DD hh:mm a')
                                            // console.log(start_time.toLocaleString())
                                            return(
                                                <li className="list-group-item" key={reminder_time}>
                                                    <div className="row">
                                                        <span className="">{reminder_time}</span>
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
                                        <input type="button" value="Create Reminder" onClick={this.handleNewReminder}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <input type="button" value="Save Changes" onClick={this.handleEdit}/>
                                </div>
                                <div className="col">
                                    <input type="button" value="Delete Appointment" onClick={this.handleDelete}/>
                                </div>
                            </div>
                            <br/>
                            <br/>
                        </form>

                    </div>
                </div>
                
            </div>
        )
    }

}

export default AppointmentScreen