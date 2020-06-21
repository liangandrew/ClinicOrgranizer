from flask import Blueprint
# from models import *
from app.models import *
from peewee import *

bp = Blueprint('api', __name__)
  
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