from apscheduler.schedulers.background import BackgroundScheduler
from app.models import *
from datetime import datetime

def check_reminders():
    print('The time now is: %s'%datetime.now())