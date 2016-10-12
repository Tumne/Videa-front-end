
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var TvAuthenticationEdit = function (){

};

Implements(TvAuthenticationEdit, IView);

TvAuthenticationEdit.prototype = {
    getName: function(){
        return 'tvAuthenticationEditComponent';
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
        return '<tv-authentication-edit-component></tv-authentication-edit-component>';
    }    
};

module.exports = TvAuthenticationEdit;