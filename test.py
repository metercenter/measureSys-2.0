import os, sys
sys.path.append('./db_handle')
os.environ["DJANGO_SETTINGS_MODULE"] = "measureSys.settings"

from django.contrib.auth.models import User
from meter.models import Meter
from meter.models import Data
import django
django.setup()

from socket import *
import datetime
import struct

HOST1 = '221.226.182.14'
PORT1 = 20000
ADDR1 = (HOST1, PORT1) 

HOST  = '221.226.182.14'
PORT = 50000
BUFSIZE = 1024
ADDR = (HOST, PORT)
SerSock = socket(AF_INET, SOCK_DGRAM)
SerSock.bind(ADDR)

print 'waiting for message...'
#    data='\x01\x01\x32\x30\x31\x30\x31\x32\x31\x32\x07\x1e\x00\x10\x00\x01\x00\x01\x00\x00\x00\x01\x00\x00\x00\x01\xA6\x66\x42\xCA\x00\x00\x41\xA0\x10\x00\x00\x01\x10\x00\x00\x01'
data='\x01\x01\x35\xff\xda\x05\x32\x57\x32\x38\x06\x0e\x00\x00\x00\x34\x00\x01\x00\x00\x00\x01\x00\x04\x0e\x13'
SerSock.sendto(data,ADDR1)
SerSock.close()
