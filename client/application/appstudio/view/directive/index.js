var AppCardDirective = require('appstudio/view/directive/appCard/AppCard');
var AppConfigurationEditor = require('appstudio/view/directive/appConfigurationEditor/AppConfigurationEditor');
var BrandListViewDirective = require('appstudio/view/directive/brandListView/BrandListView');
var MediaGalleryTableComponent = require('appstudio/view/directive/mediaGalleryTableComponent/MediaGalleryTableComponent');
var PropertyTabViewerController = require('appstudio/view/directive/propertytabview/PropertyTabViewerController');
var PropertyTabViewerDirective = require('appstudio/view/directive/propertytabview/PropertyTabViewer');
var PropertyViewerController = require('appstudio/view/directive/propertyViewer/PropertyViewerController');
var PropertyViewerDirective = require('appstudio/view/directive/propertyViewer/PropertyViewer');
var ScreensEditorController = require('appstudio/view/directive/screensEditor/ScreensEditorController');
var ScreensEditorDirective = require('appstudio/view/directive/screensEditor/ScreensEditor');
var UIConfigurationEditor = require('appstudio/view/directive/uiConfigurationEditor/UIConfigurationEditor');
var VersionsViewController = require('appstudio/view/directive/versionsView/VersionsViewController');
var VersionsViewDirective = require('appstudio/view/directive/versionsView/VersionsView');
var AssetImageDirective = require('appstudio/view/directive/assetImage/AssetImage');

var appConfigurationEditor = new AppConfigurationEditor();
var uiConfigurationEditor = new UIConfigurationEditor();
var mediaGalleryTableComponent = new MediaGalleryTableComponent();

angular.module('appstudio.components', []).run(function(){
    
})

.controller('propertyTabViewerController', ['$scope', 'modelFactory', '$q', 'modelOperation', 'viewRegistry', PropertyTabViewerController])
.controller('propertyViewerController', ['$scope', 'screenService', PropertyViewerController])
.controller('screensEditorController', ['$scope', 'modelFactory', 'modelOperation', 'screenService', 'blankModalService', 'confirmationModalService', 'toastService', ScreensEditorController])
.controller('versionsViewController', ['$log', 'appService','uiConfigurationService', 'blankModalService', 'confirmationModalService', 'modelFactory', 'spinnerService','$scope', '$state', 'toastService', VersionsViewController])


.directive('appCard', ['modelFactory', AppCardDirective])
.directive('assetImage', [ AssetImageDirective])
.directive('appConfigurationEditor', [function(){ return appConfigurationEditor.render()}])
.directive('brandListView', [BrandListViewDirective])
.directive('mediaGalleryTableComponent', [function(){ return mediaGalleryTableComponent.render()}])
.directive('propertyTabViewer', [PropertyTabViewerDirective])
.directive('propertyViewer', [PropertyViewerDirective])
.directive('screensEditor', [ScreensEditorDirective])
.directive('uiConfigurationEditor', [function(){ return uiConfigurationEditor.render()}])
.directive('versionsView', [VersionsViewDirective]);
