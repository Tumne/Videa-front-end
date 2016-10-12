var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var ThemeEdit = function (){

};

Implements(ThemeEdit, IView);

ThemeEdit.prototype = {
    getName: function(){
        return 'themeEditComponent';
    },
    getDefinition: function(){
        return {
            controller: 'themeEditController',
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/themeEdit.html'
        };        
    },
    getDirective : function() {
        return '<theme-edit-component></theme-edit-component>';
    }
};

module.exports = ThemeEdit;