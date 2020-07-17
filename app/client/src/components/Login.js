import React, {Component} from 'react'
import {login} from './ApiFunctions'

class Login extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            is_org:false
        }
    }

    handleChange=(e)=>{
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({[e.target.name]:value})
        console.log(e.target.value)
        console.log(this.state)
    }

    handleSubmit=(e)=>{
        //send HTTP request to login api endpoint
        console.log('login clicked')
        e.preventDefault()

        if(this.state.email===''||this.state.password===''){
            console.log("missing fields")
            return
        }

        const user={
            email:this.state.email,
            password:this.state.password,
            is_org:this.state.is_org
        };
        console.log(user)
        login(user).then(res=>{
            console.log(res)
            if(!res.error){
                this.props.history.push('/profile')
            }
        })
        
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Login</h2>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email"
                                value={this.state.email} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter password"
                                value={this.state.password} onChange={this.handleChange} />
                            </div>

                            <div className="form-row">
                                <label htmlFor="is_org">This is an organization account</label>
                                <input type="checkbox" className="form-org-check" name="is_org"
                                checked={this.state.is_org} onChange={this.handleChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Login
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login