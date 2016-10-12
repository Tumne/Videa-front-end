var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var CollectionViewPreview = function (){

};

Implements(CollectionViewPreview, IView);

CollectionViewPreview.prototype = {
    getName: function(){
        return 'collectionViewPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/collections-view.svg', 'Collection View')
        };      
    },
    getDirective : function() {
        return '<collection-view-preview-component></collection-view-preview-component>';
    }
};
module.exports = CollectionViewPreview;