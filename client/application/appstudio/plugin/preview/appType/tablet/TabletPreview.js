
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/appType/previewTemplate.html');
var PreviewAppTypeController = require('appstudio/plugin/preview/appType/PreviewAppTypeController');
var TabletPreview = function (){

};

Implements(TabletPreview, IView);

TabletPreview.prototype = {
    getName: function(){
        return 'tabletPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$rootScope', '$scope', PreviewAppTypeController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/device_tablet.png', 'Tablet')
        };      
    },
    getDirective : function() {
        return '<tablet-preview-component></tablet-preview-component>';
    }
};

module.exports = TabletPreview;