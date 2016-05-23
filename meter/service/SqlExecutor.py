import sqlite3
import datetime

from django.db import connection

__author__ = 'lipeng'


class SqlExecutor:
    convertSql = not False

    def __init__(self, con):
        self.connection = con

    def execSqlAll(self, sql, args, clz=None):
        cu = self.__getCusor()
        sql = self.__processSql(sql)
        cu.execute(sql, args)
        return self.__convert(cu.fetchall(), clz, cu)

    def execSqlSingle(self, sql, args, clz=None):
        sql = self.__processSql(sql)
        cu = self.__getCusor()
        cu.execute(sql, args)
        return self.__convert(cu.fetchone(), clz, cu)

    def execRawSqlFetchAll(self, sql, *args):
        sql = self.__processSql(sql)
        cursor = self.__getCusor()
        cursor.execute(sql, args)
        re = cursor.fetchall()
        cursor.close()
        return re

    def execRawSqlFetchOnel(self, sql, *args):
        sql = self.__processSql(sql)
        cursor = self.__getCusor()
        cursor.execute(sql, args)
        re = cursor.fetchone()
        cursor.close()
        return re

    def __processSql(self, sql):
        if self.convertSql:
            return sql.replace('?', '%s')
        return sql

    def insert(self, entity, table, id=None):
        ins = self.__buildInsert(entity, table, id)
        self.connection.execute(self.__processSql(ins[0]), ins[1])
        self.connection.commit()

    def __getFields(self, a):
        return [attr for attr in dir(a) if not attr.startswith('_')]

    def __buildInsert(self, a, table, id=None):
        fs = self.__getFields(a)
        if id:
            fs.remove(id)
        args = [getattr(a, f) for f in fs]
        # fsInInsert = ",".join(["'" + attr + "'" for attr in fs])
        fsInInsert = ",".join([attr for attr in fs])
        from meter.service.LeeUtil import LeeUtil
        placeHolders = LeeUtil.genPlaceHolders(len(fs))
        insert = '''insert into {0}({1}) values({2})'''.format(table, fsInInsert, placeHolders)
        return insert, args

    def __convert(self, sqlResult, clz, cu):
        if isinstance(sqlResult, list):
            re = []
            for i in sqlResult:
                re.append(self.__convert(i, clz, cu))
            return re
        if not clz:
            return sqlResult
        re = clz()
        fs = [tuple[0] for tuple in cu.description]
        for i in range(0, min(len(sqlResult), len(fs))):
            setattr(re, fs[i], sqlResult[i])
        return re

    def __getCusor(self):
        return self.connection.cursor()
