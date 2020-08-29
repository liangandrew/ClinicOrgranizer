import React, { Component } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { register } from "./ApiFunctions";
import { Redirect } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phone_number: "",
            password: "",
            dob: "",
            org: false,
            errors: {},
        };
    }

    handleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
        // console.log(e.target.value);
        // console.log(this.state);
    };

    handleSubmit = (e) => {
        //send HTTP request using the info from state
        e.preventDefault();

        //make sure fields are filled in correctly
        let is_org=this.state.org
        if(is_org){
            //don't need to check dob
            if(this.state.name===''||this.state.email===''||this.state.password===''||this.state.phone_number===''){
                console.log('missing fields')
                return
            }
        }
        else{
            //check dob
            if(this.state.name===''||this.state.email===''||this.state.password===''||this.state.phone_number===''||
            this.state.dob===''){
                console.log('missing fields')
                return
            }
        }

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            dob: this.state.dob,
            phone_number: this.state.phone_number,
            password: this.state.password,
            is_org: this.state.org,
        };
        register(newUser).then(res => {
            // console.log(res)
            if(res.success){
                this.props.history.push("/login");
            }
        }).catch(err=>{
            console.log(err)
        })
    };

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/profile"/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Register </h2>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    pattern="^[a-zA-Z]+( [a-zA-Z_]+)*$"
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone-number">Phone Number</label>
                                {/* <input type="text" className="form-control" name="phone_number" placeholder="Enter your phone number"
                                value={this.state.phone_number} onChange={this.handleChange} /> */}
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    name="phone_number"
                                    defaultCountry="US"
                                    value={this.state.phone_number}
                                    onChange={(phone_number) => this.setState({ phone_number })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth (if registering as patient user)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={this.state.dob}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="org">This is an organization account</label>
                                <input
                                    type="checkbox"
                                    className="form-org-check"
                                    name="org"
                                    checked={this.state.org}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
