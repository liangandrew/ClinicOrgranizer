import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {getAppointment} from './ApiFunctions';

class AppointmentScreen extends Component{
    _isMounted=false;
    state={
        id:'',
        org:'',
        org_email:'',
        patient:'',
        patient_email:'',
        date_created:'',
        start_time:'',
        reason:'',
        reminders:[]
    }

    componentDidMount(){
        this._isMounted = true;
        const {id} = this.props.match.params;
        getAppointment(id).then(res=>{
            console.log(res)
            if(res.success && this._isMounted){
                let created_date=new Date(res.appointment.created)
                let start=new Date(res.appointment.start_time)
                // console.log(start_time.toLocaleString())
                this.setState({
                    id:id,
                    org:res.appointment.o.name,
                    org_email:res.appointment.o.email,
                    patient:res.appointment.p.name,
                    patient_email:res.appointment.p.email,
                    date_created:created_date.toLocaleString(),
                    start_time:start.toLocaleString(),
                    reason:res.appointment.reason,
                    reminders:res.appointment.reminders
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
        console.log(e.target.value);
        // console.log(this.state);
    };

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                <h2>Appointment details</h2>
                <br/>
                <div className="row">
                    <div className="col">Organization: {this.state.org}</div>
                    <div className="col">Patient: {this.state.patient}</div>
                </div>
                <div className="row">
                    <div className="col">Organization Email: {this.state.org_email}</div>
                    <div className="col">Patient Email: {this.state.patient_email}</div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="form-group">
                    <label>Start Time</label>
                    <input 
                        type="datetime-local" 
                        id="start_time" 
                        name="start_time" 
                        value={this.state.start_time} 
                        // pattern="/^(((0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](0[1-9]|1\d|2[0-8])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](29)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/g"
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Reason</label>
                    <input 
                        type="text"
                        id="reason"
                        name="reason"
                        value={this.state.reason}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Add Reminder</label>
                    <input type="datetime-local"
                        id="reminders"
                        name="reminders"
                        placeholder="YYYY-MM-DD HH:mm am/pm"
                        pattern="/^(((0[13578]|1[02])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[13456789]|1[012])[\/\.-](0[1-9]|[12]\d|30)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](0[1-9]|1\d|2[0-8])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((02)[\/\.-](29)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/g"
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

}

export default AppointmentScreen