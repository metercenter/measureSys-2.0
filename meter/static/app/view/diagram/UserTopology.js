Ext.define('app.view.diagram.UserTopology',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.drawPic',
	requires: 	[
					'app.controller.diagram.UserTopology',
					'app.view.window.Filter',
					'app.view.window.Meter'
				],
	controller: 'userTopology',
	layout: 'fit',
  title:'工艺流程及设备信息',
//    width: 400,
//    height: 400,
    useQuickTips: true,
    padding: '10 10',
    resizable: true,
    id: 'drawpic',

	  items: [{
        xtype: 'draw',
        padding: '10 10',
        items: [{
            type: "path",
            path: "M67.7116,149.476 Z",
            stroke:"#323232"
            ////fill:"#969696"
        }, {
            type: "path",
            path: "M153.789,99.1958 L134.521,106.303 L134.521,92.0884 L153.789,99.1958 Z",
            stroke:"#323232"
            //fill:"#969696"
        },
        {
            type: "path",
            path: "M153.789,99.1958 L134.521,106.303 L134.521,92.0884 L153.789,99.1958 Z",
            stroke:"#323232",
            fill:"#969696"
        },
        {
            type: "path",
            path: "M153.791,98.9967 L173.202,92.289 L172.908,106.501 L153.791,98.9967 Z",
            stroke:"#323232",
            fill:"#969696",
            cursor:'pointer',
            useQuickTips: true,
            tipAttrs: {qtip:'过滤器'},
            listeners: {
	            click: {
		            element: 'el', //bind to the underlying el property on the panel
		            fn: function(){ 
		            	var filterForm = Ext.create('app.view.window.Filter');
		            	filterForm.show();
		            }//console.log(this)}
            	},
            	mouseover: {
            		element: 'el',
            		fn:function(){
            			// alert('wohao');
            			this.fill = "#ffffff";
            			this.surface.renderAll();
            			// console.log(Ext.getCmp('drawpic'));
            			// Ext.getCmp('drawpic').items[0].show();
            		}
            	},
            	mouseout: {
 					element: 'el',
            		fn:function(me,e){
            			// alert('wohao');
            			this.fill = "#00000";
            			this.surface.renderAll();
            			// console.log(e);

            			// console.log(Ext.getCmp('drawpic'));
            			// Ext.getCmp('drawpic').items[0].show();
            		}
            	}

        	}
        },
        {
            type: "path",
            path: "M310.076,100.824 L290.808,107.931 L290.808,93.7163 L310.076,100.824 Z",
            stroke:"#323232",
            fill:"#969696",
            cursor:'pointer'
        },
        {
            type: "path",
            path: "M310.078,100.625 L329.489,93.9168 L329.195,108.129 L310.078,100.625 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696"
        },
        {
            type: "path",
            path: "M153.789,147.85 L134.521,154.957 L134.521,140.743 L153.789,147.85 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696"
        },
        {
            type: "path",
            path: "M153.791,147.651 L173.202,140.943 L172.908,155.155 L153.791,147.651 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696"
        },
        {
            type: "path",
            path: "M310.076,149.478 L290.808,156.585 L290.808,142.371 L310.076,149.478 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696"
        },
        {
            type: "path",
            path: "M310.078,149.279 L329.489,142.571 L329.195,156.783 L310.078,149.279 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696"
        },
         {
            type: "path",
            path: "M205.885,90.9889 L258.694,90.9889 L258.694,108.83 L205.885,108.83 L205.885,90.9889 Z",
            stroke:"#323232",
            fill:"#969696",
            cursor:'pointer',
            listeners: {
              click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){ 
                  var filterForm = Ext.create('app.view.window.Meter');
                  filterForm.show();
                }//console.log(this)}
              },
            }
        },
        {
            type: "path",
            path: "M206.598,138.93 L259.408,138.93 L259.408,156.771 L206.598,156.771 L206.598,138.93 Z",
            stroke:"#323232",
            cursor:'pointer',
            fill:"#969696",
              listeners: {
                click: {
                  element: 'el', //bind to the underlying el property on the panel
                  fn: function(){ 
                    var filterForm = Ext.create('app.view.window.Meter');
                    filterForm.show();
                  }//console.log(this)}
                },
              }
        },
        {
            type: "path",
            path: "M68.5856,147.366 C68.5856,147.366 350.04,149.507 350.04,149.507 C350.04,149.507 350.04,100.98 350.04,100.98 C350.04,100.98 67.7116,98.8389 67.7116,98.8389 C67.7116,98.8389 68.5856,147.366 68.5856,147.366 Z",
            stroke:"#323232"
//            fill:"#969696"
        },
        {
            type: "path",
            path: "M376.444,123.816 C350.04,123.816 350.04,123.816 350.04,123.816 ",
            stroke:"#323232"
            // fill:"#969696"
        },
        {
            type: "path",
            path: "M85.9934,87.719 C85.9934,81.0916 91.366,75.719 97.9934,75.719 L98.9708,75.719 C105.598,75.719 110.971,81.0916 110.971,87.719 L110.971,100.828 C110.971,107.456 105.598,112.828 98.9708,112.828 L97.9934,112.828 C91.366,112.828 85.9934,107.456 85.9934,100.828 L85.9934,87.719 Z",
            stroke:"#323232",
            fill:"#969696",
            cursor:'pointer',
            useQuickTips: true,
            tipAttrs: {qtip:'过滤器'},
            listeners: {
              click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){ 
                  var filterForm = Ext.create('app.view.window.Filter');
                  filterForm.show();
                }//console.log(this)}
              }
            }
        },
        {
            type: "path",
            path: "M85.9934,75.0054 L110.971,75.0054 L110.971,98.5555 L85.9934,98.5555 L85.9934,75.0054 Z",
            stroke:"#323232",
            fill:"#969696"
        },
         {
            type: "path",
            path: "M67.7116,123.816 C41.3069,123.816 41.3069,123.816 41.3069,123.816 ",
            stroke:"#323232",
            fill:"#969696"
        },
        {
            type: "path",
            path: "M85.9934,136.887 C85.9934,130.259 91.366,124.887 97.9934,124.887 L98.9708,124.887 C105.598,124.887 110.971,130.259 110.971,136.887 L110.971,149.996 C110.971,156.623 105.598,161.996 98.9708,161.996 L97.9934,161.996 C91.366,161.996 85.9934,156.623 85.9934,149.996 L85.9934,136.887 Z",
            stroke:"#323232",
            fill:"#969696"
        },
        {
            type: "path",
            path: "M85.9934,124.173 L110.971,124.173 L110.971,147.723 L85.9934,147.723 L85.9934,124.173 Z",
            stroke:"#323232",
            fill:"#969696"
        }]

    }]
});