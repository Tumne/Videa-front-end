
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/appType/previewTemplate.html');
var PreviewAppTypeController = require('appstudio/plugin/preview/appType/PreviewAppTypeController');
var MobilePreview = function (){

};

Implements(MobilePreview, IView);

MobilePreview.prototype = {
    getName: function(){
        return 'mobilePreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$rootScope', '$scope', PreviewAppTypeController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/device_phone.png', 'Phone')
        };      
    },
    getDirective : function() {
        return '<mobile-preview-component></mobile-preview-component>';
    }
};

module.exports = MobilePreview;