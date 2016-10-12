var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var ScreenEdit = function (){

};

Implements(ScreenEdit, IView);

ScreenEdit.prototype = {
    getName: function(){
        return 'screenEditComponent';
    },
    getDefinition: function(){
        return {
            controller: 'screenEditController',
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/screen/screenEdit.html'
        };        
    },
    getDirective : function() {
        return '<screen-edit-component></screen-edit-component>';
    }
};

module.exports = ScreenEdit;