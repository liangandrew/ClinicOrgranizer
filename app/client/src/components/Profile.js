import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

class Profile extends Component{
    // constructor(props){
    //     super(props)
    //     this.state={

    //     }
    // }

    render(){
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        return(
            <div className="container">
                <h1>Profile</h1>
            </div>
        )
    }
}

export default Profile