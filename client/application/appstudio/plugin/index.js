var GenericView = require('appstudio/plugin/GenericView');
var GenericScreenIdView = require('appstudio/plugin/GenericScreenIdView');
var GenericComplexModelView = require('appstudio/plugin/GenericComplexModelView');

 require('appstudio/plugin/edit');
 require('appstudio/plugin/preview');
 require('appstudio/plugin/view');
 require('appstudio/plugin/create');

var genericView = new GenericView();
var genericScreenIdView = new GenericScreenIdView();
var genericComplexModelView = new GenericComplexModelView();

angular.module('appstudio.plugins', [
     'appstudio.plugin.view',
     'appstudio.plugin.edit',
     'appstudio.plugin.preview',
     'appstudio.plugin.create'
]).run(function(){
    
})
.directive(genericView.getName(), [function(){ return genericView.getDefinition()}])
.directive(genericScreenIdView.getName(), [function(){ return genericScreenIdView.getDefinition()}])
.directive(genericComplexModelView.getName(), [function(){ return genericComplexModelView.getDefinition()}]);
