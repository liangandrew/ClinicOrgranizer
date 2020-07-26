import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
// import {getAppointments} from "./ApiFunctions";

class Profile extends Component{
    // _isMounted=false;
    // state={
    //     appointments:[]
    // }

    // componentDidMount(){
    //     this._isMounted = true;
    //     getAppointments().then(data=>{
    //         if(this._isMounted){
    //             this.setState({appointments:data.appointments})
    //             console.log(data.appointments)
    //         }
            
    //     })
        
    // }

    // componentWillUnmount() {
    //     this._isMounted = false;
    //   }


    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                <h1>Profile</h1>
                <br/>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <span className="card-title col s3">ID #</span>
                            <span className="card-title col s3">Date Created</span>
                            <span className="card-title col s3">Organization</span>
                            <span className="card-title col s3">Start Time</span>
                        </div>
                    </div>
                    <div className="card-body">
                        {this.props.appointments && this.props.appointments.map(apt=>{
                            let created_date=new Date(apt.created)
                            // console.log(created_date.toString())
                            let start_time=new Date(apt.start_time)
                            // console.log(start_time.toLocaleString())
                            return(
                            <Link key={apt.ap_id} to={'/appointments/' + apt.ap_id} style={{ textDecoration: 'none' }}>
                                <div className="row">
                                    <span className="card-title col s3">{apt.ap_id}</span>
                                    <span className="card-title col s3">{created_date.toLocaleString()}</span>
                                    <span className="card-title col s3">{apt.o.name}</span>
                                    <span className="card-title col s3">{start_time.toLocaleString()}</span>
                                </div>
                            </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile