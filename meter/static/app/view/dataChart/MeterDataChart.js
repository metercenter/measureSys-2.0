Ext.define('app.view.dataChart.MeterDataChart',{
  extend:'Ext.Panel',
  alias: 'widget.meterDataChart',
  requires:[
              'app.store.chart.MeterDataChartStore'
           ],

  title:'用户用气曲线图',
  padding: '10 10',
  id : 'meterDataChart',
  bodyStyle: 'background: transparent !important',
  layout: {
      type: 'fit',
      pack: 'center'
  },
  autoScroll: true,
  themes: {
      classic: {
          percentChangeColumn: {
              width: 75
          }
      },
      neptune: {
          percentChangeColumn: {
              width: 100
          }
      }
  },
  
  initComponent: function() {
    var me = this;

    this.myDataStore = Ext.create('store.meterDataChartStore');

    //<example>
    me.dockedItems = [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
        {
            text: '保存图表',
            handler: function() {
                Ext.MessageBox.confirm('确认下载', '你确定要下载当前图表?', function(choice){
                    if(choice == 'yes'){
                        me.down('chart').save({
                            type: 'image/png'
                        });
                    }
                });

            }
        }]
    }];
    //</example>

    me.items = [{
        xtype: 'chart',
        width: '100%',
        height: 300,
        padding: '10 0 0 0',
        style: {
            'background' : '#fff'
        },
        animate: true,
        shadow: false,
        store: this.myDataStore,
        insetPadding: 40,
        items: [{
            type  : 'text',
            text  : '流量计标况统计',
            font  : '18px Helvetica',
            width : 100,
            height: 30,
            x : 40, //the sprite x position
            y : 12  //the sprite y position
//        }, {
//            type: 'text',
//            text: '2012年统计数据',
//            font: '10px Helvetica',
//            x: 12,
//            y: 380
//        }, {
//            type: 'text',
//            text: '数据来源: http://www.kingsungas.com.cn/',
//            font: '10px Helvetica',
//            x: 12,
//            y: 390
        }],
        axes: [{
            type: 'Numeric',
            fields: 'data_qb',
            position: 'left',
            grid: true,
            maximum: 2000,
            label: {
                renderer: function(v) { return v + ' (Nm3)' ; }
            }
        }, {
            type: 'Category',
            fields: 'data_date',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            axis: 'left',
            xField: 'data_date',
            yField: 'data_qb',
            style: {
                'stroke-width': 4
            },
            markerConfig: {
                radius: 4
            },
            highlight: {
                fill: '#000',
                radius: 5,
                'stroke-width': 2,
                stroke: '#fff'
            },
            tips: {
                trackMouse: true,
                style: 'background: #FFF',
                height: 20,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('data_date') + ': ' + storeItem.get('data_qb')+ 'Nm3');
                }
            }
        }]
    }];

    this.callParent();
}
});