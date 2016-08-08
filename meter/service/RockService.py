from json import JSONEncoder
from django.db import connection
import time
import datetime

import sqlite3

from meter.service.LeeUtil import LeeUtil
from meter.service.RockModels import MeterData
from meter.service.SqlExecutor import SqlExecutor

__author__ = 'peng'


class PageModal:
    pageNum = 1
    pageSize = 1000
    count = 0
    data = []


class DataService:
    ex = SqlExecutor(connection)

    def getSqlExecutor(self):
        return self.ex

    def insertMeterData(self, meterData):
        self.ex.insert(meterData, 'meter_data')

    def insertMeterNew(self, meterNew):
        self.ex.insert(meterNew, 'meter_newmeter')

    def queryMeterDataStatistic(self, euis, startDate, endDate):
        if not euis or len(euis) == 0:
            return []
        return self.ex.execSqlAll('''
        select
        meter_eui , max(data_vm)-min(data_vm) as data_vm,avg(data_p) as data_p,avg(data_t) as data_t ,max(data_vb)-min(data_vb) as data_vb
        from meter_data
        where
        meter_eui in ({0})
        and data_date > ? and data_date < ? group by meter_eui ORDER  BY data_date DESC
      '''.format(LeeUtil.genPlaceHolders(len(euis))), LeeUtil.merge(euis, startDate, endDate), MeterData)

    @staticmethod
    def execSqlFetchAll(sql, *args):
        cursor = connection.cursor()
        cursor.execute(sql, args)
        re = cursor.fetchall()
        cursor.close()
        return re

    @staticmethod
    def execSqlFetchOnel(sql, *args):
        cursor = connection.cursor()
        cursor.execute(sql, args)
        re = cursor.fetchone()
        cursor.close()
        return re

        #     select data_date , max(data_vb) , min(data_vb) as data_qb  from meter_data
        #     where meter_eui  in ( select meter_eui from meter_meter where user_id like  %s )
        # and data_date > %s and data_date < %s
        # group by date(data_date) order by data_date asc

    @staticmethod
    def meterDataChart(userID, startDay, endDay):
        data = DataService.execSqlFetchAll(
            '''
            select  a.dtime , sum(a.dMax)   from
              (select data_date as dtime, max(data_vb) as dMax , meter_eui as eui
                from meter_data
                where meter_eui  in
                        ( select meter_eui from meter_meter where user_id like  %s )
                     and data_date > %s
                     group by date(data_date),meter_eui) a
            group by date(a.dtime) order by a.dtime asc ;
            ''',
            userID + "%", startDay)
        result = []
        if len(data) <= 1:
            return result
        day = data[1][0].date()  # fetch the first date
        endDay = data[len(data) - 1][0].date()
        while day <= endDay:
            result.append({
                "data_date": time.mktime(day.timetuple()) * 1000,
                "data_qb": 0
            })
            day = day + datetime.timedelta(days=1)
        for i in range(1, len(data)):
            e = data[i]
            before = data[i - 1]
            if (e[0].date() - before[0].date()).days == 1:  # there must be data the day before
                result[(e[0].date() - day).days]["data_qb"] = e[1] - before[1] if e[1] > before[1] else 0
        return result

    @staticmethod
    def getData(user_id, date, page, pageSize):
        responsedata = []
        if page < 1:
            page = 1
        data = DataService.execSqlFetchAll('''
            select id ,data_id , meter_eui,data_date , data_vb,data_vm,data_p,data_t,data_qb , data_qm,data_battery
                from meter_data
                where meter_eui in ( SELECT meter_eui from meter_meter where user_id = %s)
                and data_date >= %s
                order by data_date DESC
                limit %s,%s
            ''', user_id, date, (page - 1) * pageSize, pageSize)
        count = DataService.execSqlFetchOnel('''
            select count(1)
                from meter_data
                where meter_eui in ( SELECT meter_eui from meter_meter where user_id = %s)
                and data_date >= %s
            ''', user_id, date)
        for each in data:
            each_dict = {
                "id": each[0],
                "data_id": each[1],
                "meter_eui": each[2],
                "data_date": each[3].strftime("%Y/%m/%d %H:%M:%S"),
                "data_vb": each[4],
                "data_vm": each[5],
                "data_p": each[6],
                "data_t": each[7],
                "data_qb": each[8],
                "data_qm": each[9],
                "data_battery": each[10],
            }
            responsedata.append(each_dict)
        re = PageModal()
        re.pageNum = page
        re.pageSize = pageSize
        re.count = count
        re.data = responsedata
        return re

    @staticmethod
    def getWarnInfo(user_id, page, page_size , warnLevel=None):
        responsedata = []
        data = DataService.execSqlFetchAll(
            '''
            select
            w.data_warn,
            w.warn_date,
            m.meter_name,
            w.warn_other,
            warnType.data_warn_solution ,
            warnType.data_warn_level ,
            warnType.data_warn_reason ,
            u.user_company,
            uu.user_company
              from meter_warninfo w
              inner join meter_meter m
                          on  m.user_id like %s and w.meter_eui = m.meter_eui
              inner join meter_user u
                          on  u.user_id= substr(m.user_id,1,4)
              inner join meter_user uu
                          on  uu.user_id= substr(m.user_id,1,8)
              left join meter_datawarntype warnType
                          on warnType.data_warn = w.data_warn
            {0}
            order by  w.warn_date desc
            limit %s , %s
            '''.format('where warn_level = ' + LeeUtil.wrapString(warnLevel) if warnLevel else ""),
            user_id + "%", (page - 1) * page_size, page_size)

        count = DataService.execSqlFetchOnel(
            '''
            select
            count(1)
              from meter_warninfo w
              inner join meter_meter m
                          on  m.user_id like %s and w.meter_eui = m.meter_eui
              inner join meter_user u
                          on  u.user_id= substr(m.user_id,1,4)
              inner join meter_user uu
                          on  uu.user_id= substr(m.user_id,1,8)
              left join meter_datawarntype warnType
                          on warnType.data_warn = w.data_warn
            {0}
            '''.format('where warn_level = ' + LeeUtil.wrapString(warnLevel) if warnLevel else ""),
            user_id + "%")
        for d in data:
            responsedata.append({
                "data_warn": d[0],
                "warn_date": d[1].strftime("%Y/%m/%d %H:%M:%S"),
                "meter_info": d[2],
                "other": d[3],
                "solution": d[4],
                "warn_level": d[5],
                "warn_info": d[6],
                "company": d[7],
                "user_id": d[8],
            })
        re = PageModal()
        re.pageNum = page
        re.pageSize = page_size
        re.count = count
        re.data = responsedata
        return re


    @staticmethod
    def getUserList(user_id, user_id_len):
        responsedata = []

        data = DataService.execSqlFetchAll(
            '''
            SELECT user_id, user_company FROM meter_user WHERE user_id like %s and length(user_id) = %s ORDER By user_id ASC
            ''', user_id + "%" , user_id_len
        )
        for each in data:
            each_dict = {
                "user_id": each[0],
                "user_company": each[1],
            }
            responsedata.append(each_dict)
        return responsedata

    @staticmethod
    def getDataCollection(user_id, start_date, end_date):
        responsedata = []

        data = DataService.execSqlFetchAll(
            '''
            select max(d.data_vm)-min(d.data_vm) as data_vm,avg(d.data_p) as data_p,avg(d.data_t) as data_t ,max(d.data_vb)-min(d.data_vb) as data_vb, m.meter_name, m.meter_eui
              from meter_data d
                inner join meter_meter m
                on m.meter_eui = d.meter_eui
              where d.meter_eui in ( SELECT meter_eui from meter_meter where user_id like %s)
            and data_date >= %s and data_date <= %s group by d.meter_eui order by data_date DESC
            ''', user_id + "%" , start_date, end_date
        )
        for each in data:
            each_dict = {
                "data_vm": round(float(each[0])),
                "data_p": round(float(each[1])) if each[1] < 100 else round(float(each[1]/100)),
                "data_t": round(float(each[2])),
                "data_vb": round(float(each[3])),
                "meter_name": each[4],
                "meter_eui": each[5]
            }
            responsedata.append(each_dict)
        print(responsedata)
        return responsedata

    @staticmethod
    def getDataReport(meter_eui, start_date, end_date):
        responsedata = []

        data = DataService.execSqlFetchAll(
            '''
            select d.meter_eui, d.data_date , d.data_vb, d.data_vm, d.data_p, d.data_t, d.data_qb , d.data_qm, d.data_battery, m.meter_name
              from meter_data d
                inner join meter_meter m
                on m.meter_eui = d.meter_eui
              where d.meter_eui in (%s)
            and data_date >= %s and data_date <= %s order by data_date DESC
            ''', meter_eui , start_date, end_date
        )
        print(meter_eui)
        print(start_date)
        print(end_date)
        for each in data:
            each_dict = {
                "meter_eui": each[0],
                "data_date": each[1],
                "data_vb": round(float(each[2])),
                "data_vm": round(float(each[3])) if each[3] != '' else 0,
                "data_p": 0 if each[4] == '' else (round(float(each[4])) if each[1] < 100 else round(float(each[1]/100))),
                "data_t": round(float(each[5])) if each[5] != '' else 0,
                "data_qb": round(float(each[6])),
                "data_qm": round(float(each[7])) if each[7] != '' else 0,
                "data_battery": round(float(each[8])) if each[8] != '' else 0,
                "meter_name": each[9]
            }
            responsedata.append(each_dict)
        print(responsedata)
        return responsedata

