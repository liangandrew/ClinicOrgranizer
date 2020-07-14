from apscheduler.schedulers.background import BackgroundScheduler
from app.models import *
from datetime import datetime
import pytz
import json

from app.Google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import sys

from twilio.rest import Client
import os

from dotenv import load_dotenv
load_dotenv()

twilio_sid=os.getenv("TWILIO_SID")
twilio_auth=os.getenv("TWILIO_AUTH")
client=Client(twilio_sid,twilio_auth)

CLIENT_SECRET_FILE='client_secret.json'
API_NAME='gmail'
API_VERSION='v1'
SCOPES=['https://mail.google.com/']

service=Create_Service(CLIENT_SECRET_FILE,API_NAME,API_VERSION,SCOPES)


def create_message(to, subject, message_text):
  
  message = MIMEMultipart()
  message.attach(MIMEText(message_text, 'plain'))
  message['to'] = to
  message['subject'] = subject
  return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}


def send_message(service, message):
  try:
    message = (service.users().messages().send(userId='me', body=message).execute())
    print('Message Id: %s' % message['id'])
    return message
  except:
      e = sys.exc_info()[0]
      print(e)


def create_text(client,to,message):
  text_message=client.messages.create(
    body=message,
    from_=+12025190347,
    to=to
  )


def check_reminders():
    now_utc=datetime.now().astimezone(pytz.UTC)
    aps=Appointment.select().where(Appointment.start_time > now_utc)
    for ap in aps:
        #check reminders list
        reminders=json.loads(ap.reminders)
        updated_reminders=[]
        for rem in reminders:
            #see which reminders <= now utc
            #send reminder email and/or SMS
            #remove reminder

            rem_time=datetime.strptime(rem,'%Y-%m-%d %H:%M:%S%z')
            if rem_time > now_utc:
                #don't send reminder, append to updated_reminders
                updated_reminders.append(rem)
            else:
                #send reminder
                subject='Reminder for Appointment with '+ap.o.name
                date=datetime.strptime(ap.start_time,"%Y-%m-%d %H:%M:%S%z")
                format='%m/%d/%Y %I:%M %p'
                date_string=date.replace(tzinfo=pytz.UTC).astimezone(tz=None).strftime(format)
                msg='You have a scheduled appointment with ' +ap.o.name + ' on \n\n'+date_string +'. \n\nTo contact ' + ap.o.name +', call '+ap.o.phone_number + ' or email '+ap.o.email+'.'
                email=create_message(ap.p.email,subject,msg)
                send_message(service,email)

                #send text?

        ap.reminders=json.dumps(updated_reminders,default=str)
        ap.save()
    print('The time now is: %s'%now_utc)


