
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var LabelView = function (){

};

Implements(LabelView, IView);

LabelView.prototype = {
    getName: function(){
        return 'labelViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('label-component', 'Label')
        };        
    },
    getDirective : function() {
        return '<label-view-component></label-view-component>';
    }
};

module.exports = LabelView;