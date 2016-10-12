
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/preview/component/previewTemplate.html');
var PreviewController = require('appstudio/plugin/preview/component/PreviewController');
var CarouselPreview = function (){

};

Implements(CarouselPreview, IView);

CarouselPreview.prototype = {
    getName: function(){
        return 'carouselPreviewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$rootScope', 'confirmationModalService', PreviewController],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('/images/carousel.svg', 'Carousel')
        };      
    },
    getDirective : function() {
        return '<carousel-preview-component></carousel-preview-component>';
    }
};

module.exports = CarouselPreview;