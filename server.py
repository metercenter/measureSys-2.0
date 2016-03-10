import os, sys
sys.path.append('./db_handle')
os.environ["DJANGO_SETTINGS_MODULE"] = "measureSys.settings"

from django.contrib.auth.models import User
from meter.models import Meter
from meter.models import Data
from meter.models import WarnInfo
import django
django.setup()

from socket import *
import datetime
import struct

HOST = '221.226.182.14'
PORT = 20000
BUFSIZE = 1024
ADDR = (HOST, PORT)
SerSock = socket(AF_INET, SOCK_DGRAM)
SerSock.bind(ADDR)
PEER_ADDR = ('218.3.27.162', 20000)

while True:
    #print 'waiting for message...\n\n'
    data, addr = SerSock.recvfrom(BUFSIZE)
    #print 'received message from:', addr
    if data:
        if len(data) < 12:
            continue
        head = data[0:12]
        version, meter_type, eui, data_type, length = struct.unpack("!BB8sBB", head) 
    
    SerSock.sendto(data, PEER_ADDR)
    #print len(data)
    if version != 1:
        continue

    meter_list = Meter.objects.all()
    eui_str=eui.encode('hex')
    print eui_str

    try:
        meter=Meter.objects.get(meter_eui=eui_str)      
    except (KeyError, Meter.DoesNotExist):
        print ("meter do not exist\n")
        continue
 
    if data_type == 6:
        payload = data[12:(12+length)]
        qb, vb1, vb2, warn, battery = struct.unpack("!IIHHH", payload)
        meter_data=Data.objects.filter(meter_eui=eui_str).order_by('-data_id')
        if len(meter_data) > 0:
            new_id = meter_data[0].data_id + 1
                      
        else:
            print ("firstdata of this meter\n")
            new_id = 1;
       
        warn_num = 0
        if warn&0x1000:
            warn_num = 1
        if warn&0x0080:
            warn_num = 2
        if warn&0x0008:
            warn_num = 3 
        if warn&0x0004:
            warn_num = 4
        if warn&0x0002:
            warn_num = 5 
        if warn&0x0001:
            warn_num = 6
        if warn_num != 0:
            new_warn = WarnInfo(meter_eui=eui_str,data_warn=warn_num, warn_level=1)
            new_warn.warn_date = datetime.datetime.now()
            try:
                new_warn.save()
            except:
                print ("db busy\n")   
 
        qb_s = str(qb/1000.0)
        vb_s = str(vb1)+'.'+str(vb2)
        battery_s = str(battery/1000.0)
        new_data = Data(data_id=new_id, meter_eui=eui_str, data_battery=battery_s, data_vb=vb_s, data_qb=qb_s)
        new_data.data_date = datetime.datetime.now()
        try:
            new_data.save()
        except:
            print ("db busy\n") 

    if data_type == 7:
        payload = data[12:(12+length)]
        battery, vm2, vb2, vm1, vb1, pres, temp, qm, qb = struct.unpack("!HHHIIffff", payload)
        meter_data=Data.objects.filter(meter_eui=eui_str).order_by('-data_id')
        if len(meter_data) > 0:
            new_id = meter_data[0].data_id + 1
                      
        else:
            print ("firstdata for this meter\n")
            new_id = 1;
 
        if battery<3:
            new_warn = WarnInfo(meter_eui=eui_str,data_warn=9,warn_level=1)
            new_warn.warn_date = datetime.datetime.now()
            try:
                new_warn.save()
            except:
                print ("db busy\n")
 
        battery_s = str(battery)
        vb_s = str(vb1)+'.'+str(vb2)
        vm_s = str(vm1)+'.'+str(vm2)      
        p_s = str("%.3f" % pres)
        t_s = str("%.3f" % temp)
        qb_s = str(qb)
        qm_s = str(qm)
        new_data = Data(data_id=new_id, meter_eui=eui_str, data_battery=battery_s, data_vb=vb_s, data_vm=vm_s, data_p=p_s, data_t=t_s, data_qb=qb_s, data_qm=qm_s)
        new_data.data_date = datetime.datetime.now()
        try:
            new_data.save()
        except:
            print ("db busy\n")

    if data_type == 8:
        print ("type 8\n")
        payload = data[12:(12+length)]
        battery, warn, vm2, vb2, vm1, vb1, pres, temp, qm, qb = struct.unpack("!HHHHIIffff", payload)
        meter_data=Data.objects.filter(meter_eui=eui_str).order_by('-data_id')
        if len(meter_data) > 0:
            new_id = meter_data[0].data_id + 1
                      
        else:
            print ("firstdata for this meter\n")
            new_id = 1;
 
        if battery<3:
            new_warn = WarnInfo(meter_eui=eui_str,data_warn=9,warn_level=1)
            new_warn.warn_date = datetime.datetime.now()
            try:
                new_warn.save()
            except:
                print ("db busy\n")
 
        battery_s = str(battery)
        vb_s = str(vb1)+'.'+str(vb2)
        vm_s = str(vm1)+'.'+str(vm2)      
        p_s = str("%.3f" % pres)
        t_s = str("%.3f" % temp)
        qb_s = str(qb)
        qm_s = str(qm)
        new_data = Data(data_id=new_id, meter_eui=eui_str, data_battery=battery_s, data_vb=vb_s, data_vm=vm_s, data_p=p_s, data_t=t_s, data_qb=qb_s, data_qm=qm_s)
        new_data.data_date = datetime.datetime.now()
        try:
            new_data.save()
        except:
            print ("db busy\n")

    if data_type == 17:
        payload = data[12:(12+24)]
#         if length == 40:
#             warn = data[36:(36+16)]
#             for i in range(1,15,2):
#                 if warn[i]:
#                     warn_num = i/2+20
#                     new_warn = WarnInfo(meter_eui=eui_str,data_warn=warn_num,warn_level=1)
#                     new_warn.warn_date = datetime.datetime.now()
#                     try:
#                         new_warn.save()
#                     except:
#                         print ("db busy\n")
#                     print ("warn info add\n");
             
        pres, temp, qm, qb, vm, vb = struct.unpack("!ffffff", payload)
        meter_data=Data.objects.filter(meter_eui=eui_str).order_by('-data_id')
        if len(meter_data) > 0:
            new_id = meter_data[0].data_id + 1
                      
        else:
            print ("firstdata for this meter\n")
            new_id = 1;
 
        p_s = str("%.3f" % pres)
        t_s = str("%.3f" % temp)
        qb_s = str("%.3f" % qb)
        qm_s = str("%.3f" % qm)
        vb_s = str("%.3f" % vb)
        vm_s = str("%.3f" % vm)
        battery_s="-"
        new_data = Data(data_id=new_id, meter_eui=eui_str, data_battery=battery_s, data_vb=vb_s, data_vm=vm_s, data_p=p_s, data_t=t_s, data_qb=qb_s, data_qm=qm_s)
        new_data.data_date = datetime.datetime.now()
        try:
            new_data.save()
        except:
            print ("db busy\n")


SerSock.close()
