from json import JSONEncoder
from django.db import connection

__author__ = 'peng'


class PageModal(JSONEncoder):
    def __init__(self):
        pass

    def default(self, o):
        return o.__dict__

    pageNum = 1
    pageSize = 1000
    count = 0
    data = []


class DataService:
    @staticmethod
    def getWarnInfo(user_id, page, page_size):
        responsedata = []
        cursor = connection.cursor()
        cursor.execute(
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
            [user_id + "%", (page - 1) * page_size, page_size])
        data = cursor.fetchall()
        cursor.execute(
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
            [user_id + "%"])
        count = cursor.fetchone()
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
