
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var template = require('appstudio/plugin/view/component/viewTemplate.html');
var controller = require('appstudio/plugin/view/component/ViewController');
var ListViewView = function (){

};

Implements(ListViewView, IView);

ListViewView.prototype = {
    getName: function(){
        return 'listviewViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', controller],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: template('listview-component', 'List View')
        };        
    },
    getDirective : function() {
        return '<listview-view-component></listview-view-component>';
    }
};

module.exports = ListViewView;