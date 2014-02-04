Ext.define('Overrides.ux.desktop.App', {
    override: 'Ext.ux.desktop.App',
    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Ext.ux.desktop.Settings'
    ],
    textSettings: 'Settings',
    textLogout: 'Logout',
    wallpaperStretch: true,
    wallpaperDefault: 'resources/images/wallpapers/sky.jpg',
    user: 'Admin',
    iconClsUser: 'user',
    iconClsSettings: 'settings',
    iconClsLogout: 'logout',
    startButtonText: 'Start',
    titleLogout: 'Logout',
    msgLogout: 'Are you sure you want to logout?',
    iconShortCutDefault: 'grid-shortcut',
    iconDefault: 'icon-grid',
    modules: [],
    modulesMenu: [],
    iconsDesktop: [],
    quickStart: [],
    initModules: [{
        module: 'cliente',
        text: 'Clientes',
        iconCls: 'user',
        createShortCut: true
    },{
        module: 'produto',
        text: 'Produtos',
        createQuickStart: true
    }],

    init: function() {
        var me = this,
            desktopCfg;
            
        me.buildModules();
            
        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        desktopCfg = me.getDesktopConfig();
        me.desktop = Ext.widget('desktop', desktopCfg);

        me.viewport = Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items : [me.desktop]
        });

        Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);

        me.isReady = true;
        me.fireEvent('ready', me);
    },

    buildModules: function(){
        var me = this,
            objModule;
        
        Ext.each(me.initModules, function(item) {
            objModule = Ext.clone(Ext.widget(item.module + 'module', {
                app: me,
                module: item.module,
                titleModule: item.text,
                iconModule: item.iconCls || me.iconDefault
            }));

            me.modules.push(objModule);

            me.modulesMenu.push({
                text   : item.text,
                iconCls: item.iconCls || me.iconDefault,
                handler: Ext.bind(me.createWindow, me, [objModule])
            });

            if(item.createShortCut) {
                me.iconsDesktop.push({
                    name   : item.text,
                    iconCls: item.iconClsShortCut || me.iconShortCutDefault,
                    module : objModule.id
                });
            }

            if(item.createQuickStart) {
                me.quickStart.push({
                    name   : item.text,
                    iconCls: item.iconCls || me.iconDefault,
                    module : objModule.id
                });
            }
        }, me);
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {

            contextMenuItems: [{ 
                text   : me.textSettings,
                handler: me.onSettings,
                scope  : me
            }],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data : me.iconsDesktop
            }),

            wallpaper: me.wallpaperDefault,
            wallpaperStretch: me.wallpaperStretch
        });
    },

    getStartConfig : function() {
        var me = this;

        return {
            app: me,
            menu: me.modulesMenu,
            title: me.user,
            iconCls: me.iconClsUser,
            height: 300,
            toolConfig: {
                width : 125,
                items : [{
                    text   : me.textSettings,
                    iconCls: me.iconClsSettings,
                    scope  : me,
                    handler: me.onSettings
                },'-',{
                    text   : me.textLogout,
                    iconCls: me.iconClsLogout,
                    scope  : me,
                    handler: me.onLogout
                }]
            }
        };
    },

    getTaskbarConfig: function () {
        var me = this,
            ret = me.callParent();

        return Ext.apply(ret, {
            startBtnText : me.startButtonText,
            quickStart   : me.quickStart,
            trayItems    : [{
                xtype: 'trayclock',
                flex : 1
            }]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm(this.titleLogout, this.msgLogout);
    },

    onSettings: function () {
        Ext.create('Ext.ux.desktop.Settings', {
            desktop: this.desktop
        }).show();
    }
});