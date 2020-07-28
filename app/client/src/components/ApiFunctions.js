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
            return res.data
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

export const deleteAppointment=(id)=>{
    return axios.delete('/api/appointments/delete/'+id,{withCredentials:true}).then(res=>{
        console.log(res)
        return res
    }).catch(err=>{
        console.log(err)
    })
}

export const createAppointment=(apt)=>{
    return axios.post('/api/make_appointment',
    {
        patient_email:apt.patient_email,
        appointment_time:apt.appointment_time,
        reason:apt.reason
    },{withCredentials:true})
}

export const createReminder=(rem)=>{
    return axios.post('/api/reminder/create',
    {
        appointment_id:rem.id,
        reminder:rem.reminder
    },{withCredentials:true}).then(res=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
}