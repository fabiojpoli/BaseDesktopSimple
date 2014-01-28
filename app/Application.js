Ext.define('BaseDesktopSimple.Application', {
    name: 'BaseDesktopSimple',

    requires: [
    	'Ext.ux.Alert',
    	'Overrides.*'
    ],

    extend: 'Ext.app.Application',

    controllers: [
        'Cliente',
        'Produto'
    ]
});
