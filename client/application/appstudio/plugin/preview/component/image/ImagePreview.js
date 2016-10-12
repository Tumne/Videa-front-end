
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var ImagePreview = function (){

};

Implements(ImagePreview, IView);

ImagePreview.prototype = {
    getName: function(){
        return 'imagePreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/image.svg', 'Image')
        };
    },
    getDirective : function() {
        return '<image-preview-component></image-preview-component>';
    }
};

module.exports = ImagePreview;