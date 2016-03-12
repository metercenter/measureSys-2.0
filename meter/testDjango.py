import datetime
import os
from django.conf.global_settings import DATABASES
from django.test import TestCase
import sys
from measureSys.settings import BASE_DIR

from meter.models import Data

os.environ['DJANGO_SETTING_MODULE'] = 'measureSys.settings'
DATABASES['default'] = {'ENGINE': 'django.db.backends.sqlite3',
                        'NAME': os.path.join(BASE_DIR, 'db.sqlite3')
                        }


class TestClass(TestCase):
    def today(self):
        print datetime.datetime.now().date(), "shitsdf"

    def db(self):
        valuelist = Data.objects.raw(
            "select * from meter_data where meter_eui = %s and data_date > %s order by data_date limit 1",
            ["35ffd60532573238", '2015-06-16'])
        for a in valuelist:
            print 'sh->', a
        print Data.objects.raw("select * from data limit 3")
        print valuelist

    def runTest(self):
        a = TestClass()
        a.db()
