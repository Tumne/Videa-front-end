var MobilePreview = require('appstudio/plugin/preview/appType/mobile/MobilePreview');
var TabletPreview = require('appstudio/plugin/preview/appType/tablet/TabletPreview');
var TVPreview = require('appstudio/plugin/preview/appType/tv/TVPreview');

var mobilePreview = new MobilePreview();
var tabletPreview = new TabletPreview();
var tvPreview = new TVPreview();
angular.module('appstudio.plugin.preview.apptype', []).run(function(){
    
})
.directive(mobilePreview.getName(), [function(){ return mobilePreview.getDefinition()}])
.directive(tabletPreview.getName(), [function(){ return tabletPreview.getDefinition()}])
.directive(tvPreview.getName(), [function(){ return tvPreview.getDefinition()}]);