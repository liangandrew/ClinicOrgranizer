import React, {Component} from 'react'
import { Link } from "react-router-dom";


class Welcome extends Component{
    render(){
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1> Welcome to ClinicO </h1>
                        <br/>
                        <p className="lead">ClinicO is a platform that provides an easy way for
                        businesses such as dentistries to store people's 
                        phone numbers and upcoming appointments and automate sending notifications and reminders
                        </p>
                        <hr className="my-4"></hr>
                        <br/>
                        <h3>Get Started</h3>
                        <br/>
                        <div className="row">
                            <div className="col-md-6">
                                <p class="lead">
                                    <Link to="/login">Login</Link>
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="lead">
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome