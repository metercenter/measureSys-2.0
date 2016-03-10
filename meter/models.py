from django.db import models

from django.contrib import admin

class User(models.Model):
    user_id = models.CharField(max_length=24)
    user_name = models.CharField(max_length=200)
    user_password = models.CharField(max_length=10)
    user_company = models.CharField(max_length=200)
    user_addr = models.CharField(max_length=200)
    user_phone = models.CharField(max_length=20)
    def __unicode__(self):              # __unicode__ on Python 2
        return self.user_name
    
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user_name', 'user_addr')

class Meter(models.Model):
    user_id = models.CharField(max_length=24)
    meter_name = models.CharField(max_length=200)
    meter_type = models.IntegerField(default=0)
    meter_index = models.CharField(max_length=200)
    meter_eui = models.CharField(max_length=200)
    meter_revisetype = models.CharField(max_length=200)
    meter_version = models.CharField(max_length=200)
    wrap_code = models.CharField(max_length=200)
    communication = models.CharField(max_length=200)
    meter_district = models.CharField(max_length=200,default="")
    meter_latitude = models.CharField(max_length=200,default="")
    meter_longitude = models.CharField(max_length=200,default="")
    def __unicode__(self):              # __unicode__ on Python 2
        return "name: "+self.meter_name+"meter EUI64: "+ self.meter_eui
        
class MeterAdmin(admin.ModelAdmin):
    list_display = ('user_id',  'meter_name', 'meter_type', 'meter_index', 'meter_eui', 'meter_revisetype')

class Data(models.Model):
    data_id = models.IntegerField(default=0)
    meter_eui = models.CharField(max_length=200)
    data_warn = models.IntegerField(default=0)
    data_date = models.DateTimeField('date published')
    data_vb = models.CharField(max_length=200)
    data_vm = models.CharField(max_length=200)
    data_p = models.CharField(max_length=200)
    data_t = models.CharField(max_length=200)
    data_qb = models.CharField(max_length=200)
    data_qm = models.CharField(max_length=200)
    data_battery = models.CharField(max_length=200)

class DataAdmin(admin.ModelAdmin):
    list_display = ('data_id', 'data_date', 'data_vb', 'data_vm', 'data_p', 'data_t', 'data_qb', 'data_qm')
    
class MeterType(models.Model):
    meter_type = models.IntegerField(default=0)
    meter_type_name = models.CharField(max_length = 200)
    def __uincode__(self):
        return "meter_type: "+self.meter_type

class MeterTypeAdmin(admin.ModelAdmin):
    list_display = ('meter_type', 'meter_type_name')
    
class DataWarnType(models.Model):
    data_warn = models.IntegerField(default = 0)
    data_warn_reason = models.CharField(max_length = 200)
    data_warn_solution = models.CharField(max_length = 200)
    data_warn_level = models.CharField(max_length = 200)
    def __uincode__(self):
        return "warn_type: " +self.data_warn
class DataWarnTypeAdmin(admin.ModelAdmin):
    list_display = ('data_warn', 'data_warn_reason', 'data_warn_solution', 'data_warn_level')
    
class WarnInfo(models.Model):
    meter_eui = models.CharField(max_length=200)
    data_warn = models.IntegerField(default = 0)
    warn_level = models.CharField(max_length=24)
    warn_date = models.DateTimeField('date published')
    warn_solution = models.CharField(max_length=200)
    warn_other = models.CharField(max_length=200)
    def __uincode__(self):
        return "meter_eui: " +self.meter_eui + "data_warn " + self.data_warn 
class WarnInfoAdmin(admin.ModelAdmin):
    list_display = ('meter_eui', 'data_warn')        
    
class Company(models.Model):
    user_id = models.CharField(max_length=24)
    company_title = models.CharField(max_length=200)
    company_content = models.CharField(max_length=200)
    company_contract = models.CharField(max_length=200)
    company_tel = models.CharField(max_length=200)
    company_addr = models.CharField(max_length=200)
    def __uincode__(self):
        return "user_id: "+self.user_id+ " company_title: "+self.company_title+ " content "+ self.company_content

class UserFeedback(models.Model):
    user_id = models.CharField(max_length=24)
    report_time = models.DateTimeField('date published')
    solution_deadline = models.CharField(max_length=200)
    problem = models.CharField(max_length=200)
    solution_result = models.CharField(max_length=200)
    def __uincode__(self):
        return "user_id: "+self.user_id+ " report_time: "+self.report_time+ " solution_deadlie "+ self.solution_deadline + " problem: "+ self.problem 
class UserFeedbackAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'problem')
    
class IdentificationMeter(models.Model):
    meter_eui = models.CharField(max_length=200)
    
    identify_date = models.DateTimeField('date published',blank=True,null=True)
    next_identify_date = models.DateTimeField('date published',blank=True,null=True)
    medium = models.CharField(max_length=200)
    outputMin = models.CharField(max_length=200)
    outputMax = models.CharField(max_length=200)
    pressureMin = models.CharField(max_length=200)
    pressureMax = models.CharField(max_length=200)
    temperatureMin = models.CharField(max_length=200)
    temperatureMax = models.CharField(max_length=200)
    Qmax100 = models.CharField(max_length=200)
    Qmax60 = models.CharField(max_length=200)
    Qmax40 = models.CharField(max_length=200)
    Qmax20 = models.CharField(max_length=200)
    Qmax10 = models.CharField(max_length=200)
    isFactory = models.IntegerField(default=0)
    def __uincode__(self):
        return "meter_eui: "+self.meter_eui
class IndMeterAdmin(admin.ModelAdmin):
    list_display = ('meter_eui','identify_date')
    
class outputDiff(models.Model):
    input = models.CharField(max_length=200)
    industry_output = models.CharField(max_length=200)
    resident_output = models.CharField(max_length=200)
    other_output = models.CharField(max_length=200)
    output_diff = models.CharField(max_length=200)
    output_date = models.DateTimeField('date published')
    user_id = models.CharField(max_length=24)
    def __uincode__(self):
        return "user_id: "+self.user_id+ " input: "+self.input+ " industry_output "+ self.industry_output
    
class District(models.Model):
    district_id = models.CharField(max_length=24)
    district_name = models.CharField(max_length=24)
    def __unicode__(self):              # __unicode__ on Python 2
        return "id: "+self.district_id
        
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('district_id',  'district_name')
    
admin.site.register(User, UserAdmin)
admin.site.register(Meter, MeterAdmin)
admin.site.register(Data, DataAdmin)
admin.site.register(IdentificationMeter, IndMeterAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(DataWarnType, DataWarnTypeAdmin)
admin.site.register(UserFeedback, UserFeedbackAdmin)
admin.site.register(WarnInfo, WarnInfoAdmin)

# Create your models here.

class valveManagement(models.Model):
    user_id = models.CharField(max_length=24)
    report_time = models.DateTimeField('date published')
    current_status_one = models.CharField(max_length=200)
    current_status_two = models.CharField(max_length=200)
    current_status_three = models.CharField(max_length=200)
    current_status_four = models.CharField(max_length=200)
    current_status_five = models.CharField(max_length=200)
    current_status_six = models.CharField(max_length=200)
    changed_status_one = models.CharField(max_length=200)
    changed_status_two = models.CharField(max_length=200)
    changed_status_three = models.CharField(max_length=200)
    changed_status_four = models.CharField(max_length=200)
    changed_status_five = models.CharField(max_length=200)
    changed_status_six = models.CharField(max_length=200)
    operator = models.CharField(max_length=200)
    def __unicode__(self):              # __unicode__ on Python 2
        return "user_id: "+self.user_id

class meterManagement(models.Model):
    user_id = models.CharField(max_length=24)
    report_time = models.DateTimeField('date published')
    meter_name = models.CharField(max_length=200)
    current_lead_code = models.CharField(max_length=200)
    changed_lead_code = models.CharField(max_length=200)
    changed_reason = models.CharField(max_length=200)
    operator = models.CharField(max_length=200)
    def __unicode__(self):              # __unicode__ on Python 2
        return "user_id: "+self.user_id

class filterManagement(models.Model):
    user_id = models.CharField(max_length=24)
    report_time = models.DateTimeField('date published')
    type = models.CharField(max_length=200)
    capacity = models.CharField(max_length=200)
    accurate = models.CharField(max_length=200)
    change_time = models.DateTimeField('date published')
    maintain_time = models.DateTimeField('date published')
    work_content = models.CharField(max_length=200)
    operator = models.CharField(max_length=200)
    def __unicode__(self):              # __unicode__ on Python 2
        return "user_id: "+self.user_id
