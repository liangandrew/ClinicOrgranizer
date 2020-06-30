import axios from 'axios'

export const register =(user)=>{
    if(user["is_org"]===true){
        //send request to org/register endpoint
        return axios.post('api/org/register',
        {
            name:user["name"],
            phone_number:user["phone_number"],
            email:user["email"],
            password:user["password"]
        }).then(res=>{
            console.log("registered successfully")
        }).catch(err=>{
            console.log(err)
        })
    }
    else{
        //otherwise, send to patient/register endpoint
        return axios.post('api/patient/register',
        {
            name:user["name"],
            phone_number:user["phone_number"],
            dob:user["dob"],
            email:user["email"],
            password:user["password"]
        }).then(res=>{
            console.log("registered successfully")
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const login=()=>{

}

export const get_login_status=()=>{
    
}