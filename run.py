# run.py

# import os

from app import create_app
from app.background import *
import atexit

# config_name = os.getenv('FLASK_CONFIG')
app = create_app(__name__)


if __name__ == '__main__':
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_reminders, 'interval', minutes=1)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    app.run()