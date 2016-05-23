import datetime
from inspect import getmodule

__author__ = 'lipeng'


class MeterData:
    def __init__(self, data_id=0, meter_eui='', data_date=datetime.datetime.now(), data_warn=0,
                 data_vb=0.0, data_vm=0.0, data_p=0.0, data_t=0.0, data_qb=0.0, data_qm=0.0, data_battery=''):
        self.data_id = data_id
        self.data_battery = data_battery
        self.data_date = data_date
        self.data_p = data_p
        self.data_qb = data_qb
        self.data_qm = data_qm
        self.data_t = data_t
        self.data_vb = data_vb
        self.data_vm = data_vm
        self.data_p = data_p
        self.data_warn = data_warn
        self.meter_eui = meter_eui

    def __repr__(self):
        return str(self.__dict__)


class MeterNew:
    def __init__(self, meter_eui='', add_time=datetime.datetime.now()):
        self.meter_eui = meter_eui
        self.add_time = add_time

    def __repr__(self):
        return str(self.__dict__)
