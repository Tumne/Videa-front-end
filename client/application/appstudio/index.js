var routes = require('appstudio/route');
var SetupPlugins = require('appstudio/SetupPlugins');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Digi = require('core/Digi');
require('appstudio/service');
require('appstudio/plugin');
require('appstudio/view/modal');
require('appstudio/view/directive');
require('appstudio/view/page');
angular.module('appstudio', [
	'ui.router',
    'appstudio.services',
    'appstudio.modals',
    'appstudio.pages',
    'appstudio.components',
    'appstudio.plugins'
]).run(['setupPlugins', 'schemaService', '$log', function(setupPlugins, schemaService, $log){
    // var schemas = Digi.Schema.flattenObject(PluginModelType);
    // schemaService.preloadSchemas(schemas);
    $log.info = function(){};
}])
.config(function ($stateProvider) {
    for(var i = 0; i < routes.length; i++){
         $stateProvider.state(routes[i].stateName, routes[i]);
    }    
})
.service('setupPlugins',['viewRegistry', SetupPlugins]);
