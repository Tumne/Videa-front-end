
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var GridViewPreview = function (){

};

Implements(GridViewPreview, IView);

GridViewPreview.prototype = {
    getName: function(){
        return 'gridViewPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/grid view.svg', 'Grid View')
        };      
    },
    getDirective : function() {
        return '<grid-view-preview-component></grid-view-preview-component>';
    }
};
module.exports = GridViewPreview;