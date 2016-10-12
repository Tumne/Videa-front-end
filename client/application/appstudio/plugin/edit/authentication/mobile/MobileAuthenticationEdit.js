
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var MobileAuthenticationEdit = function (){

};

Implements(MobileAuthenticationEdit, IView);

MobileAuthenticationEdit.prototype = {
    getName: function(){
        return 'mobileAuthenticationEditComponent';
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
        return '<mobile-authentication-edit-component></mobile-authentication-edit-component>';
    }    
};

module.exports = MobileAuthenticationEdit;