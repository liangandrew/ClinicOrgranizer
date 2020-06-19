from peewee import *

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
    dob=DateTimeField()
    phone_number=IntegerField(unique=True)

class Org(BaseModel):
    org_id=AutoField()  #primary key id
    phone_number=IntegerField(unique=True)
    name=CharField()
    email=CharField(unique=True)

#might have to add password hash fields to patient and org for authentication

class Appointment(BaseModel):
    ap_id=AutoField()   #pk
    p=ForeignKeyField(Patient,backref='appointments',on_update='CASCADE',on_delete='CASCADE')
    o=ForeignKeyField(Org,backref='appointments',on_delete='CASCADE')
    date_created= DateField()
    start_time=TimeField()
    end_time=TimeField()
    reason_for_visit=TextField()
    is_cancelled=BooleanField()

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
            'phone':'1283048274'
        },
        {
            'email':'john@gmail.com',
            'name':'john mama',
            'dob':'1993-03-13',
            'phone':'3810472047'
        },
        {
            'email':'jane@hotmail.com',
            'name':'jane mama',
            'dob':'1983-05-16',
            'phone':'9183759382'
        }
    ],
    'orgs':[
        {
            'phone':'123456792',
            'name':'chinatown dentist',
            'email':'cdentistry@yahoo.com'
        },
        {
            'phone':'8103729101',
            'name':'downtown clinic',
            'email':'dtownlax@gmail.com'
        }
    ],
    'apts':[
        'p':''
    ]
}
def add_junk_data():
    pass
