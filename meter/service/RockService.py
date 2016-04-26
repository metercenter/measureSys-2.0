from json import JSONEncoder
from django.db import connection
import time
import datetime

import sqlite3

__author__ = 'peng'


class PageModal:
    pageNum = 1
    pageSize = 1000
    count = 0
    data = []


class DataService:
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
        startDay = startDay - datetime.timedelta(days=1)  # one day before
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
                result[(e[0].date() - day).days]["data_qb"] = e[1] - before[1]
        # for dd in result:
        #     print time.localtime( dd['data_date']/1000) , "    " , dd['data_qb']
        return result

    @staticmethod
    def getData(user_id, date, page, pageSize):
        responsedata = []
        data = DataService.execSqlFetchAll('''
            select id ,data_id , meter_eui,data_date , data_vb,data_vm,data_p,data_t,data_qb , data_qm,data_battery
                from meter_data
                where meter_eui in ( SELECT meter_eui from meter_meter where user_id = %s)
                and data_date >= %s
                order by data_date DESC
                limit %s,%s
            ''', user_id, date, page * pageSize, pageSize)
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
    def getWarnInfo(user_id, page, page_size):
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
            order by  w.warn_date desc
            limit %s , %s
            ''',
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
            ''',
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

    """
    optimized calculation
    """

    @staticmethod
    def _calAmountByPeriod(userID, startDay, endDay):
        data = DataService.execSqlFetchAll(
            '''
            select data_date , max(data_vb) - min(data_vb) as data_qb  from meter_data
                where meter_eui  in ( select meter_eui from meter_meter where user_id like  %s )
                     and data_date > %s and data_date < %s
                     group by date(data_date)
            ''',
            userID + "%", startDay, endDay)
        result = []
        day = startDay
        while day <= endDay:
            result.append({
                "data_date": time.mktime(day.timetuple()) * 1000 - 85680000,
                "data_qb": 0
            })
            day = day + datetime.timedelta(days=1)
        for e in data:
            result[(e[0].date() - startDay).days]["data_qb"] = e[1]
        return result
