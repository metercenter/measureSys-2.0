__author__ = 'lipeng'


class SqlExecutor:

    def __init__(self, con, convertSql=True):
        self.connection = con
        # django connection use % instead of ?
        self.convertSql = convertSql
        self.fetchOne = lambda x: x.fetchone()
        self.fetchAll = lambda x: x.fetchall()

    def execSqlAll(self, sql, args, clz=None):
        cu = self.__getCusor()
        return self.__convert(self.__execRawSql(cu, self.fetchAll, sql, args), clz, cu)

    def execSqlSingle(self, sql, args, clz=None):
        cu = self.__getCusor()
        return self.__convert(self.__execRawSql(cu, self.fetchOne, sql, args), clz, cu)

    def execRawSqlFetchAll(self, sql, *args):
        return self.__execRawSql(self.__getCusor(), self.fetchAll, sql, args)

    def execRawSqlFetchOnel(self, sql, *args):
        return self.__execRawSql(self.__getCusor(), self.fetchOne, sql, args)

    def __execRawSql(self, cursor, lambdaFetch, sql, args):
        sql = self.__processSql(sql)
        print sql % tuple(map(lambda x:"'"+x +"'",args))
        cursor.execute(sql, args)
        re = lambdaFetch(cursor)
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
