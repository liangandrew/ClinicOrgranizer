from flask import Blueprint, request, flash
from app.models import *
from peewee import *
import bcrypt

bp = Blueprint('api', __name__)

def authenticate(user):
    print('authenticate')

@bp.route('/register_patient',methods=['POST'])
def register():
    data=request.get_json()
    name=data['name']
    email=data['email']
    dob=data['dob']
    phone_number=data['phone_number']
    password = bcrypt.hashpw(data['password'].encode('utf8'), bcrypt.gensalt())
    
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

        return 'success'    #redired to /login page

    except IntegrityError:
        flash('Email or phone number already taken')
        return 'try again'  #redirect to register again

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