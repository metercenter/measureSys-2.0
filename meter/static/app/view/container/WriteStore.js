
    Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'email', 'first', 'last'],
    validators: {
        email: {
            type: 'length',
            min: 1
        },
        first: {
            type: 'length',
            min: 1
        },
        last: {
            type: 'length',
            min: 1
        }
    }
});

Ext.define('app.view.container.WriteStore', {
	    extend: 'Ext.data.Store',
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                read: 'app.php/users/view'
                // create: 'app.php/users/create',
                // update: 'app.php/users/update',
                // destroy: 'app.php/users/destroy'
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                rootProperty: 'data'
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: {
            write: function(proxy, operation){
                if (operation.action == 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
                Ext.example.msg(operation.action, operation.getResultSet().message);
            }
        }
    });
