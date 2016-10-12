
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var CarouselView = function (){

};

Implements(CarouselView, IView);

CarouselView.prototype = {
    getName: function(){
        return 'carouselViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('carousel-component', 'Carousel')
        };        
    },
    getDirective : function() {
        return '<carousel-view-component></carousel-view-component>';
    }
};

module.exports = CarouselView;