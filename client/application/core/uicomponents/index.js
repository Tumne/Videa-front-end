var SpinnerDirective = require('core/uicomponents/spinner/spinner');
var ObjectEditorDirective = require('core/uicomponents/editor/objectEditor/ObjectEditor');
var ComplexModelEditorDirective = require('core/uicomponents/editor/complexModelEditor/ComplexModelEditor');
var ComplexModelTabEditorDirective = require('core/uicomponents/editor/complexModelTabEditor/ComplexModelTabEditor');
var ComplexModelListEditorDirective = require('core/uicomponents/editor/complexModelListEditor/ComplexModelListEditor');
var ComplexModelAccordionEditorDirective = require('core/uicomponents/editor/complexModelAccordionEditor/ComplexModelAccordionEditor');
var DynamicHtmlDirective = require('core/uicomponents/dynamichtml/DynamicHtml');
var PluginComponentDirective = require('core/uicomponents/plugincomponent/PluginComponent');
var HasOneObjectEditorDirective = require('core/uicomponents/editor/hasOneObjectEditor/HasOneObjectEditor');

var HasManyEditorDirective = require('core/uicomponents/editor/hasManyEditor/HasManyEditor');
var EditTitleDirective = require('core/uicomponents/editTitle/EditTitle');
var JsonEditDirective = require('core/uicomponents/editor/jsonEditor/JsonEdit');
var HasManyStringEditorDirective = require('core/uicomponents/editor/hasManyStringEditor/HasManyStringEditor');
var HasManyObjectEditorDirective = require('core/uicomponents/editor/hasManyObjectEditor/HasManyObjectEditor');
var BaseTableComponentDirective = require('core/uicomponents/tableComponent/baseTableComponent/BaseTableComponent');

var EnterKeypressDirective = require('core/uicomponents/enterKeypress/EnterKeypress');
var SpinnerService = require('core/uicomponents/spinner/SpinnerService');
var CreateHasManyModalController = require('core/uicomponents/editor/hasManyEditor/modal/CreateHasManyModalController');
var CreateHasManyStringModalController = require('core/uicomponents/editor/hasManyStringEditor/modal/CreateHasManyStringModalController');
var GenericDisplayView = require('core/uicomponents/editor/genericDisplayView/GenericDisplayView');

var complexModelTabEditorDirective = new ComplexModelTabEditorDirective();
var complexModelListEditorDirective = new ComplexModelListEditorDirective(); 
var complexModelAccordionEditorDirective = new ComplexModelAccordionEditorDirective(); 
var hasManyEditorDirective = new HasManyEditorDirective();
var jsonEdit = new JsonEditDirective();
var baseTableComponentDirective = new BaseTableComponentDirective();
var genericDisplayView = new GenericDisplayView();
var hasOneObjectEditorDirective = new HasOneObjectEditorDirective();

module.exports = angular.module('core.components', []).run(function(){
    
})
.service('spinnerService', ['$rootScope', '$q', SpinnerService])
.controller('createHasManyModalController',['$uibModalInstance', 'customModalOption', '$controller', 'modelFactory', 'modelOperation', '$q', CreateHasManyModalController])
.controller('createHasManyStringModalController',['$uibModalInstance', 'customModalOption', '$controller', CreateHasManyStringModalController])
.directive('pluginComponent', [PluginComponentDirective])
.directive('dynamichtml', ['$compile', DynamicHtmlDirective])
.directive('objectEditor', [ObjectEditorDirective])
.directive('editTitle', [EditTitleDirective])
.directive('hasManyStringEditor', [HasManyStringEditorDirective])
.directive('hasManyObjectEditor', [HasManyObjectEditorDirective])
.directive(jsonEdit.getName(), [function(){ return jsonEdit.getDefinition()}])
.directive('enterKeypress', [EnterKeypressDirective])
.directive('spinner', [SpinnerDirective])
.directive('complexModelEditor', [ComplexModelEditorDirective])
.directive('hasOneObjectEditor', [HasOneObjectEditorDirective])
.directive('complexModelTabEditor', [function(){ return complexModelTabEditorDirective.render()}])
.directive('complexModelListEditor', [function(){ return complexModelListEditorDirective.render()}])
.directive('hasManyEditor', [function(){ return hasManyEditorDirective.render()}])
.directive('complexModelAccordionEditor', [function(){ return complexModelAccordionEditorDirective.render()}])
.directive('baseTableComponent', [function() {return baseTableComponentDirective.render()}])
.directive(genericDisplayView.getName(), [function(){ return genericDisplayView.getDefinition()}]);
