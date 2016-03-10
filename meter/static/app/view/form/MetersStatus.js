Ext.define('app.view.form.MetersStatus', {
	extend : 'Ext.form.Panel',
	alias : 'widget.metersStatus',

	title : '设备运行状况(自检)',

	bodyStyle : {
		padding : '10px'
	},
	id : 'meterStatus',
	items : [ {
		xtype : 'fieldset',

		defaultType : 'textfield',

		padding : '10px',

		layout : 'column',

		defaults : {
			layout : 'form',
			anchor : '100%',
			xtype : 'container',
			defaultType : 'textfield',
			style : 'width: 33%'
		},

		items : [ {
			items : [ {
				fieldLabel : '接入点总数',
				name : 'all_node_num'
			} ]
		}, {
			items : [ {
				fieldLabel : '正常上报数',
				name : 'valid_node_num'
			} ]
		}, {
			items : [ {
				fieldLabel : '通讯异常数',
				value : '0'
			} ]
		} ]
	} ]

})