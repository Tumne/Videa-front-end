
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var ListViewPreview = function (){

};

Implements(ListViewPreview, IView);

ListViewPreview.prototype = {
    getName: function(){
        return 'listViewPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/list view.svg', 'List View')
        };
    },
    getDirective : function() {
        return '<list-view-preview-component></list-view-preview-component>';
    }
};

module.exports = ListViewPreview;