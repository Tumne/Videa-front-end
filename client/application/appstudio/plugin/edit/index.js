var AuthenticationPluginController = require('appstudio/plugin/edit/authentication/AuthenticationPluginController');
var ThemeEditController = require('appstudio/plugin/edit/theme/ThemeEditController');
var ScreenEditController = require('appstudio/plugin/edit/screen/ScreenEditController');

var FontEdit = require('appstudio/plugin/edit/font/FontEdit');
var FeedEdit = require('appstudio/plugin/edit/feed/FeedEdit');
var ColorCardEdit = require('appstudio/plugin/edit/colorCard/ColorCardEdit');
var ColorFieldEdit = require('appstudio/plugin/edit/colorField/ColorFieldEdit');
var ColorFontEdit = require('appstudio/plugin/edit/colorFont/ColorFontEdit');

var AppNavigationEditor = require('appstudio/plugin/edit/appNavigation/view/AppNavigationEditor');

var MobileAuthenticationEdit = require('appstudio/plugin/edit/authentication/mobile/MobileAuthenticationEdit');
var TabletAuthenticationEdit = require('appstudio/plugin/edit/authentication/tablet/TabletAuthenticationEdit');
var TvAuthenticationEdit = require('appstudio/plugin/edit/authentication/tv/TvAuthenticationEdit');

var AdsEdit = require('appstudio/plugin/edit/ads/AdsEdit');

var ThemeEdit = require('appstudio/plugin/edit/theme/ThemeEdit');
var ScreenEdit = require('appstudio/plugin/edit/screen/ScreenEdit');


var AssetsEdit = require('appstudio/plugin/edit/theme/assets/AssetsEdit');
var ColorGalleryImage = require('appstudio/plugin/edit/theme/assets/colorGalleryImage/ColorGalleryImage');
var GalleryImage = require('appstudio/plugin/edit/theme/assets/galleryImage/GalleryImage');

var ColorsEdit = require('appstudio/plugin/edit/theme/colors/ColorsEdit');
var FontsEdit = require('appstudio/plugin/edit/theme/fonts/FontsEdit');
var ThemeFontEdit = require('appstudio/plugin/edit/theme/fonts/themeFont/ThemeFontEdit');

var BundleEdit = require('appstudio/plugin/edit/bundle/BundleEdit');
var ComponentControlEdit = require('appstudio/plugin/edit/componentControl/ComponentControlEdit');
var ListenerEdit = require('appstudio/plugin/edit/listener/ListenerEdit');
var UISettingsEdit = require('appstudio/plugin/edit/uiSettings/UISettingsEdit');
var SearchSettingsEdit = require('appstudio/plugin/edit/searchSettings/SearchSettingsEdit');
var DataViewDataEdit = require('appstudio/plugin/edit/gridViewData/DataViewDataEdit');
var SecondaryMenuEdit = require('appstudio/plugin/edit/secondaryMenu/SecondaryMenuEdit');

var AdvanceScreenEdit = require('appstudio/plugin/edit/screen/advance/AdvanceScreenEdit');

var fontEdit = new FontEdit();
var feedEdit = new FeedEdit();
var colorCardEdit = new ColorCardEdit();
var colorFieldEdit = new ColorFieldEdit();
var colorFontEdit = new ColorFontEdit();

var appNavigationEditor = new AppNavigationEditor();

var mobileAuthenticationEdit = new MobileAuthenticationEdit();
var tabletAuthenticationEdit = new TabletAuthenticationEdit();
var tvAuthenticationEdit = new TvAuthenticationEdit();

var themeEdit = new ThemeEdit();
var screenEdit = new ScreenEdit();


var assetsEdit = new AssetsEdit();
var colorGalleryImage = new ColorGalleryImage();
var galleryImage = new GalleryImage();

var colorsEdit = new ColorsEdit();
var fontsEdit = new FontsEdit();
var themeFontEdit = new ThemeFontEdit();

var bundleEdit = new BundleEdit();
var componentControlEdit = new ComponentControlEdit();
var listenerEdit = new ListenerEdit();
var adsEdit = new AdsEdit();
var uISettingsEdit = new UISettingsEdit();
var searchSettingsEdit = new SearchSettingsEdit();
var dataViewDataEdit = new DataViewDataEdit();
var secondaryMenuEdit = new SecondaryMenuEdit();
var advanceScreenEdit = new AdvanceScreenEdit();

angular.module('appstudio.plugin.edit', []).run(function(){
    
})
.controller('authenticationPluginController', ['$scope', 'modelFactory', '$q', AuthenticationPluginController])
.controller('themeEditController', ['$scope', 'modelOperation', ThemeEditController])
.controller('screenEditController', ['$scope', 'blankModalService', 'modelFactory', 'screenService', 'toastService', ScreenEditController])
.directive(fontEdit.getName(), [function(){ return fontEdit.getDefinition()}])
.directive(feedEdit.getName(), [function(){ return feedEdit.getDefinition()}])
.directive(colorCardEdit.getName(), [function(){ return colorCardEdit.getDefinition()}])
.directive(colorFieldEdit.getName(), [function(){ return colorFieldEdit.getDefinition()}])
.directive(colorFontEdit.getName(), [function(){ return colorFontEdit.getDefinition()}])
.directive(appNavigationEditor.getName(), [function(){ return appNavigationEditor.getDefinition()}])
.directive(mobileAuthenticationEdit.getName(), [function(){ return mobileAuthenticationEdit.getDefinition()}])
.directive(tabletAuthenticationEdit.getName(), [function(){ return tabletAuthenticationEdit.getDefinition()}])
.directive(tvAuthenticationEdit.getName(), [function(){ return tvAuthenticationEdit.getDefinition()}])
.directive(themeEdit.getName(), [function(){ return themeEdit.getDefinition()}])
.directive(screenEdit.getName(), [function(){ return screenEdit.getDefinition()}])
.directive(assetsEdit.getName(), [function(){ return assetsEdit.getDefinition()}])
.directive(colorGalleryImage.getName(), [function(){ return colorGalleryImage.getDefinition()}])
.directive(galleryImage.getName(), [function(){ return galleryImage.getDefinition()}])
.directive(colorsEdit.getName(), [function(){ return colorsEdit.getDefinition()}])
.directive(fontsEdit.getName(), [function(){ return fontsEdit.getDefinition()}])
.directive(themeFontEdit.getName(), [function(){ return themeFontEdit.getDefinition()}])
.directive(componentControlEdit.getName(), [function(){ return componentControlEdit.getDefinition()}])
.directive(listenerEdit.getName(), [function(){ return listenerEdit.getDefinition()}])
.directive(adsEdit.getName(), [function(){ return adsEdit.getDefinition()}])
.directive(uISettingsEdit.getName(), [function(){ return uISettingsEdit.getDefinition()}])
.directive(searchSettingsEdit.getName(), [function(){ return searchSettingsEdit.getDefinition()}])
.directive(dataViewDataEdit.getName(), [function(){ return dataViewDataEdit.getDefinition()}])
.directive(secondaryMenuEdit.getName(), [function(){ return secondaryMenuEdit.getDefinition()}])
.directive(advanceScreenEdit.getName(), [function(){ return advanceScreenEdit.getDefinition()}])
.directive(bundleEdit.getName(), [function(){ return bundleEdit.getDefinition()}]);
