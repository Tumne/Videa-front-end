
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var SwimLanePreview = function (){

};

Implements(SwimLanePreview, IView);

SwimLanePreview.prototype = {
    getName: function(){
        return 'swimlanePreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/swimlane.svg', 'Swim Lane')
        };
    },
    getDirective : function() {
        return '<swimlane-preview-component></swimlane-preview-component>';
    }
};

module.exports = SwimLanePreview;