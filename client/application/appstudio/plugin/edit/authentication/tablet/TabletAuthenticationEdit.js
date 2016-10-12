
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var TabletAuthenticationEdit = function (){

};

Implements(TabletAuthenticationEdit, IView);

TabletAuthenticationEdit.prototype = {
    getName: function(){
        return 'tabletAuthenticationEditComponent';
    },
    getDefinition: function(){
        return {
            controller: 'authenticationPluginController',
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/authentication/authenticationTemplate.html'
        };        
    },
    getDirective : function() {
        return '<tablet-authentication-edit-component></tablet-authentication-edit-component>';
    }    
};

module.exports = TabletAuthenticationEdit;