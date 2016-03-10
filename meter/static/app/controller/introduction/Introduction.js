Ext.define('app.controller.introduction.Introduction', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.introduction',

  contentCount : 0,

  onChangeContentClick: function(){
//    this.getViewModel().set(data,{''}'content',  '本公司长期致力于各类流量计的开发设计', 'title','金昇公司', 'contract','宋争');
//    this.getViewModel().set(data,{'本公司长期致力于各类流量计的开发设计','金昇公司','宋争'});
    this.getViewModel().set('content','本公司长期致力于各类流量计的开发设计');
    this.getViewModel().set('title','服务对象')
    this.getViewModel().set('contract','宋争');
    this.getViewModel().set('addr','南京鼓楼区xxxx');
    this.getViewModel().set('tel','13687683456');
  }

});