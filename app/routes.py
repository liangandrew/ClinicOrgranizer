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
    session.pop('logged_in', None)
    return jsonify({'result':'success'})


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
            flash('Email and/or phone number already registered')
            return jsonify({'error':'Email and/or phone number already registered'})  
        
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

        return jsonify({'success':'account registered successfully'})    #redired to /login page

    except IntegrityError:
        flash('Email and/or phone number already registered')
        return jsonify({'error':'Email and/or phone number already registered'})


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

            return jsonify({'result':'success'})   
            
    except Patient.DoesNotExist:
        return jsonify({'result':'error'})  #redirect to login again


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
            return jsonify({"error":'phone number and/or email already registered'})
    try:
        #store new patient into database
        with db.atomic():
            org=Org.create(
                name=name,
                email=email,
                phone_number=phone_number,
                password=password
            )

        return 'success'    #redired to /login page

    except IntegrityError:
        return jsonify({"error":'phone number and/or email already registered'})  #redirect to register again


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

            return jsonify({'result':'success'})    #redirect to /homescreen
            
    except Org.DoesNotExist:
        return jsonify({'result':'error'})  #redirect to login again


def get_current_user():
    if session.get('logged_in'):
        if session.get('is_org')==True:
            return Org.get(Org.email==session['user_email'])
        else:
            return Patient.get(Patient.email==session['user_email'])
    else:
        return jsonify({'result':'error'})


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
            if time_diff > two_days:
                default_reminder=apt_date_utc-two_days
                #add default reminder into a list of tuples, serialize it into json and insert into dict and table
                reminders=json.dumps([(default_reminder,False)],default=str)
                apt['reminders']=reminders
            elif time_diff == two_days:
                default_reminder=apt_date_utc-one_day
                reminders=json.dumps([(default_reminder,False)],default=str)
                apt['reminders']=reminders
            elif time_diff < two_days:
                default_reminder=apt_date_utc-two_hours
                reminders=json.dumps([(default_reminder,False)],default=str)
                apt['reminders']=reminders
            #else no default made reminder

            Appointment.create(**apt)            
        except DoesNotExist:
            return jsonify({'result':'error'})
        return jsonify({'result':'success'})

######## in case i forget: get string for strptime by json.loads the reminder field, and loop through the list  ####
#for rem in list2:
#   print(datetime.strptime(rem[0][:16],"%Y-%m-%d %H:%M"))

#editing appointments will also have to check and edit reminders


#Read resource
@bp.route('/get_all_appointments',methods=['GET'])
def get_all_appointments():
    #protected route, make sure user is logged in

    # if session.get('logged_in'):
        #is_org=session['is_org']
        #user_email=session['user_email']
        
        data=request.get_json()
        is_org=data['is_org']
        user_email=data['user_email']

        user=object()
        try:
            if is_org:
                #check user email in org table
                user=Org.get(Org.email==user_email)
            else:
                user=Patient.get(Patient.email==user_email)

            appointments=[]
            for apt in user.appointments:
                appointments.append(model_to_dict(apt))

            return jsonify(appointments)
        except DoesNotExist:
            return jsonify({'result':'error'})
    

#orgs can edit appointment
@bp.route('/edit_appointment',methods=['POST'])
def edit_appointment():
    pass


#orgs delete appointment
@bp.route('/delete_appointment', methods=['POST'])
def delete_appointment():
    pass


@bp.route('/show_patient_info')
def get_patient():
    pass
