from meter.service.SqlExecutor import SqlExecutor

__author__ = 'lipeng'


class LeeUtil:
    @staticmethod
    def toMap(lists, key):
        re = {}
        if lists:
            for a in lists:
                re[getattr(a, key)] = a
        return re

    @staticmethod
    def genPlaceHolders(num):
        return ','.join(['?' for i in range(0, num)])

    @staticmethod
    def merge(*c):
        re = []
        for a in c:
            if isinstance(a, tuple) or isinstance(a, list):
                for b in a:
                    re.append(b)
            else:
                re.append(a)
        return re
