#coding=utf8
import json
import datetime
import csv
import os
import time

from django.db import connection
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
import xlsxwriter

from meter.models import Meter, MeterType, DataWarnType
from meter.models import User
from meter.models import Data, WarnInfo
from meter.models import Company, UserFeedback, IdentificationMeter, outputDiff, District, valveManagement, meterManagement, filterManagement

# from django.core.servers.basehttp import FileWrapper
from wsgiref.util import FileWrapper

from meter.service.LeeUtil import LeeUtil
from meter.service.RockService import DataService, PageModal

dataService =DataService()
def unicode_csv_reader(unicode_csv_data, dialect=csv.excel, **kwargs):
    # csv.py doesn't do Unicode; encode temporarily as UTF-8:
    csv_reader = csv.reader(utf_8_encoder(unicode_csv_data),
                            dialect=dialect, **kwargs)
    csv.writer
    for row in csv_reader:
        # decode UTF-8 back to Unicode, cell by cell:
        yield [str(cell, 'utf-8') for cell in row]

def utf_8_encoder(unicode_csv_data):
    for line in unicode_csv_data:
        yield line.encode('utf-8')

# Create your views here.
@login_required(login_url='/login/')
def mainPage(request):
    #     return render_to_response('index.html')
    try:
        if  not 'user_id' in request.session:
            return render_to_response('angulerMain.html', context_instance=RequestContext(request))
    except:
        print('session has been closed')
    return render_to_response('login.html', context_instance=RequestContext(request))

def loginPage(request):
    #     return render_to_response('login.html')
    if 'user_id' in request.session:
        del request.session['user_id']
    # return render_to_response('login.html', context_instance=RequestContext(request))
    return render_to_response('login.html')

def meterTypeName(meter_type):
    meterType = MeterType.objects.get(meter_type = meter_type)
    return meterType.meter_type_name

def getDistrict(request):
    responseData = []
    try:
        if 'province_id' in request.GET:
            districtID = request.GET['province_id']
            districts = District.objects.filter(district_id__startswith = districtID).extra(where = ['LENGTH(district_id) = 4'])
        elif 'city_id' in request.GET:
            districtID = request.GET['city_id']
            districts = District.objects.filter(district_id__startswith = districtID).extra(where = ['LENGTH(district_id) = 6'])
        else:
            districts = District.objects.all().extra(where = ['LENGTH(district_id) = 2'])
        for each in districts:
            each_dict = {
                "district_id": each.district_id,
                "district_name": each.district_name,
            }
            responseData.append(each_dict)
    except:
        print('no district')
    return HttpResponse(json.dumps(responseData), content_type="application/json")

def getDistrictName(districtID):
    id_len = len(districtID)
    district = ''
    try:
        if id_len >= 2:
            districts = District.objects.filter(district_id = districtID[0:2])
            district += districts[0].district_name
        if id_len >= 4:
            districts = District.objects.filter(district_id = districtID[0:4])
            district += districts[0].district_name
        if id_len >= 6:
            districts = District.objects.filter(district_id = districtID[0:6])
            district += districts[0].district_name
    except:
        print('no district')
    return district


def getMeter(request):
    responseData = []
    try:
        if 'district_id' in request.GET:
            districtID = request.GET['district_id']
            userID = request.session['user_id']
            meters = Meter.objects.filter(user_id__startswith = userID).filter(meter_district = districtID)
        else:
            if 'user_id' in request.GET:
                userID = request.GET['user_id']
            else:
                userID = request.session['user_id']
            meters = Meter.objects.filter(user_id__startswith = userID)

        for each in meters:
            identData = IdentificationMeter.objects.filter(meter_eui = each.meter_eui).order_by('-id')
            outputMin =  ''
            outputMax =  ''
            pressureMin =  ''
            pressureMax = ''
            temperatureMin = ''
            temperatureMax = ''
            valid_time = ''
            if len(identData) > 0:
                outputMin =  identData[0].outputMin
                outputMax =  identData[0].outputMax
                pressureMin =  identData[0].pressureMin
                pressureMax = identData[0].pressureMax
                temperatureMin = identData[0].temperatureMin
                temperatureMax = identData[0].temperatureMax
                if identData[0].next_identify_date:
                    valid_time = identData[0].next_identify_date.strftime("%Y/%m/%d %H:%M:%S")
            each_dict = {
                "user_id": each.user_id,
                "meter_name": each.meter_name,
                "meter_typenum": each.meter_type,
                "meter_type": meterTypeName(each.meter_type),
                "meter_index": each.meter_index,
                "meter_version": each.meter_version,
                "wrapCode": each.wrap_code,
                "meter_eui": each.meter_eui,
                "meter_revisetype": meterTypeName(each.meter_revisetype),
                "communication": each.communication,
                "meter_district": getDistrictName(each.meter_district),
                "outputMin": outputMin,
                "outputMax": outputMax,
                "pressureMin": pressureMin,
                "pressureMax": pressureMax,
                "temperatureMin": temperatureMin,
                "temperatureMax": temperatureMax,
                "valid_time" : valid_time,
                "meter_latitude": each.meter_latitude,
                "meter_longitude": each.meter_longitude
            }
            responseData.append(each_dict)
    except:
        print('getMeter:user is not existed')
    return HttpResponse(json.dumps(responseData), content_type="application/json")

def getReason(warn_type):
    return DataWarnType.objects.get(data_warn = warn_type).data_warn_reason;

def warnList(request):
    responsedata = []
    try:
        #         user = User.objects.get(user_id = request.session['user_id'])
        userlist =  User.objects.filter(user_id__startswith = request.session['user_id'])
        for each in userlist:
            meterlist = Meter.objects.filter(user_id__startswith = each.user_id)
            for meter in meterlist:
                datalist = Data.objects.filter(meter_eui = meter.meter_eui, data_warn__gt =  0)
                for data in datalist:
                    data_dict = {
                        "id": data.pk,
                        "data_date": data.data_date.strftime("%Y/%m/%d %H:%M:%S"),
                        "data_vb":     data.data_vb,
                        "data_vm": data.data_vm,
                        "data_p": data.data_p,
                        "data_warn": getReason(data.data_warn),
                    }
                    responsedata.append(data_dict)
    except:
        print ("user is not existed")
    response = {}
    response['status'] = 'SUCESS'
    response['data'] = responsedata
    return HttpResponse(json.dumps(response),content_type ="application/json")

def userList(request):
    try:
        user = User.objects.get(user_id = request.session['user_id'])
        userlist =  User.objects.filter(user_id__startswith = user.user_id)
        responsedata = []
        for user in userlist:
            user_dict = {
                "id": user.pk,
                "user_company": user.user_company,
                "user_name":     user.user_name,
                "user_password": user.user_password,
                "user_phone": user.user_phone,
            }
            responsedata.append(user_dict)
    except:
        print ("user is not existed")
    response = {}
    response['status'] = 'SUCESS'
    response['data'] = responsedata
    return HttpResponse(json.dumps(response),content_type ="application/json")

def getData(request):
    responsedata = []
    try:
        if 'user_id' in request.GET:
            user_id = request.GET['user_id']
            period = request.GET['period']
            today=datetime.datetime.now()
            preday = today - datetime.timedelta(days=(int)(period))

            page = int(request.GET['pageNum'])
            pageSize = int(request.GET['pageSize'])
            re= DataService.getData(user_id,preday.date(),page,pageSize)
        if 'meter_eui' in request.GET:

            meter_eui = request.GET['meter_eui']
            # period = request.GET['period']
            # today=datetime.datetime.now()
            # preday = today - datetime.timedelta(days=(int)(period))
            allData = Data.objects.filter(meter_eui = meter_eui).order_by('-data_date')
            if  len(allData) > 0:
                each = allData[0]
                each_dict = {
                    "id": each.pk,
                    "data_id": each.data_id,
                    "meter_eui":  each.meter_eui,
                    "data_date": each.data_date.strftime("%Y/%m/%d %H:%M:%S"),
                    "data_vb": each.data_vb,
                    "data_vm": each.data_vm,
                    "data_p":     each.data_p,
                    "data_t": each.data_t,
                    "data_qb": each.data_qb,
                    "data_qm": each.data_qm,
                    "data_battery": each.data_battery,
                }
                responsedata.append(each_dict)
            return HttpResponse(json.dumps(responsedata), content_type="application/json")

        return HttpResponse(json.dumps(re.__dict__), content_type="application/json")

    except Exception as e:
        print('getData:user is not existed')
    response = {}
    response['status'] = 'SUCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def submit(request):
    if request.method == "POST":
        try:
            dbuser = User.objects.get(user_name = request.POST['login-username'], user_password = request.POST['login-password'])
            print(dbuser.user_addr)
            return render_to_response('index.html', context_instance=RequestContext(request))
        except User.DoesNotExist:
            print('user does not exist')
    return render_to_response('login.html', context_instance=RequestContext(request))


# def result(request):
#     
#     print("sb")
#     p = request.POST['answer']
#     return render_to_response('result.html', {'answer': p}, context_instance=RequestContext(request))

# def login_view1(request):    
#     user = authenticate(username=request.POST['login-username'], password=request.POST['login-password'])
#     print (user)
#     if user is not None:
#         login(request, user)    
#         print request.user    
#         try:
# #             dbuser = User.objects.get(user_name = request.POST['login-username'], user_password = request.POST['login-password'])
# #             if fordbuser is not None:
#             return render_to_response('index.html', context_instance=RequestContext(request))
#         except User.DoesNotExist:
#             print('user does not exist')
#     return render_to_response('login.html', context_instance=RequestContext(request))

def login_view(request):
    try:
        if 'user_id' in request.session:
            return render_to_response('angularMain.html', context_instance=RequestContext(request))
        username = request.POST['login-username']
        password = request.POST['login-password']
        user = User.objects.get(user_name = username, user_password = password)
        if user.user_id is not None:
            request.session['user_id'] = user.user_id
            request.session['user_name']= user.user_name
            return render_to_response('angularMain.html', context_instance=RequestContext(request))
    except:
        print ('user does not exist')
    loginPage(request)
    return render_to_response('login.html', context_instance=RequestContext(request))

def logout_view1(request):
    logout(request)
    return render_to_response('login.html', context_instance=RequestContext(request))

def logout_view(request):
    del request.session['user_id']
    if 'user_name' in request.session:
        del request.session['user_name']
    loginPage(request)
    return render_to_response('login.html', context_instance=RequestContext(request))

def user_group_show(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    userID = User.objects.get(user_id = request.session['user_id']).user_id
    #     userID = '0001'
    user_group_json = '['+generateTreeJSON(userID)+']';
    return HttpResponse(user_group_json,content_type ="application/json")

def generateTreeJSON(user_id):
    #     childSet = User.objects.filter(user_id__range = (user_id,user_id[0:-1]+str(int(user_id[-1])+1))).extra(where = ['LENGTH(user_id) > ' + str(len(user_id))]).extra(select = { 'minValue' : "MIN(user_id)" })
    childSet = User.objects.filter(user_id__startswith = user_id).extra(where = ['LENGTH(user_id) > ' + str(len(user_id))]).order_by('user_id')
    myself = User.objects.filter(user_id = user_id)

    if len(childSet) == 0:
        if len(user_id) == 2:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-home", "visible" : true, "page": "homepage", "user_id": "'+myself[0].user_id+'", "nodes": []}'
        if len(user_id) == 4:
            if user_id == "0099":
                return '{"name" : "'+myself[0].user_company+'", "value": "fa-group", "visible" : false, "page": "identificationpage", "user_id": "'+myself[0].user_id+'", "nodes": []}'
            else:
                return '{"name" : "'+myself[0].user_company+'", "value": "fa-group", "visible" : false, "page": "companypage", "user_id": "'+myself[0].user_id+'", "nodes": []}'
        if len(user_id) == 8:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-user", "visible" : false, "page": "userpage", "user_id": "'+myself[0].user_id+'", "nodes": []}'
        if len(user_id) > 8:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-tachometer", "visible" : false,  "user_id": "'+myself[0].user_id+'", "page": "meterpage","nodes": []}'
    else:
        children = User.objects.filter(user_id__startswith = user_id).extra(where = ['LENGTH(user_id) = ' + str(len(childSet[0].user_id))]).order_by('user_id')
        strJson = ''
        for each in children:
            strJson = strJson + generateTreeJSON(each.user_id) + ', '
        strJson = strJson[0:-2]
        if len(user_id) == 8:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-user", "page": "userpage", "visible": false,"user_id": "'+myself[0].user_id+'", "nodes" : ['+strJson+']}'
        if len(user_id) == 4:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-group", "page": "companypage", "visible": false, "user_id": "'+myself[0].user_id+'", "nodes" : ['+strJson+']}'
        if len(user_id) == 2:
            return '{"name" : "'+myself[0].user_company+'", "value": "fa-home", "page": "homepage", "visible": true,  "user_id": "'+myself[0].user_id+'", "nodes" : ['+strJson+']}'

# def user_group_show(request):
#     if  not 'user_id' in request.session:
#         loginPage(request)
#         return render_to_response('login.html', context_instance=RequestContext(request))
#     print request.session['user_id']
#     userID = User.objects.get(user_id = request.session['user_id']).user_id
# #     userID = '0001'
#     user_group_json = '{ "children": '+generateTreeJSON(userID)+'}';
#     return HttpResponse(user_group_json,content_type ="application/json")
# 
# def generateTreeJSON(user_id):
# #     childSet = User.objects.filter(user_id__range = (user_id,user_id[0:-1]+str(int(user_id[-1])+1))).extra(where = ['LENGTH(user_id) > ' + str(len(user_id))]).extra(select = { 'minValue' : "MIN(user_id)" })
#     childSet = User.objects.filter(user_id__startswith = user_id).extra(where = ['LENGTH(user_id) > ' + str(len(user_id))]).order_by('user_id')
#     myself = User.objects.filter(user_id = user_id)
#     if len(childSet) == 0:
#         #is leaf node
#         return '{"text" : "'+myself[0].user_company+'", "leaf" : true}'
#     else:
#         #is parent node
#         children = User.objects.filter(user_id__startswith = user_id).extra(where = ['LENGTH(user_id) = ' + str(len(childSet[0].user_id))])
#         strJson = ''
#         for each in children:
#             strJson = strJson + generateTreeJSON(each.user_id) + ', '
#         strJson = strJson[0:-2] 
#         return '{"text" : "'+myself[0].user_company+'", "expanded": true, "children" : ['+strJson+']}'

def user_level(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    for each in User.objects.filter(user_id__startswith = request.session['user_id']).extra(where = ['LENGTH(user_id) < 5']):
        each_dict = {
            "user_id": each.user_id,
            "user_company":     each.user_company,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getIndUser(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if not 'user_id' in request.GET:
        userID = request.session['user_id']
    else:
        userID = request.GET['user_id']
    for each in User.objects.filter(user_id__startswith = userID).extra(where = ['LENGTH(user_id) = 8']):
        each_dict = {
            "user_id": each.user_id,
            "user_company":     each.user_company,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getIndComp (request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    for each in User.objects.filter(user_id__startswith = request.session['user_id']).extra(where = ['LENGTH(user_id) = 4']).extra(where = ['user_id <> "0099"']).order_by('user_id'):
        each_dict = {
            "user_id": each.user_id,
            "gas_company":     each.user_company,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getIndMeter(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if 'user_id' in request.GET:
        user_id = request.GET['user_id']
    else:
        user_id = request.session['user_id']
    for each in Meter.objects.filter(user_id__startswith = user_id):
        each_dict = {
            "user_id": each.user_id,
            "meter_eui": each.meter_eui,
            "meter_name": each.meter_name,
            "meter_type": meterTypeName(each.meter_type),
            "meter_version": each.meter_version,
            "meter_index": each.meter_index
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")


def selectPanel(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if 'user_name' in request.GET:
        user = User.objects.filter(user_company = request.GET['user_name'])
    else:
        user = User.objects.filter(user_id = request.session['user_id'])
    for each in user:
        each_dict = {
            "user_id": each.user_id,
            "user_company":     each.user_company,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")


def meter_level(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    for each in User.objects.filter(user_id__startswith = request.session['user_id']).extra(where = ['LENGTH(user_id)  = 8']):
        each_dict = {
            "user_id": each.user_id,
            "user_company":     each.user_company,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def generateID(userName):
    user = User.objects.filter(user_company__exact = userName)
    brother = User.objects.filter(user_id__startswith = user[0].user_id).extra(where = ['LENGTH(user_id) <= ' + str(len(user[0].user_id)+4)]).extra(where = ['LENGTH(user_id) > ' + str(len(user[0].user_id))]).order_by('user_id')
    if len(brother) == 0:
        if user[0].user_id == '00':
            return '0001'
        else:
            return user[0].user_id+'0001'

    ID = brother[0].user_id
    for i in range(1,len(brother)):
        if int(brother[i].user_id) - int(ID) >1:
            break
        else:
            ID = brother[i].user_id
    if len(ID) == 4:
        return str(int(ID)+1).zfill(4)
    #         return zeroStr(4-len(str(int(ID)+1)))+str(int(ID)+1).zfill(4)
    elif len(ID) == 8:
        return str(int(ID)+1).zfill(8)

def zeroStr(num):
    zerostr = ''
    for i in range(0,num):
        zerostr = zerostr+'0'
    return zerostr

def register_company(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    #     data = request.body
    #     jsondata = json.dumps(request.body)
    data = json.loads(request.body)
    #     print data''
    userName = data.get("user")
    userPassword = data.get('pass')
    userCompany = data.get('company')
    userPhone = data.get('phone')
    userParent = data.get('user_company')

    response = {}
    used = User.objects.filter(user_name = userName)
    if len(used):
        response['status'] = 'FAIL'
        response['reason'] = 'USER_NAME'
        return HttpResponse(json.dumps(response),content_type ="application/json")

    used = User.objects.filter(user_company = userCompany)
    if len(used):
        response['status'] = 'FAIL'
        response['reason'] = 'COMPANY'
        return HttpResponse(json.dumps(response),content_type ="application/json")

    user = User();
    user.user_name = userName
    user.user_password = userPassword
    user.user_company = userCompany
    user.user_phone = userPhone;
    user.user_id = generateID(userParent)
    user.save();

    response['status'] = 'SUCESS'
    response['reason'] = 'SUCESS'
    return HttpResponse(json.dumps(response),content_type ="application/json")

def generateMeterID(userName):
    user = User.objects.filter(user_company__exact = userName)
    children = Meter.objects.filter(user_id__startswith = user[0].user_id).extra(where = ['LENGTH(user_id) = ' + str(len(user[0].user_id)+8)]).order_by('user_id')
    if len(children) == 0:
        return user[0].user_id+'00000001'
    ID = children[0].user_id
    for i in range(1,len(children)):
        if int(children[i].user_id) - int(ID) >1:
            return str(int(ID)+1).zfill(16)
        else:
            ID = children[i].user_id

    return str(int(ID)+1).zfill(16)

def register_meter(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    data = json.loads(request.body)
    meterName = data.get('meter_name')
    meterEUI = data.get('meter_eui')
    meterUser = data.get('user_company')
    meterType = data.get('meter_type')
    meterRevise = data.get('meter_revisetype')
    meterIndex = data.get('meter_index')
    meterVersion = data.get('meter_version')
    wrapCode = data.get('wrap_code')
    district = data.get('districts_id')

    outMin = data.get('out_min')
    outMax = data.get('out_max')
    pressMin = data.get('press_min')
    pressMax = data.get('press_max')
    tempMin = data.get('temp_min')
    tempMax = data.get('temp_max')


    meteSet = Meter.objects.filter(meter_eui = meterEUI)
    if meteSet.count() != 0:
        response['status'] = 'FAIL'
        response['reason'] =  'EUI'
        return HttpResponse(json.dumps(response),content_type ="application/json")
    meter = Meter()
    meter.meter_name = meterName
    meter.meter_eui = meterEUI
    meter.meter_type = meterType
    meter.user_id = generateMeterID(meterUser)
    meter.meter_index = meterIndex
    meter.meter_revisetype = meterRevise
    meter.meter_version = meterVersion
    meter.wrap_code = wrapCode
    meter.meter_district = district
    meter.save();

    indMeter = IdentificationMeter()
    indMeter.meter_eui = meterEUI
    indMeter.outputMax = outMax
    indMeter.outputMin = outMin
    indMeter.pressureMax = pressMax
    indMeter.pressureMin = pressMin
    indMeter.temperatureMax = tempMax
    indMeter.temperatureMin = tempMin
    indMeter.save();
    #add user
    user = User();
    user.user_id = meter.user_id
    user.user_company = meter.meter_name
    user.save();
    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def getExcelFile(request):
    #     response = HttpResponse(content_type='text/xlsx')
    #     response['Content-Disposition'] = 'attachment; filename="Data.xlsx"'

    #database operation3
    #     writer = csv.writer(response)
    #     writer.writerow(['Accept Time', 'Vb(Nm3)', 'Vm(m3)','P','T','Qb(Nm3/h)','Qm(m3/h)'])
    workbook = xlsxwriter.Workbook('Data.xlsx')
    worksheet = workbook.add_worksheet()


    worksheet.write(0, 0, u'流量计名字')
    worksheet.write(0, 1, u'接收时间')
    worksheet.write(0, 2, u'Vb(Nm3)')
    worksheet.write(0, 3, u'Vm(m3)')
    worksheet.write(0, 4, u'P')
    worksheet.write(0, 5, u'T')
    worksheet.write(0, 6, u'Qb(Nm3/h)')
    worksheet.write(0, 7, u'Qm(m3/h)')
    row = 1
    try:
        if 'user_id' in request.GET:
            #             userID = getUserId(request.GET['user_company'])
            Children = Meter.objects.filter(user_id__startswith = request.GET['user_id'])
            for i in range (0, len(Children)):
                meterID = Meter.objects.filter(user_id = Children[i].user_id)
                for j in range(0,len(meterID)):
                    meterName = meterID[j].meter_name
                    worksheet.write(row, 0, meterName)
                    for each in Data.objects.filter(meter_eui = meterID[j].meter_eui):
                        #                         writer.writerow([each.data_date.strftime("%Y/%m/%d %H:%M:%S"), each.data_vb, each.data_vm, each.data_p, each.data_t,each.data_qb,each.data_qm])
                        worksheet.write(row, 1, each.data_date.strftime("%Y/%m/%d %H:%M:%S"))
                        worksheet.write(row, 2, each.data_vb)
                        worksheet.write(row, 3, each.data_vm)
                        worksheet.write(row, 4, each.data_p)
                        worksheet.write(row, 5, each.data_t)
                        worksheet.write(row, 6, each.data_qb)
                        worksheet.write(row, 7, each.data_qm)
                        row = row + 1
    except:
        print('getExcelFile:user is not existed')

    workbook.close()
    dataFile = open('Data.xlsx', "wt")
    wrapper = FileWrapper(dataFile)
    response = HttpResponse(wrapper, content_type='application/x-xls')
    response['Content-Length'] = os.path.getsize('Data.xlsx')
    return response

def getMeterType(request):
    responsedata = []
    for each in MeterType.objects.all():
        each_dict = {
            "meter_type": each.meter_type,
            "meter_type_name":     each.meter_type_name,
        }
        responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getCompanyInfo(request):
    responsedata = []
    response = {}
    response['status'] = 'SUCCESS'
    try:
        #         if 'user_id' in request.session:
        #             return render_to_response('index.html', context_instance=RequestContext(request))
        company = Company.objects.all()
        each_dict = {
            "title": company[0].company_title,
            "content":company[0].company_content,
            "addr":company[0].company_addr,
            "contract":company[0].company_contract,
            "tel":company[0].company_tel,
        }
        responsedata.append(each_dict)
        response['status'] = 'SUCCESS'
        response['data'] = responsedata
        return HttpResponse(json.dumps(responsedata),content_type ="application/json")
    except:
        print ('user does not exist')
        response['status'] = 'FAILURE'
        response['data'] = ''
        return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getUserFeedback(request):
    responsedata = []

    for each in UserFeedback.objects.all():
        each_dict = {
            "id": each.pk,
            "user_company": getUserCompanyName(each.user_id),
            "report_time":  each.report_time.strftime("%Y/%m/%d %H:%M:%S"),
            "solution_deadline": each.solution_deadline,
            "problem": each.problem,
            "solution_result": each.solution_result,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getIndentificationMeter(request):
    responsedata = []

    for each in IdentificationMeter.objects.order_by('-id'):
        indetifyDate = " "
        next_indetifyDate = " "
        if each.identify_date:
            indetifyDate = each.identify_date.strftime("%Y/%m/%d")
        else:
            continue
        if each.next_identify_date:
            next_indetifyDate = each.next_identify_date.strftime("%Y/%m/%d")
        meter = Meter.objects.filter( meter_eui = each.meter_eui)
        each_dict = {
            "id": each.pk,
            "user_company": meter[0].meter_name,
            "meter_eui": each.meter_eui,
            "identify_date":     indetifyDate,
            "next_identify_date":     next_indetifyDate,
            "meter_type": meterTypeName(meter[0].meter_type),
            "meter_index": meter[0].meter_index,
            "meter_version": meter[0].meter_version,
            "output_range_min": each.outputMin,
            "output_range_max": each.outputMax,
            "medium": each.medium,
            "pressure_min": each.pressureMin,
            "pressure_max": each.pressureMax,
            "temperature_min": each.temperatureMin,
            "temperature_max": each.temperatureMax,
            "Qmax100": each.Qmax100,
            "Qmax60": each.Qmax60,
            "Qmax40": each.Qmax40,
            "Qmax20": each.Qmax20,
            "Qmax10": each.Qmax10
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def addIndentificationMeter(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    data = json.loads(request.body)
    meter_eui = data.get('meter_eui')
    identify_date = data.get('identify_date')
    next_identify_date = data.get('next_identify_date')
    medium = data.get('medium')
    pressureMax = data.get('pressureMax')
    pressureMin = data.get('pressureMin')
    temperatureMax = data.get('temperatureMax')
    temperatureMin = data.get('temperatureMin')
    outputMax = data.get('outputMax')
    outputMin = data.get('outputMin')
    Qmax100 = data.get('Qmax100')
    Qmax60 = data.get('Qmax60')
    Qmax40 = data.get('Qmax40')
    Qmax20 = data.get('Qmax20')
    Qmax10 = data.get('Qmax10')
    isFactory = data.get('isFactory')

    indMeter = IdentificationMeter()
    indMeter.meter_eui = meter_eui
    indMeter.identify_date = datetime.datetime.strptime(identify_date,'%Y-%m-%d')
    indMeter.next_identify_date = datetime.datetime.strptime(next_identify_date,'%Y-%m-%d')
    indMeter.medium = medium
    indMeter.outputMax = outputMax
    indMeter.outputMin = outputMin
    indMeter.pressureMax = pressureMax
    indMeter.pressureMin = pressureMin
    indMeter.temperatureMax = temperatureMax
    indMeter.temperatureMin = temperatureMin
    indMeter.Qmax100 = Qmax100
    indMeter.Qmax60 = Qmax60
    indMeter.Qmax40 = Qmax40
    indMeter.Qmax20 = Qmax20
    indMeter.Qmax10 = Qmax10
    indMeter.isFactory = isFactory
    indMeter.save();

    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def getUserId(company):
    user = User.objects.get(user_company = company)
    return user.user_id
def getUserCompanyName(userId):
    user = User.objects.get(user_id = userId)
    return user.user_company


def addOutputDiff(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    input = request.POST['input']
    industry_output = request.POST['industry_output']
    resident_output = request.POST['resident_output']
    other_output = request.POST['other_output']
    output_diff = request.POST['output_diff']
    output_date = request.POST['output_date']
    user_company = request.POST['user_company']
    outputInfo = outputDiff();
    outputInfo.input = input
    outputInfo.industry_output = industry_output
    outputInfo.resident_output = resident_output
    outputInfo.other_output = other_output
    outputInfo.output_diff = output_diff
    outputInfo.output_date = datetime.datetime.strptime(output_date,'%Y-%m-%d')
    outputInfo.user_id = getUserId(user_company)
    outputInfo.save();


    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")
def modifyOutputDiff(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    input = request.POST['input']
    industry_output = request.POST['industry_output']
    resident_output = request.POST['resident_output']
    other_output = request.POST['other_output']
    output_diff = request.POST['output_diff']
    output_date = request.POST['output_date']
    user_company = request.POST['user_company']
    outputInfo = outputDiff.objects.get(user_id = getUserId(user_company), output_date = datetime.datetime.strptime(output_date,'%Y-%m-%d'));
    outputInfo.input = input
    outputInfo.industry_output = industry_output
    outputInfo.resident_output = resident_output
    outputInfo.other_output = other_output
    outputInfo.output_diff = output_diff
    outputInfo.output_date = datetime.datetime.strptime(output_date,'%Y-%m-%d')
    outputInfo.user_id = getUserId(user_company)
    outputInfo.save();


    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")



def outputDiffChart(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
        for each in outputDiff.objects.filter(user_id = userID):
            each_dict = {
                "output_diff": int(each.output_diff),
                "output_date": time.mktime(each.output_date.timetuple())*1000,
            }
            responsedata.append(each_dict)
        return HttpResponse(json.dumps(responsedata),content_type ="application/json")


    for each in outputDiff.objects.all():
        each_dict = {
            "output_diff": int(each.output_diff),
            "output_date": time.mktime(each.output_date.timetuple())*1000,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def retrieveNodeNum(request):
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
        meterSet = Meter.objects.filter(user_id__startswith = userID)

        timeVal=datetime.datetime.now() - datetime.timedelta(days=1)
        validNum = 0
        for eachMeter in meterSet:
            valuelist = Data.objects.filter(meter_eui = eachMeter.meter_eui).filter(data_date__gt = timeVal)
            if len(valuelist) > 0:
                validNum = validNum+1

        each_dict = {
            "all_node_num": meterSet.count(),
            "valid_node_num": validNum,
        }
        responsedata = []
        responsedata.append(each_dict)
        return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def getMeterName(meterEUI):
    meter = Meter.objects.get(meter_eui = meterEUI)
    return meter.meter_name
def getUserName(meterEUI):
    meter = Meter.objects.get(meter_eui = meterEUI)
    userID =  meter.user_id[0:8]
    user = User.objects.get(user_id = userID)
    return user.user_company
def getGasCompany(meterEUI):
    meter = Meter.objects.get(meter_eui = meterEUI)
    userID =  meter.user_id[0:4]
    user = User.objects.get(user_id = userID)
    return user.user_company

def getWarnInfoOld(request):
    if 'user_id' in request.GET:
        responsedata = []
        userID = request.GET['user_id']
        meterSet = Meter.objects.filter(user_id__startswith = userID)
        for i in range (0, len(meterSet)):
            warnInfoSet = WarnInfo.objects.filter(meter_eui = meterSet[i].meter_eui)
            for j in range(0,len(warnInfoSet)):
                warnData = DataWarnType.objects.get(data_warn = warnInfoSet[j].data_warn)
                if 'warn_level' in request.GET:
                    if warnData.data_warn_level == request.GET['warn_level']:
                        each_dict = {
                            "data_warn": warnInfoSet[j].data_warn,
                            "warn_date": warnInfoSet[j].warn_date.strftime("%Y/%m/%d %H:%M:%S"),
                            "meter_info": getMeterName(warnInfoSet[j].meter_eui),
                            "other": warnInfoSet[j].warn_other,
                            "solution": warnData.data_warn_solution,
                            "warn_level": warnData.data_warn_level,
                            "warn_info" : warnData.data_warn_reason,
                            "company": getGasCompany(warnInfoSet[j].meter_eui),
                            "user_id": getUserName(warnInfoSet[j].meter_eui),
                        }
                        responsedata.append(each_dict)
                    else:
                        continue
                else:
                    each_dict = {
                        "data_warn": warnInfoSet[j].data_warn,
                        "warn_date": warnInfoSet[j].warn_date.strftime("%Y/%m/%d %H:%M:%S"),
                        "meter_info": getMeterName(warnInfoSet[j].meter_eui),
                        "other": warnInfoSet[j].warn_other,
                        "solution": warnData.data_warn_solution,
                        "warn_level": warnData.data_warn_level,
                        "warn_info" : warnData.data_warn_reason,
                        "company": getGasCompany(warnInfoSet[j].meter_eui),
                        "user_id": getUserName(warnInfoSet[j].meter_eui),
                    }
                    responsedata.append(each_dict)
        return HttpResponse(json.dumps(responsedata),content_type ="application/json")


def getWarnInfo(request):
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
        if 'pageNum' not in request.GET or 'pageSize' not in request.GET:
            return toJsonResponse([])
        page = int(request.GET['pageNum'])
        pageSize = int(request.GET['pageSize'])
        warnLevel= request.GET['warn_level'] if 'warn_level' in request.GET else None
        re = DataService.getWarnInfo(userID, page, pageSize,warnLevel)
        return toJsonResponse(re.__dict__)

def changeCompanyIntro(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    company_title = request.POST['company_title']
    company_content = request.POST['company_content']
    company_contract = request.POST['company_contract']
    company_tel = request.POST['company_tel']
    company_addr = request.POST['company_addr']

    company = Company.objects.get(id = 2);
    company.company_title = company_title
    company.company_content = company_content
    company.company_contract = company_contract
    company.company_tel = company_tel
    company.company_addr = company_addr
    company.save();


    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def AddUserFeedback(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    report_time = request.POST['report_time']
    solution_deadline = request.POST['solution_deadline']
    problem = request.POST['problem']
    solution_result = request.POST['solution_result']
    user_company = request.POST['user_company']

    feedback = UserFeedback()
    feedback.user_id = getUserId(user_company)
    feedback.report_time = datetime.datetime.strptime(report_time,'%Y-%m-%d')
    feedback.solution_deadline = solution_deadline
    feedback.problem = problem
    feedback.solution_result = solution_result
    feedback.save();


    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def getDeviationVal(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if 'meter_eui' in request.GET:
        meterEUI = request.GET['meter_eui']
        dataQm = request.GET['data_qm']
        meterIdent = IdentificationMeter.objects.filter(meter_eui = meterEUI).order_by('-next_identify_date')
        if len(meterIdent) == 0:
            return
        each_dict = {
            "deviation_val": round(float(meterIdent[0].Qmax10),2),
            "qmax_level": 0.1,
        }
        responsedata.append(each_dict)
        each_dict = {
            "deviation_val": round(float(meterIdent[0].Qmax20),2),
            "qmax_level": 0.2,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '40%Qmax'+str(round(float(meterIdent[0].outputMax)*0.4,1)),
            "deviation_val": round(float(meterIdent[0].Qmax40),2),
            "qmax_level": 0.4,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '60%Qmax'+str(round(float(meterIdent[0].outputMax)*0.6,1)),
            "deviation_val": round(float(meterIdent[0].Qmax60),2),
            "qmax_level": 0.6,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '100%Qmax'+str(round(float(meterIdent[0].outputMax),1)),
            "deviation_val": round(float(meterIdent[0].Qmax100),2),
            "qmax_level": 1,
        }
        responsedata.append(each_dict)

        outputMax = float(meterIdent[0].outputMax)
        output60 = float(meterIdent[0].outputMax)*60/100
        output40 = float(meterIdent[0].outputMax)*40/100
        output20 = float(meterIdent[0].outputMax)*20/100
        output10 = float(meterIdent[0].outputMax)*10/100

        Qmax100 = float(meterIdent[0].Qmax100)
        Qmax60 = float(meterIdent[0].Qmax60)
        Qmax40 = float(meterIdent[0].Qmax40)
        Qmax20 = float(meterIdent[0].Qmax20)
        Qmax10 = float(meterIdent[0].Qmax10)

        if float(dataQm) > outputMax:
            diff = Qmax100 * (float(dataQm)/outputMax)
        elif float(dataQm) > output60:
            diff = Qmax60 + (float(dataQm) - output60)/(outputMax-output60)*(Qmax100-Qmax60)
        elif float(dataQm) > output40:
            diff = Qmax40 + (float(dataQm) - output40)/(output60-output40)*(Qmax60-Qmax40)
        elif float(dataQm) > output20:
            diff = Qmax20 + (float(dataQm) - output20)/(output40-output20)*(Qmax40-Qmax20)
        elif float(dataQm) > output10:
            diff = Qmax10 + (float(dataQm) - output10)/(output20-output10)*(Qmax20-Qmax10)
        else:
            diff = Qmax10 * (float(dataQm)/output10)

        level = float(dataQm)/float(meterIdent[0].outputMax)
        if level < 0.2:
            level = level * 10
        elif level < 0.6:
            level = 2 + (level - 0.2)*5
        else:
            level = 4 + (level - 0.6)*2.5

        each_dict = {
            #             "qmax_level": '100%Qmax'+str(round(float(meterIdent[0].outputMax),1)),
            "single_deviation_val": 0,
            "single_qm_level": level,
            "single_qm_diff": diff
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '100%Qmax'+str(round(float(meterIdent[0].outputMax),1)),
            "outputmin": meterIdent[0].outputMin,
            "outputmax": meterIdent[0].outputMax
        }
        responsedata.append(each_dict)

        #出厂检定参数
        meterIdent = IdentificationMeter.objects.filter(meter_eui = meterEUI).filter(isFactory = 1)
        if len(meterIdent) == 0:
            return HttpResponse(json.dumps(responsedata),content_type ="application/json")
        each_dict = {
            "deviation_val": round(float(meterIdent[0].Qmax10),2),
            "qmax_level": 0.1,
        }
        responsedata.append(each_dict)
        each_dict = {
            "deviation_val": round(float(meterIdent[0].Qmax20),2),
            "qmax_level": 0.2,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '40%Qmax'+str(round(float(meterIdent[0].outputMax)*0.4,1)),
            "deviation_val": round(float(meterIdent[0].Qmax40),2),
            "qmax_level": 0.4,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '60%Qmax'+str(round(float(meterIdent[0].outputMax)*0.6,1)),
            "deviation_val": round(float(meterIdent[0].Qmax60),2),
            "qmax_level": 0.6,
        }
        responsedata.append(each_dict)
        each_dict = {
            #             "qmax_level": '100%Qmax'+str(round(float(meterIdent[0].outputMax),1)),
            "deviation_val": round(float(meterIdent[0].Qmax100),2),
            "qmax_level": 1,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def retrieveIndustryOutput(request):
    if 'user_company' in request.GET:
        userID = getUserId(request.GET['user_company'])
        meterSet = Meter.objects.filter(user_id__startswith = userID)
        today = datetime.datetime.today()
        yestoday = today - datetime.timedelta(days=1)
        outputVal = 0
        for meter in meterSet:
            MeterData = Data.objects.filter(meter_eui = meter.meter_eui, data_date__lt = today.strftime("%Y-%m-%d %H:%M:%S"), data_date__gt = yestoday.strftime("%Y-%m-%d %H:%M:%S")).order_by('-data_date')
            if len(MeterData) > 0:
                outputVal = outputVal + float(MeterData[0].data_qm)
            else:
                outputVal = outputVal + 0
        each_dict = {
            "industry_output": outputVal,
        }
        responsedata = []
        responsedata.append(each_dict)
        response = {}
        response['status'] = 'SUCCESS'
        response['data'] = responsedata
        return HttpResponse(json.dumps(response),content_type ="application/json")

def getAnalyse(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = []
    if 'type' in request.GET:
        type = request.GET['type']
    if 'period' in request.GET:
        period = int(request.GET['period'])
    if 'meter_ids' in request.GET:
        ids = request.GET['meter_ids']

    today=datetime.datetime.now().replace(hour=23,minute=59,second=59,microsecond=999999)
    preday = today - datetime.timedelta(days=period)
    meter_ids = ids.split(",")
    edata = 0
    for eachID in meter_ids:
        responsedata = []
        dataList = Data.objects.filter(meter_eui = eachID).filter(data_date__gt = preday.date())
        for eachData in dataList:
            if type == '0':
                edata = eachData.data_t
            elif type == '1':
                edata = eachData.data_p
            each_dict = {
                "data_date": time.mktime(eachData.data_date.timetuple())*1000,
                "data_e": float(edata)
            }
            responsedata.append(each_dict)
        response.append(responsedata)
    return HttpResponse(json.dumps(response),content_type ="application/json")




def meterDataChart(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
        period = int(request.GET['period']) if 'period' in request.GET else 30
        today = datetime.datetime.now().date()
        before = today -  datetime.timedelta(days=period)

        # responsedata = _calAmountByPeriod(userID,before,today)
        responsedata = DataService.meterDataChart(userID, before, today)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

def retrieveCurUser(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    responsedata = []
    each_dict = {
        #             "qmax_level": '100%Qmax'+str(round(float(meterIdent[0].outputMax),1)),
        "userName": request.session['user_name'],
        "userID": request.session['user_id']
    }
    responsedata.append(each_dict)
    response = {}
    response['status'] = 'SUCCESS'
    response['data'] = responsedata
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")
# def meterDataChart(request):
#     if  not 'user_id' in request.session:
#         loginPage(request)
#         return render_to_response('login.html', context_instance=RequestContext(request))
#     responsedata = []
#     if 'user_company' in request.GET:
#         userID = getUserId(request.GET['user_company'])
#         
#         meterEUISet = Meter.objects.filter(user_id__startswith = userID).values_list('meter_eui', flat=True)
# 
#         for each in Data.objects.filter(meter_eui__in = meterEUISet).extra({'published':"data_date"}).values('published').annotate(dsum=Sum('data_qb')):
#             each_dict = {
#                 "data_date": time.mktime(each["published"].timetuple())*1000,
# #                 "data_date": each["published"],
#                 "data_qb": int(each["dsum"])
# #                 "data_date":     formats.date_format(each.published,"DATE_FORMAT"),
#             }
#             responsedata.append(each_dict)
#     return HttpResponse(json.dumps(responsedata),content_type ="application/json")



def changeValve(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    data = json.loads(request.body)
    user_id = data.get('user_id')
    report_time = datetime.datetime.now()
    current_status_one = data.get('current_status_one')
    current_status_two = data.get('current_status_two')
    current_status_three = data.get('current_status_three')
    current_status_four = data.get('current_status_four')
    current_status_five = data.get('current_status_five')
    current_status_six = data.get('current_status_six')
    changed_status_one = data.get('changed_status_one')
    changed_status_two = data.get('changed_status_two')
    changed_status_three = data.get('changed_status_three')
    changed_status_four = data.get('changed_status_four')
    changed_status_five = data.get('changed_status_five')
    changed_status_six = data.get('changed_status_six')
    operator = data.get('operator')

    valve = valveManagement()
    valve.user_id = user_id
    valve.report_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    valve.current_status_one = current_status_one
    valve.current_status_two = current_status_two
    valve.current_status_three = current_status_three
    valve.current_status_four = current_status_four
    valve.current_status_five = current_status_five
    valve.current_status_six = current_status_six
    valve.changed_status_one = changed_status_one
    valve.changed_status_two = changed_status_two
    valve.changed_status_three = changed_status_three
    valve.changed_status_four = changed_status_four
    valve.changed_status_five = changed_status_five
    valve.changed_status_six = changed_status_six
    valve.operator = operator
    valve.save();

    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def changeArtworkMeter(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    data = json.loads(request.body)

    user_id = data.get('user_id')
    # report_time = data.get('report_time')
    report_time = datetime.datetime.now()
    meter_name = data.get('meter_name')
    current_lead_code = data.get('current_lead_code')
    changed_lead_code = data.get('changed_lead_code')
    changed_reason = data.get('changed_reason')
    operator = data.get('operator')

    valve = meterManagement()
    valve.user_id = user_id
    valve.report_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    valve.meter_name = meter_name
    valve.current_lead_code = current_lead_code
    valve.changed_lead_code = changed_lead_code
    valve.changed_reason = changed_reason
    valve.operator = operator
    valve.save();

    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def changeFilterArtworkInfo(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    response = {}
    data = json.loads(request.body)

    user_id = data.get('user_id')
    # report_time = data.get('report_time')
    report_time = datetime.datetime.now()
    type = data.get('type')
    capacity = data.get('capacity')
    accurate = data.get('accurate')
    change_time = data.get('change_time')
    maintain_time = data.get('maintain_time')
    work_content = data.get('work_content')
    operator = data.get('operator')

    valve = filterManagement()
    valve.user_id = user_id
    valve.report_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    valve.type = type
    valve.capacity = capacity
    valve.accurate = accurate
    valve.change_time = change_time
    valve.maintain_time = maintain_time
    valve.work_content = work_content
    valve.operator = operator
    valve.save();

    response['status'] = 'SUCCESS'
    response['data'] = {}
    #     print(json.dumps(response))
    return HttpResponse(json.dumps(response),content_type ="application/json")

def getValve(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    for each in valveManagement.objects.filter(user_id = userID):
        each_dict = {
            "id": each.pk,
            "user_company": getUserCompanyName(each.user_id),
            "report_time":  each.report_time.strftime("%Y/%m/%d %H:%M:%S"),
            "current_status_one": each.current_status_one,
            "current_status_two": each.current_status_two,
            "changed_status_one": each.changed_status_one,
            "changed_status_two": each.changed_status_two,
            "current_status_three": each.current_status_three,
            "current_status_four": each.current_status_four,
            "changed_status_three": each.changed_status_three,
            "changed_status_four": each.changed_status_four,
            "current_status_five": each.current_status_five,
            "current_status_six": each.current_status_six,
            "changed_status_five": each.changed_status_five,
            "changed_status_six": each.changed_status_six,
            "operator": each.operator,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")


def getMeterArtworkInfo(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    for each in meterManagement.objects.filter(user_id = userID):
        each_dict = {
            "id": each.pk,
            "user_company": getUserCompanyName(each.user_id),
            "meter_name": each.meter_name,
            "report_time":  each.report_time.strftime("%Y/%m/%d %H:%M:%S"),
            "current_lead_code": each.current_lead_code,
            "changed_lead_code": each.changed_lead_code,
            "changed_reason": each.changed_reason,
            "operator": each.operator,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")


def getFilterArtworkInfo(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    for each in filterManagement.objects.filter(user_id = userID):
        each_dict = {
            "id": each.pk,
            "user_company": getUserCompanyName(each.user_id),
            "type": each.type,
            "report_time":  each.report_time.strftime("%Y/%m/%d %H:%M:%S"),
            "capacity": each.capacity,
            "accurate": each.accurate,
            "change_time": each.change_time.strftime("%Y/%m/%d %H:%M:%S"),
            "maintain_time": each.maintain_time.strftime("%Y/%m/%d %H:%M:%S"),
            "work_content": each.work_content,
            "operator": each.operator,
        }
        responsedata.append(each_dict)
    return HttpResponse(json.dumps(responsedata),content_type ="application/json")

#标况总累计
def getVBtotal(meterEUI, startDate, endDate):
    val = 0
    if startDate == endDate:
        currYear = datetime.datetime.now().year
        currMonth = datetime.datetime.now().month
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__year=currYear, data_date__month=currMonth).order_by('-data_date')
    else:
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__range=[startDate,endDate]).order_by('-data_date')
    if len(dataList) <= 1:
        return 0
    if dataList[0].data_vb == '' or dataList[len(dataList)-1].data_vb == '':
        return 0
    val = float(dataList[0].data_vb)-float(dataList[len(dataList)-1].data_vb)
    return round(val,2)
#工况总累计
def getVMtotal(meterEUI, startDate, endDate):
    val = 0
    if startDate == endDate:
        currYear = datetime.datetime.now().year
        currMonth = datetime.datetime.now().month
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__year=currYear, data_date__month=currMonth).order_by('-data_date')
    else:
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__range=[startDate,endDate]).order_by('-data_date')
    if len(dataList) <= 1:
        return 0
    if dataList[0].data_vm == '' or dataList[len(dataList)-1].data_vm == '':
        return 0
    val = float(dataList[0].data_vm)-float(dataList[len(dataList)-1].data_vm)
    return round(val,2)


def getPaAve(meterEUI, startDate, endDate):
    val = 0
    if startDate == endDate:
        currYear = datetime.datetime.now().year
        currMonth = datetime.datetime.now().month
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__year=currYear, data_date__month=currMonth).order_by('-data_date')
    else:
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__range=[startDate,endDate]).order_by('-data_date')
    if len(dataList)<=1:
        return 0
    sum = 0
    for v in dataList:
        if v.data_p == '':
            sum = sum + 0
        else:
            sum = sum + float(v.data_p)
    val = sum/len(dataList)
    return round(val,2)

def getTempAve(meterEUI, startDate, endDate):
    val = 0
    if startDate == endDate:
        currYear = datetime.datetime.now().year
        currMonth = datetime.datetime.now().month
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__year=currYear, data_date__month=currMonth).order_by('-data_date')
    else:
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__range=[startDate,endDate]).order_by('-data_date')
    if len(dataList)<=1:
        return 0
    sum = 0
    for v in dataList:
        if v.data_p == '':
            sum = sum + 0
        else:
            sum = sum + float(v.data_t)
    val = sum/len(dataList)
    return round(val,2)

def getGasCollection(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    #开始攒数据
    if 'district_id' in request.GET:
        districtID = request.GET['district_id']
        userID = request.session['user_id']
        startDate = datetime.datetime.strptime(request.GET['startDate'], "%Y-%m-%d").strftime("%Y-%m-%d")
        endDate = datetime.datetime.strptime(request.GET['endDate'], "%Y-%m-%d").strftime("%Y-%m-%d")
        preMonthStart = datetime.datetime.strptime(request.GET['preMonthStartDate'], "%Y-%m-%d").strftime("%Y-%m-%d")
        preMonthEnd = datetime.datetime.strptime(request.GET['preMonthEndDate'], "%Y-%m-%d").strftime("%Y-%m-%d")
        meters = Meter.objects.filter(user_id__startswith = userID).filter(meter_district = districtID)
        if not meters or len(meters) == 0:
            return toJsonResponse(responsedata)
        statsMap = LeeUtil.toMap(dataService.queryMeterDataStatistic([m.meter_eui for m in meters], startDate, endDate) , 'meter_eui')
        statsMapPre = LeeUtil.toMap(dataService.queryMeterDataStatistic([m.meter_eui for m in meters], preMonthStart, preMonthEnd) , 'meter_eui')
        typesMap = LeeUtil.toMap(MeterType.objects.all(),'meter_type')
        for each in meters:
            eui = each.meter_eui
            if not statsMap.has_key(eui):
                continue
            dateCurrent = statsMap[eui]
            datePre = statsMapPre[eui]
            each_dict = {
                "user_id": each.user_id,
                "meter_name": each.meter_name,
                "meter_typenum": each.meter_type,
                "meter_index": each.meter_index,
                "meter_version": each.meter_version,
                "wrapCode": each.wrap_code,
                "meter_eui": eui,
                "communication": each.communication,

                #metertype
                "meter_type": typesMap.get(each.meter_type).meter_type_name if typesMap.has_key(each.meter_type)  else '',
                "meter_revisetype": typesMap.get(each.meter_revisetype).meter_type_name if typesMap.has_key(each.meter_revisetype)  else '',
                #District
                "meter_district": getDistrictName(each.meter_district),
                #user
                "meter_company" :getUserCompanyName(each.user_id[0:4]),

                # Data
                "meter_data_vb": str(round(float(dateCurrent.data_vb), 2)) if dateCurrent else '',
                "meter_data_vm": str(round(float(dateCurrent.data_vm), 2)) if dateCurrent else '',
                "meter_data_p": str(round(float(dateCurrent.data_p), 2)) if dateCurrent else '',
                "meter_date_t": str(round(float(dateCurrent.data_t), 2)) if dateCurrent else '',

                "meter_data_vb1": str(round(float(datePre.data_vb), 2)) if datePre else '',
                "meter_data_vm1": str(round(float(datePre.data_vm), 2)) if datePre else '',
                "meter_data_p1": str(round(float(datePre.data_p), 2)) if datePre else '',
                "meter_date_t1": str(round(float(datePre.data_t), 2)) if datePre else ''
            }
            responsedata.append(each_dict)

    return toJsonResponse(responsedata)

def toJsonResponse(data):
    return HttpResponse(json.dumps(data),content_type ="application/json")

def getGasCollection_bak(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    #开始攒数据
    if 'district_id' in request.GET:
        districtID = request.GET['district_id']
        userID = request.session['user_id']
        startDate = request.GET['startDate']
        endDate = request.GET['endDate']
        preMonthStart = request.GET['preMonthStartDate']
        preMonthEnd = request.GET['preMonthEndDate']
        meters = Meter.objects.filter(user_id__startswith = userID).filter(meter_district = districtID)
        for each in meters:
            each_dict = {
                "user_id": each.user_id,
                "meter_name": each.meter_name,
                "meter_typenum": each.meter_type,
                "meter_index": each.meter_index,
                "meter_version": each.meter_version,
                "wrapCode": each.wrap_code,
                "meter_eui": each.meter_eui,
                "communication": each.communication,

                #metertype
                "meter_type": meterTypeName(each.meter_type),
                "meter_revisetype": meterTypeName(each.meter_revisetype),
                #District
                "meter_district": getDistrictName(each.meter_district),
                #user
                "meter_company" :getUserCompanyName(each.user_id[0:4]),

                # Data
                "meter_data_vb": getVBtotal(each.meter_eui,startDate,endDate),
                "meter_data_vm":getVMtotal(each.meter_eui,startDate,endDate),
                "meter_data_p":getPaAve(each.meter_eui,startDate,endDate),
                "meter_date_t":getTempAve(each.meter_eui,startDate,endDate),

                "meter_data_vb1": getVBtotal(each.meter_eui,preMonthStart,preMonthEnd),
                "meter_data_vm1":getVMtotal(each.meter_eui,preMonthStart,preMonthEnd),
                "meter_data_p1":getPaAve(each.meter_eui,preMonthStart,preMonthEnd),
                "meter_date_t1":getTempAve(each.meter_eui,preMonthStart,preMonthEnd)
            }
            responsedata.append(each_dict)

    return HttpResponse(json.dumps(responsedata),content_type ="application/json")
def getDayDataChart(request):
    if  not 'user_id' in request.session:
        loginPage(request)
        return render_to_response('login.html', context_instance=RequestContext(request))
    if 'user_id' in request.GET:
        userID = request.GET['user_id']
    responsedata = []
    startDateStr = request.GET['startDate']
    endDateStr = request.GET['endDate']
    meterEUI = request.GET['meter_eui']

    startDate = datetime.datetime.strptime(startDateStr, "%Y-%m-%d").date()
    endDate = datetime.datetime.strptime(endDateStr, "%Y-%m-%d").date()
    curDate = startDate
    while curDate <= endDate :
        dataList = Data.objects.filter(meter_eui = meterEUI).filter(data_date__year=curDate.year, data_date__month=curDate.month, data_date__day=curDate.day).order_by('data_date')
        if len(dataList) > 0:
            each_dict = {
                "data" : round(dataList[len(dataList)-1].data_vb - dataList[0].data_vb,2),
                "date" : curDate.strftime("%Y-%m-%d")
            }
            responsedata.append(each_dict)
        curDate = curDate + datetime.timedelta(days = 1)

    return HttpResponse(json.dumps(responsedata),content_type ="application/json")
