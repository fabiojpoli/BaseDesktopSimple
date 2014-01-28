Ext.define('Overrides.ux.desktop.Module' ,{
    override: 'Ext.ux.desktop.Module',
    requires: ['Ext.layout.container.Border'],
    width: 1000,
    height: 520,
    border: true,
    iconModule: 'icon-grid',
    titleDetails: 'Details',
    
    init: function(){
        var me = this;
        
        me.titleList = 'List of ' + me.titleModule;
        
        me.id = me.alias[0].replace('widget.', '');
        
        if(me.createMenu) {
	        me.launcher = {
	            text   : me.titleModule,
	            iconCls: me.iconModule,
	            handler: me.createWindow,
	            scope  : me
	        };
        }
    },

    createWindow: function(){
        var me = this,
        	desktop = me.app.getDesktop(),
        	items;
        
        me.win = desktop.getWindow(me.id);

        if(!me.win){
            items = [{
                region: 'center',
                flex  : 2,
                title : me.titleList,
                xtype: me.module + 'list'
            },{
                region     : 'east',
                flex       : 1,
                title      : me.titleDetails,
                collapsed  : true,
                collapsible: true,
                split: true,
                xtype: me.module + 'form'
            }];

            me.win = desktop.createWindow({
                id             : me.id,
                title          : me.titleModule,
                width          : me.width,
                height         : me.height,
                iconCls        : me.iconModule,
                animCollapse   : false,
                constrainHeader: true,
                layout		   : 'border',
                border         : me.border,
                defaults	   : {
                	border: false,
	            	split : me.splitLayout
                },
                items		   : items
            });
        }
        
        me.win.show();
        return me.win;
    }
});