import React, {Component} from 'react'
import {register} from './ApiFunctions'


class Register extends Component{
    constructor(){
        super()
        this.state= {
            name:'',
            email:'',
            phone_number:'',
            password:'',
            dob:'',
            org:false,
            errors:{}
        }

    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
        console.log(e.target.value)
    }

    handleSubmit = (e) =>{
        //send HTTP request using the info from state
        e.preventDefault()
        console.log("register clicked!")
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h2>Register </h2>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter your name"
                                value={this.state.name} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone-number">Phone Number</label>
                                <input type="text" className="form-control" name="phone_number" placeholder="Enter your phone number"
                                value={this.state.phone_number} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" className="form-control" name="dob" placeholder="Enter your date of birth"
                                value={this.state.dob} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" placeholder="Enter your email"
                                value={this.state.email} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter a password"
                                value={this.state.password} onChange={this.handleChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register!
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }

}


export default Register