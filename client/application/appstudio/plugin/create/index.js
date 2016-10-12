var AppCreate = require('appstudio/plugin/create/app/AppCreate');
var appCreate = new AppCreate();

var VersionCreate = require('appstudio/plugin/create/version/VersionCreate');
var versionCreate = new VersionCreate();

var BundleCreate = require('appstudio/plugin/create/bundle/BundleCreate');
var bundleCreate = new BundleCreate();

var ListenerCreate = require('appstudio/plugin/create/listener/ListenerCreate');
var listenerCreate = new ListenerCreate();

angular.module('appstudio.plugin.create', []).run(function(){
    
})
.directive(appCreate.getName(), [function(){ return appCreate.getDefinition()}])
.directive(versionCreate.getName(), [function(){ return versionCreate.getDefinition()}])
.directive(listenerCreate.getName(), [function(){ return listenerCreate.getDefinition()}])
.directive(bundleCreate.getName(), [function(){ return bundleCreate.getDefinition()}]);