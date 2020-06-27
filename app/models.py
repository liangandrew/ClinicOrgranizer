from peewee import *
from datetime import datetime

#create peewee databse instance
db=SqliteDatabase('clinics.db', pragmas={
    'journal_mode': 'wal',
    'cache_size': -1 * 32000,  # 64MB
    'foreign_keys': 1,
    'ignore_check_constraints': 0,
    'synchronous': 0
})

class BaseModel(Model):
    class Meta:
        database = db

class Patient(BaseModel):
    patient_id=AutoField()  #primary key id
    email=CharField(unique=True)
    name=CharField()
    dob=DateField()
    phone_number=CharField(unique=True)
    password=CharField()


class Org(BaseModel):
    org_id=AutoField()  #primary key id
    phone_number=CharField(unique=True)
    name=CharField()
    email=CharField(unique=True)
    password=CharField()


class Appointment(BaseModel):
    ap_id=AutoField()   #pk
    p=ForeignKeyField(Patient,backref='appointments',on_update='CASCADE',on_delete='CASCADE')
    o=ForeignKeyField(Org,backref='appointments',on_delete='CASCADE')
    date=DateField()
    created= DateField(default=datetime.today().strftime('%Y-%m-%d'))
    start_time=TimeField()
    reason_for_visit=TextField(null=True)
    is_cancelled=BooleanField(default=False)

#helper function to create the tables in interpreter. one time thing
def create_tables():
    with db:
        db.create_tables([Patient, Org, Appointment])

data={
    'pats':[
        {
            'email':'joe@gmail.com',
            'name':'joe mama',
            'dob':'1993-02-12',
            'phone_number':'1283048274',
            'password':'testing1'
        },
        {
            'email':'john@gmail.com',
            'name':'john mama',
            'dob':'1993-03-13',
            'phone_number':'3810472047',
            'password':'testing2'
        },
        {
            'email':'jane@hotmail.com',
            'name':'jane mama',
            'dob':'1983-05-16',
            'phone_number':'9183759382',
            'password':'testing3'
        }
    ],
    'orgs':[
        {
            'phone_number':'123456792',
            'name':'chinatown dentist',
            'email':'cdentistry@yahoo.com',
            'password':'testing4'
        },
        {
            'phone_number':'8103729101',
            'name':'downtown clinic',
            'email':'dtownlax@gmail.com',
            'password':'testing5'
        }
    ],
    'apts':[
        {
            'p':1,
            'o':1,
            "date":'2020-06-24',
            'created':'2020-06-20',
            'start_time':'01:00:00',
            'reason':'checkup',
            'cancelled':'False'
        }
    ]
}

def add_junk_data():
    with db.atomic():
        Patient.insert_many(data['pats']).execute()
        Org.insert_many(data['orgs']).execute()
        Appointment.create(p=data['apts'][0]['p'],
        o=data['apts'][0]['o'],
        date=data['apts'][0]['date'],
        created=data['apts'][0]['created'],
        start_time=data['apts'][0]['start_time'],
        reason_for_visit=data['apts'][0]['reason'],
        is_cancelled=data['apts'][0]['cancelled'])
