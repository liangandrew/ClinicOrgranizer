import axios from 'axios'

export const register =(user)=>{
    if(user["is_org"]===true){
        //send request to org/register endpoint
        return axios.post('/api/org/register',
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
        return axios.post('/api/patient/register',
        {
            name:user["name"],
            phone_number:user["phone_number"],
            dob:user["dob"],
            email:user["email"],
            password:user["password"]
        }).then(res=>{
            return res.data
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const login=(user)=>{
    if(user["is_org"]){
        return axios.post('/api/org/login',
        {
            email:user["email"],
            password:user["password"]
        }).then(res=>{
            return res.data
        }).catch(err=>{
            console.log(err)
        })
    }
    else{
        return axios.post('/api/patient/login',
        {
            email:user["email"],
            password:user["password"]
        }).then(res=>{
            return res.data
        }).catch(err=>{
            console.log(err)
        })
    }
}


export const getAppointments=()=>{
    return axios.get('/api/appointments/get_all',{withCredentials:true}).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}

export const getAppointment=(id)=>{
    return axios.get('/api/appointments/get/'+id,{withCredentials:true}).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
}