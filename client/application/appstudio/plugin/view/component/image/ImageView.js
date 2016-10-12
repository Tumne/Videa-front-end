
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var ImageView = function (){

};

Implements(ImageView, IView);

ImageView.prototype = {
    getName: function(){
        return 'imageViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('image-component', 'Image')
        };        
    },
    getDirective : function() {
        return '<image-view-component></image-view-component>';
    }
};

module.exports = ImageView;