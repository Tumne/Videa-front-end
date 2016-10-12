
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var LabelPreview = function (){

};

Implements(LabelPreview, IView);

LabelPreview.prototype = {
    getName: function(){
        return 'labelPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/label.svg', 'Label')
        };      
    },
    getDirective : function() {
        return '<label-preview-component></label-preview-component>';
    }
};

module.exports = LabelPreview;