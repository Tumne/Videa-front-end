
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var GridViewView = function (){

};

Implements(GridViewView, IView);

GridViewView.prototype = {
    getName: function(){
        return 'gridviewViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('gridview-component', 'Grid View')
        };        
    },
    getDirective : function() {
        return '<gridview-view-component></gridview-view-component>';
    }
};

module.exports = GridViewView;