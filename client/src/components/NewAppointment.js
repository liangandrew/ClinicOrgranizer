import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';

class NewAppointment extends Component{
    _isMounted=false;
    state={
        org_email:'',
        patient_email:'',
        start_time:moment(),
        reason:'',
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

    handleSubmit=(e)=>{
        console.log('submit new appointment info')
        e.preventDefault()
        let date=moment(this.state.start_time).format('YYYY-MM-DD HH:mm')
        const apt={
            patient_email:this.state.patient_email,
            appointment_time:date,
            reason:this.state.reason
        }
        this.props.createNewAppointment(apt)
    }

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        else if(!this.props.is_org){
            //orgs create the appointments, not patients
            return <Redirect to="/profile"/>;
        }
        // console.log(this.props.new_data)
        if(this.props.new_data){
            return <Redirect to="/profile"/>;
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <h2>New Appointment</h2>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="org_email">Organization Email</label>
                                <input 
                                    readOnly 
                                    value={this.props.user_email}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="patient_email">Patient Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="patient_email"
                                    placeholder="Enter patient's email"
                                    value={this.state.patient_email}
                                    onChange={this.handleChange}
                                />
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
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewAppointment