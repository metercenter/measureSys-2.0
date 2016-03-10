Ext.define('app.model.introduction.IntroductionModel',{
  extend:'Ext.data.Model',
  alias:'model.introductionModel',
  
  fields: [
           {name: 'title'},
           {name: 'content'},
           {name: 'contract'},
           {name: 'tel'},
           {name: 'addr'}
          ]
});