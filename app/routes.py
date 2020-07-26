from flask import Blueprint, request, flash, jsonify, session
from functools import wraps
from app.models import *
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model
from datetime import datetime, timedelta
import bcrypt
import pytz
import json


bp = Blueprint('api', __name__)

#add logged in user to sessions and store their email and whether they are an org or not
#to know which table to check
def authenticate(user,is_org):
    session['logged_in'] = True
    session['user_email'] = user.email
    session['is_org'] = is_org


#logout function
#removes user from session
@bp.route('/logout')
def logout():
    key=session.pop('logged_in', None)
    if key is None:
        return jsonify({"success":False})
    return jsonify({'success':True})


#register patient
@bp.route('/patient/register',methods=['POST'])
def register_patient():
    data=request.get_json()
    name=data['name']
    email=data['email']
    dob=data['dob']
    phone_number=data['phone_number']
    password = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt())

    with db.atomic():
        #check if the email is used as an org
        used_email=Org.get_or_none(Org.email==email)
        used_phone=Org.get_or_none(Org.phone_number==phone_number)
        if used_email or used_phone:
            #the email and/or phone number registered as an org, can't reregister as patient
            return jsonify({"success":False,"message":"Phone or email already registered"}) 
        
    try:
        #store new patient into database
        with db.atomic():
            patient=Patient.create(
                name=name,
                email=email,
                dob=dob,
                phone_number=phone_number,
                password=password
            )

        return jsonify({"success":True,"message":"Registered successfully"})

    except IntegrityError:
        return jsonify({"success":False,"message":"Phone or email already registered"})


#patient login
@bp.route('/patient/login', methods=['POST'])
def patient_login():
    #fetch login info from request
    email = request.get_json()['email']
    password = request.get_json()['password']

    #check if the password is correct
    try:
        patient=Patient.get(
            email=email
        )
        if bcrypt.checkpw(password.encode('utf8'),patient.password.encode('utf-8')):
            #password matches
            # authenticate
            authenticate(patient,False)

            return jsonify({"success":True,"message":"Logged in successfully"}) 

        return jsonify({"success":False,"message":"Email and password do not match"})
            
    except Patient.DoesNotExist:
        return jsonify({"success":False,"message":"Email is not registered"})


#register orgs
@bp.route('/org/register',methods=['POST'])
def register_org():
    data=request.get_json()
    name=data['name']
    email=data['email']
    phone_number=data['phone_number']
    password = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt())
    
    with db.atomic():
        #see if email and phone number are already in patient table
        used_email=Patient.get_or_none(Patient.email==email)
        used_phone=Patient.get_or_none(Patient.phone_number==phone_number)

        if used_phone or used_email:
            #phone and/or email already registered as patient
            return jsonify({"success":False,"message":"Phone or email already registered"})
    try:
        #store new patient into database
        with db.atomic():
            org=Org.create(
                name=name,
                email=email,
                phone_number=phone_number,
                password=password
            )

        return jsonify({"success":True,"message":"Registered successfully"})

    except IntegrityError:
        return jsonify({"success":False,"message":"Phone or email already registered"})


#login for orgs
@bp.route('/org/login', methods=['POST'])
def org_login():
    #fetch login info from request
    email = request.get_json()['email']
    password = request.get_json()['password']

    #check if the password is correct
    try:
        org=Org.get(
            email=email
        )
        if bcrypt.checkpw(password.encode('utf8'),org.password.encode('utf-8')):
            #password matches
            # authenticate
            authenticate(org,True)

            return jsonify({"success":True,"message":"Logged in successfully"}) 
        return jsonify({"success":False,"message":"Email and password do not match"})
    except Org.DoesNotExist:
        return jsonify({"success":False,"message":"Email is not registered"})


def get_current_user():
    if session.get('logged_in'):
        if session.get('is_org')==True:
            return Org.get(Org.email==session['user_email'])
        else:
            return Patient.get(Patient.email==session['user_email'])
    else:
        return jsonify({'result':'error'})

@bp.route('/login/status')
def is_logged_in():
    if session.get('logged_in'):
        return jsonify({'logged_in':True})
    return jsonify({'logged_in':False})


#allows org to make an appointment
@bp.route('/make_appointment',methods=['POST'])
def make_appointment():
    #make sure user is logged in and is an org to be able to make an appointment

    # if not (session.get('logged_in') and session.get('is_org')):
    #     return jsonify({'result':'error'})
    # else:
        try:
            # org=get_current_user()
            data=request.get_json()
            apt={}

            # org_email=session['user_email']
            org_email=data['org_email']
            org_id=Org.get(Org.email==org_email).org_id
            apt['o_id']=org_id
            # org_id=org.org_id
            # apt['o_id']=org_id

            patient_email=data['patient_email']
            patient_id=Patient.get(Patient.email==patient_email).patient_id
            apt['p_id']=patient_id

            date=data['appointment_time']
            #date is in string format YYYY-mm-dd HH:MM:SS   format --> %Y-%m-%d %H:%M
            #convert the string into a datetime object
            apt_date=datetime.strptime(date,'%Y-%m-%d %H:%M')
            #convert to UTC
            apt_date_utc=apt_date.astimezone(pytz.UTC)
            apt['start_time']=apt_date_utc

            if data['reason'] != "":
                apt['reason_for_visit']=data['reason']

            #have default reminder for two days prior if the appointment is in more than two days
            #else if it's in less than two days make a default one for two hours prior
            curr_utc=datetime.now().astimezone(pytz.UTC)
            time_diff=apt_date_utc-curr_utc

            two_days=timedelta(days=2)
            one_day=timedelta(days=1)
            two_hours=timedelta(hours=2)
            default_reminder=""
            reminders=json.dumps([],default=str)
            apt['reminders']=reminders
            if time_diff > two_days:
                default_reminder=apt_date_utc-two_days
                #add default reminder into a list, serialize it into json and insert
                reminders=json.dumps([default_reminder],default=str)
                apt['reminders']=reminders
            elif time_diff <two_hours:
                pass
            elif time_diff < two_days:
                default_reminder=apt_date_utc-two_hours
                reminders=json.dumps([default_reminder],default=str)
                apt['reminders']=reminders

            Appointment.create(**apt)            
        except DoesNotExist:
            return jsonify({'result':'error'})
        return jsonify({'result':'success'})


#Read resource
@bp.route('/appointments/get_all')
def get_all_appointments():
    #protected route, make sure user is logged in

    if session.get('logged_in'):
        is_org=session['is_org']
        user_email=session['user_email']

        # data=request.get_json()
        # is_org=data['is_org']
        # user_email=data['user_email']

        user=object()
        appointments=[]
        ex=[Appointment.o.password,Appointment.p.password]

        try:
            if is_org:
                #check user email in org table
                user=Org.get(Org.email==user_email)
                # for apt in user.appointments:
                for apt in Appointment.select().where(Appointment.o_id==user.org_id).order_by(Appointment.start_time):
                    appointments.append(model_to_dict(apt,exclude=ex))
                return jsonify({'success':True,'appointments':appointments})
            else:
                user=Patient.get(Patient.email==user_email)
                for apt in Appointment.select().where(Appointment.p_id==user.patient_id).order_by(Appointment.start_time):
                    appointments.append(model_to_dict(apt,exclude=ex))
                return jsonify({'success':True,'appointments':appointments})
            
        except:
            return jsonify({'success':False})
    # return jsonify({'result':'error'})
    

#get single appointment --> to edit
@bp.route('/appointments/get/<int:id>')
def get_single_appointment(id):
    #make sure user is logged in and has the appointment it requests for    i.e. a patient can't see apt of others
    # if session.get('logged_in'):
        #is_org=session['is_org']
        #user_email=session['user_email']
    
        data=request.get_json()
        is_org=data['is_org']
        user_email=data['user_email']
        user=object()
        appointment=object()
        try:
            if is_org:
                #check user email in org table
                user=Org.get(Org.email==user_email)
                appointment=Appointment.get(Appointment.o_id==user.org_id,Appointment.ap_id==id)
            else:
                user=Patient.get(Patient.email==user_email)
                appointment=Appointment.get(Appointment.p_id==user.patient_id,Appointment.ap_id==id)

            #list fields not to include in response     ex. passwords
            ex=[Appointment.o.password,Appointment.p.password]
            return jsonify({'success':True,'appointment':model_to_dict(appointment,exclude=ex)})
        except DoesNotExist:
            return jsonify({'success':False})
    #return jsonify({'result':'error'})


#orgs delete appointment
@bp.route('/appointments/delete/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    if not session['logged_in']:
        return jsonify({'result':'error'})
    else:
        try:
            org=Org.get(Org.email==session['user_email'])
            appointment=Appointment.get_by_id(id)
            if appointment.o_id is not org.org_id:
                return jsonify({'success':False,'message':'error, apopintment not found'})
            appointment.delete_instance()

            return jsonify({'success':True})
        except DoesNotExist:
            return jsonify({'success':False})


#orgs can edit appointment
@bp.route('/appointments/edit/<int:id>',methods=['PUT'])
def edit_appointment(id):
    # if not session['logged_in']:
    #     return jsonify({'result':'error'})
    # else:
        try:
            # org=Org.get(Org.email==session['user_email'])
            org=Org.get(Org.email==request.get_json()['org_email'])
            appointment=Appointment.get_by_id(id)
            if appointment.o_id is not org.org_id:
                return jsonify({'result':'error, apopintment not found'})
            
            data=request.get_json()
            #edit fields of the matching appointment to data from request
            #should only be able to edit certain fields,    i.e. can't change patient, or org, or created
            appointment.start_time=datetime.strptime(data['start_time'],"%Y-%m-%d %H:%M").astimezone(pytz.UTC)
            appointment.reason_for_visit=data['reason_for_visit']

            #check reminders- if they are after the new appointment, delete them
            new_apt_time=datetime.strptime(data['start_time'],"%Y-%m-%d %H:%M").astimezone(pytz.UTC)

            reminders=json.loads(appointment.reminders)
            updated_reminders=[]
            for rem in reminders:
                d=datetime.strptime(rem,'%Y-%m-%d %H:%M:%S%z')

                if d<new_apt_time:
                    updated_reminders.append(rem)
            
            appointment.reminders=json.dumps(updated_reminders,default=str)
            appointment.save()
            return jsonify({'result':'success'})
        except DoesNotExist:
            return jsonify({'result':'error'})


@bp.route('/reminder/create',methods=['POST'])
#patients create reminders with a button on the screen with the appointment info 
def create_reminder():
    # pat=get_current_user()
    # if type(pat) is not Patient:
    #     return jsonify({'result':'error'})
    
    data=request.get_json()
    reminder=data['reminder']
    apid=data['appointment_id']
    try:
        # apt=Appointment.get(Appointment.ap_id==apid,Appointment.p==pat.patient_id)
        apt=Appointment.get(Appointment.ap_id==apid)    #for testing

        #reminder from frontend will be string in format
        date=datetime.strptime(reminder,"%Y-%m-%d %H:%M").astimezone(pytz.UTC)
        #compare reminder date with curent date and appointment date. Should be in between
        
        reminders=json.loads(apt.reminders)
        reminders.append(date)
        reminders=json.dumps(reminders,default=str)

        #update appointment reminders
        apt.reminders=reminders
        apt.save()
        return jsonify({'result':'success'})
    except DoesNotExist:
        return jsonify({'result':'error'})
