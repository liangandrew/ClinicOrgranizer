from flask import Blueprint, request, flash, jsonify, session
from functools import wraps
from app.models import *
from peewee import *
import bcrypt

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
            data=request.get_json()
            apt={}

            # org_email=session['user_email']
            org_email=data['org_email']
            org_id=Org.get(Org.email==org_email).org_id
            apt['o_id']=org_id

            patient_email=data['patient_email']
            patient_id=Patient.get(Patient.email==patient_email).patient_id
            apt['p_id']=patient_id

            date=data['appointment_date']
            apt['date']=date
            start_time=data['start_time']
            apt['start_time']=start_time

            if data['reason'] != "":
                apt['reason_for_visit']=data['reason']
            if data['reminders'] != "":
                apt['reminders']=data['reminders']

            Appointment.create(**apt)            
        except DoesNotExist:
            return jsonify({'result':'error'})
        return jsonify({'result':'success'})


#orgs can edit appointment
@bp.route('/edit_appointment',methods=['POST'])
def edit_appointment():
    pass


@bp.route('/get_patient/<int:id>')
def get_patient(id):
    try:
        p=Patient.get_by_id(id)
    except DoesNotExist:
        #patient doesn't exist
        return 'patient does not exit'
    else:
        #does exist, make a response in dict struct
        pat={
            'email':p.email,
            'name':p.name,
            'dob':p.dob,
            'phone_number':p.phone_number
        }
        res={
            'status':200,
            'patient':pat
        }
        return res,res['status']
