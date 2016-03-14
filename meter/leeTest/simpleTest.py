import datetime

__author__ = 'peng'

a = [(3, datetime.datetime.now()), (33, datetime.datetime.now() - datetime.timedelta(days=3))]
s = {}
for e in a:
    s[e[1].date()] = e
print s
