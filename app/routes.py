from flask import Blueprint, request, flash, jsonify
from app.models import *
from peewee import *
import bcrypt

bp = Blueprint('api', __name__)

def authenticate(user):
    #use sessions or jwt token
    print('authenticate')


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

        #authenticate patient
        authenticate(patient)

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
            authenticate(patient)
            return jsonify({'success':'login successful'})    #redirect to /homescreen
        else:
            flash('Invalid username and password')
            
    except Patient.DoesNotExist:
        flash('The email is not registered')
    return jsonify({'try again'})  #redirect to login again


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

        #authenticate patient
        authenticate(org)

        return 'success'    #redired to /login page

    except IntegrityError:
        flash('Email or phone number already taken')
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
            authenticate(org)
            return jsonify({'success':'login successful'})    #redirect to /homescreen
        else:
            flash('Invalid username and password')
            
    except Org.DoesNotExist:
        flash('The email is not registered')
    return jsonify({'try again'})  #redirect to login again


#allows org to make an appointment
@bp.route('/make_appointment')
def make_appointment():
    pass


#orgs can edit appointment
@bp.route('/edit_appointment')
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
