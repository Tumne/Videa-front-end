
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var SwimlaneView = function (){

};

Implements(SwimlaneView, IView);

SwimlaneView.prototype = {
    getName: function(){
        return 'swimlaneViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('swimlane-component', 'Swimlane')
        };        
    },
    getDirective : function() {
        return '<swimlane-view-component></swimlane-view-component>';
    }
};

module.exports = SwimlaneView;