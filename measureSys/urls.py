from django.conf.urls import patterns, include, url
from django.contrib import admin
from meter.views import mainPage, logout_view
from meter.views import getMeter
from meter.views import userList
from meter.views import getData, modifyOutputDiff,retrieveNodeNum, getWarnInfo, changeCompanyIntro,AddUserFeedback , addIndentificationMeter, getIndUser
from meter.views import loginPage, getCompanyInfo, getUserFeedback, getIndentificationMeter,selectPanel,addOutputDiff, outputDiffChart, getIndMeter
from meter.views import login_view, user_group_show,user_level,register_company,register_meter,meter_level,getExcelFile,warnList,getMeterType, getIndComp
from meter.views import getDeviationVal,retrieveIndustryOutput,meterDataChart, retrieveCurUser, getDistrict, getAnalyse, changeValve, getValve, changeArtworkMeter
from meter.views import wechatLogin, getMeterArtworkInfo, getFilterArtworkInfo,changeFilterArtworkInfo, getGasCollection, getDayDataChart, getUserList, getDataCollection
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Measuringsystem.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^get-meter', getMeter),
    url(r'^Users/List', userList),
    url(r'^Warn/List', warnList),
    url(r'^get-data', getData),
    url(r'^$', loginPage),
    url(r'^login', loginPage),
    url(r'^logout',logout_view),
    url(r'^main',login_view),
    url(r'^get-user-group',user_group_show),
    url(r'^get-user-level',user_level),
    url(r'^get-usermeter-level',meter_level),
    url(r'^register_company',register_company),
    url(r'^register_meter',register_meter),
    url(r'^get-excel-file',getExcelFile),
    url(r'^getMeterType',getMeterType),
    url(r'^getCompanyInfo',getCompanyInfo),
    url(r'^getUserFeedback',getUserFeedback),
    url(r'^getIdentifyMeter',getIndentificationMeter),
    url(r'^selectPanel',selectPanel),
    url(r'^addOutputDiff',addOutputDiff),
    url(r'^outputDiffChart', outputDiffChart),
    url(r'^meterDataChart',meterDataChart),
    url(r'^modifyOutputDiff',modifyOutputDiff),
    url(r'^retrieveNodeNum',retrieveNodeNum),
    url(r'^getWarnInfo', getWarnInfo),
    url(r'^changeCompanyIntro',changeCompanyIntro),
    url(r'^AddUserFeedback',AddUserFeedback),
    url(r'^addIndentificationMeter',addIndentificationMeter),
    url(r'^getIndUser',getIndUser),
    url(r'^getIndMeter',getIndMeter),
    url(r'^getIndComp',getIndComp),
    url(r'^getDeviationVal',getDeviationVal),
    url(r'^retrieveIndustryOutput',retrieveIndustryOutput),
    url(r'^getCurrentUser',retrieveCurUser),
    url(r'^getDistrict',getDistrict),
    url(r'^getAnalyse',getAnalyse),
    url(r'^changeValve',changeValve),
    url(r'^changeArtworkMeter',changeArtworkMeter),
    url(r'^getMeterArtworkInfo',getMeterArtworkInfo),
    url(r'^getFilterArtworkInfo',getFilterArtworkInfo),
    url(r'^changeFilterArtworkInfo',changeFilterArtworkInfo),
    url(r'^getValve',getValve),
    url(r'^getGasCollection',getGasCollection),
    url(r'^getDayDataChart',getDayDataChart),
    url(r'^getUserList', getUserList),
    url(r'^getDataCollection', getDataCollection),
    url(r'^wechatLogin', wechatLogin),
)
