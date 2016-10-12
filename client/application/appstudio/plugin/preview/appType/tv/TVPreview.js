
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/appType/previewTemplate.html');
var PreviewAppTypeController = require('appstudio/plugin/preview/appType/PreviewAppTypeController');

var TVPreview = function (){

};

Implements(TVPreview, IView);

TVPreview.prototype = {
    getName: function(){
        return 'tvPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$rootScope', '$scope', PreviewAppTypeController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/device_tv.png', 'TV')
        };      
    },
    getDirective : function() {
        return '<tv-preview-component></tv-preview-component>';
    }
};

module.exports = TVPreview;