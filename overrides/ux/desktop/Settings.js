Ext.define('Overrides.ux.desktop.Settings', {
    override: 'Ext.ux.desktop.Settings',
    rootWallpapers: 'resources/images/wallpapers/',

    onSelect: function (tree, record) {
        var me = this;

        me.selected = record.data.img ? me.rootWallpapers + record.data.img : Ext.BLANK_IMAGE_URL;
        me.preview.setWallpaper(me.selected);
    }
});