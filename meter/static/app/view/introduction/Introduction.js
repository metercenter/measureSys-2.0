Ext.define('app.view.introduction.Introduction', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.introduction',

  requires: ['app.controller.introduction.Introduction',
             'app.store.introduction.IntroductionStore'
             ],
  controller: 'introduction',
     
    id: 'introPanel',
    
  viewModel: {
      data: {
        content: 'some content',
        title: '公司服务项目',
        contract: 'xxx',
        tel: '12345678900',
        addr: '南京xxx路'
      }
  },

  bind: {
    html: '<div class="introductionShow"><h2>{title}</h2><p>{content}</p><p><h5>联系电话：{tel}</h5></p><p><h5>传真：{contract}</h5></p><p><h5>微信公众号：{addr}</h5></p></div>'
  },

//  tbar : [{
//    text: 'Change content',
//    listeners:{
//      click: 'onChangeContentClick'
//    }
//  }]
//  store: Ext.create('store.introductionStore',{
//    listeners:{
//      load: 'onChangeContentClick'
//    }
//  })
   initComponent: function(){
     var me = this;
     var store = Ext.create('store.introductionStore');
     Ext.apply(this, {
       store: store
     });
     store.load({
       callback:function(r,options,success){
         if(success){
           me.getViewModel().set('content',r[0].data['content']);
           me.getViewModel().set('title',r[0].data['title'])
           me.getViewModel().set('contract',r[0].data['contract']);
           me.getViewModel().set('addr',r[0].data['addr']);
           me.getViewModel().set('tel',r[0].data['tel']);
        }
       }
     });
       
     this.callParent(arguments);
   }

});