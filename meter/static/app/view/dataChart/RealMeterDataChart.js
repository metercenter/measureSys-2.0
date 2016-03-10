Ext.define('app.view.dataChart.RealMeterDataChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'line-plot',
    alias: 'widget.realMeterDataChart',

    requires: [
               'app.store.chart.RealDataStore'
             ],
    id: 'realDataChartPanel',

    bodyStyle: 'background: transparent !important',
    layout: 'fit',
    height: '500',
    initComponent: function() {
        var me = this;

        this.myDataStore =  Ext.create('store.realDataStore');

        me.items = [{
            xtype: 'chart',
            width: '100%',
            marker: true,
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
                text: '偏差%',
                font  : '12px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 23  //the sprite y position
            },{
              type  : 'text',
              text: '流量m3/h',
              font  : '12px Helvetica',
              width : 100,
              height: 30,
              x : 420, //the sprite x position
              y : 220  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                fields: 'deviation_val',
                position: 'left',
                grid: {
                  odd: {
                      opacity: 1,
                      fill: '#ddd',
                      stroke: '#bbb',
                      lineWidth: 1
                  }
              },
              minimum: -1,
              maximum: 1,
              majorTickSteps: 1,
//              minorTickSteps: 0.1s,
              
              
                label: {
                    renderer: function(v) { return v + '%'; }
                }
            }, {
                type: 'Category',
                fields:'qmax_level',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: 0,
                    },
                    renderer: function(v) { 
                     if (typeof v === "undefined")
                       return '';
                     else 
                       return v*100+'%Qmax'; 
                      
                    }
                },
                titleMargin: 6,
                minorTickSteps: 3,
                style: {
                    minorTicks: true,
                    minorTickSize: 4,
                    majorTickSize: 7
                },
            }],
            series: [{
                type: 'line',
                axis: 'right',
                xField:'qmax_level',
                yField: 'deviation_val',
                style: {
                    'stroke-width': 2
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
                      this.setTitle(storeItem.get('deviation_val') +'%');
                    }
                }
            },{
              type: 'scatter',
              xField: 'single_qmax_level',
              yField: 'single_deviation_val',
              marker: {
                type: 'arrow',
                fillStyle: 'yellow',
                radius: 8
              },
              highlight: {
                  fillStyle: 'yellow',
                  radius: 7,
                  lineWidth: 2
              },
              tips: {
                trackMouse: true,
                style: 'background: #FFF',
                height: 20,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                  this.setTitle('实时工况瞬时流量');
                }
            }
            }
            ]
        }];

        this.callParent();
    }
});