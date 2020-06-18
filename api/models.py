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
    #peewee automatically makes id field, primary key
    email=CharField(unique=True)
    name=CharField()
    dob=DateTimeField()
    phone_number=IntegerField(unique=True)

class Org(BaseModel):
    #auto incrementing id field pk
    phone_number=IntegerField(unique=True)
    name=CharField()
    email=CharField(unique=True)

class Appointment(BaseModel):
    #id field pk
    pid=ForeignKeyField(Patient,backref='appointments',on_update='CASCADE',on_delete='CASCADE')
    oid=ForeignKeyField(Org,backref='appointments',on_delete='CASCADE')
    date_created= DateField()
    start_time=TimeField()
    end_time=TimeField()
    reason_for_visit=TextField()
    is_cancelled=BooleanField()

#helper function to create the tables in interpreter. one time thing
def create_tables():
    with db:
        db.create_tables([Patient, Org, Appointment])
