Ext.define('app.view.dataChart.DataChart', {
	extend: 'Ext.Panel',
	xtype: 'line-basic',
	alias: 'widget.dataChart',

	requires: [
	             'app.store.chart.OutputChartStore'
	           ],
    id: 'dataChartPanel',

    bodyStyle: 'background: transparent !important',
    layout: 'fit',
    height: '200',
    initComponent: function() {
        var me = this;

        this.myDataStore =  Ext.create('store.outputChartStore');

        me.items = [{
            xtype: 'chart',
            id: 'dataChart',
            width: '100%',
            height: 200,
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
                text  : '月度输差曲线',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }, {
                type: 'text',
                text: '2012年统计数据',
                font: '10px Helvetica',
                x: 12,
                y: 380
            }, {
                type: 'text',
                text: '数据来源: http://www.kingsungas.com.cn/',
                font: '10px Helvetica',
                x: 12,
                y: 390
            }],
            axes: [{
                type: 'Numeric',
//                fields: 'data1',
                fields: 'output_diff',
                position: 'left',
                grid: true,
//                minimum: -100,
                
                label: {
                    renderer: function(v) { return v + ' (Nm3)'; }
                }
            }, {
                type: 'Category',
//                fields: 'month',
                fields:'output_date',
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
//                xField: 'month',
                xField:'output_date',
//                yField: 'data1',
                yField: 'output_diff',
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
//                        this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                      this.setTitle(storeItem.get('output_date') + ': ' + storeItem.get('output_diff') + ' (Nm3)');
                    }
                }
            }]
        }];

        this.callParent();
    }
});