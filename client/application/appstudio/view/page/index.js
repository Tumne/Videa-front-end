var AppStudioController = require('appstudio/view/page/appStudio/AppStudioController');

var MediaGalleryViewController = require('appstudio/view/page/mediaGalleryView/MediaGalleryViewController');

var BrandViewController = require('appstudio/view/page/brandView/BrandViewController');

var AppConfigurationViewController = require('appstudio/view/page/appConfigurationView/AppConfigurationViewController');

var UIConfigurationViewController = require('appstudio/view/page/uiConfigurationView/UIConfigurationViewController');

angular.module('appstudio.pages', []).run(function(){
    
})
.controller('appStudioController', ['account', 'brandDataService', 'appService', 'appTypeService', 'uiConfigurationService', 'blankModalService','confirmationModalService', '$scope', AppStudioController])
.controller('mediaGalleryViewController',['blankModalService', 'confirmationModalService','$scope', '$state', 'mediaGalleryService', 'spinnerService', MediaGalleryViewController])
.controller('brandViewController', ['account', 'brandDataService', 'appService', 'appTypeService', 'uiConfigurationService', 'blankModalService','confirmationModalService', '$scope', '$state', 'spinnerService', 'modelFactory', BrandViewController])
.controller('appConfigurationViewController', ['$scope', '$state', '$log', 'appService', 'toastService', AppConfigurationViewController])
.controller('uiConfigurationViewController', ['$scope', '$state', '$log', 'uiConfigurationService', 'toastService','confirmationModalService', 'modelFactory', 'modelOperation', 'screenService', UIConfigurationViewController]);
