var NavigationTypeView = require('appstudio/plugin/view/navigationType/NavigationTypeView');
var CarouselView = require('appstudio/plugin/view/component/carousel/CarouselView');
var GridViewView = require('appstudio/plugin/view/component/gridview/GridViewView');
var ImageView = require('appstudio/plugin/view/component/image/ImageView');
var LabelView = require('appstudio/plugin/view/component/label/LabelView');
var ListViewView = require('appstudio/plugin/view/component/listview/ListViewView');
var SwimlaneView = require('appstudio/plugin/view/component/swimlane/SwimlaneView');
var CollectionView = require('appstudio/plugin/view/component/collectionView/CollectionView');

var VersionView = require('appstudio/plugin/view/version/VersionView');
var BundleView = require('appstudio/plugin/view/bundle/BundleView');

var AppCardMobileVersionView = require('appstudio/plugin/view/version/appCardVersion/mobile/AppCardMobileVersionView');
var AppCardMobileBundleView = require('appstudio/plugin/view/bundle/appCardBundle/mobile/AppCardMobileBundleView');
var AppCardTabletVersionView = require('appstudio/plugin/view/version/appCardVersion/tablet/AppCardTabletVersionView');
var AppCardTabletBundleView = require('appstudio/plugin/view/bundle/appCardBundle/tablet/AppCardTabletBundleView');
var AppCardTVVersionView = require('appstudio/plugin/view/version/appCardVersion/tv/AppCardTVVersionView');
var AppCardTVBundleView = require('appstudio/plugin/view/bundle/appCardBundle/tv/AppCardTVBundleView');

var navigationTypeView = new NavigationTypeView();
var swimlaneView = new SwimlaneView();
var listViewView = new ListViewView();
var labelView = new LabelView();
var imageView = new ImageView();
var gridViewView = new GridViewView();
var carouselView = new CarouselView();
var versionView = new VersionView();
var bundleView = new BundleView();
var collectionView = new CollectionView();
var appCardMobileVersionView = new AppCardMobileVersionView();
var appCardMobileBundleView = new AppCardMobileBundleView();
var appCardTabletVersionView = new AppCardTabletVersionView();
var appCardTabletBundleView = new AppCardTabletBundleView();
var appCardTVVersionView = new AppCardTVVersionView();
var appCardTVBundleView = new AppCardTVBundleView();

angular.module('appstudio.plugin.view', []).run(function(){
    
})
.directive(navigationTypeView.getName(), [function(){ return navigationTypeView.getDefinition()}])
.directive(swimlaneView.getName(), [function(){ return swimlaneView.getDefinition()}])
.directive(listViewView.getName(), [function(){ return listViewView.getDefinition()}])
.directive(carouselView.getName(), [function(){ return carouselView.getDefinition()}])
.directive(gridViewView.getName(), [function(){ return gridViewView.getDefinition()}])
.directive(imageView.getName(), [function(){ return imageView.getDefinition()}])
.directive(labelView.getName(), [function(){ return labelView.getDefinition()}])
.directive(versionView.getName(), [function(){ return versionView.getDefinition()}])
.directive(bundleView.getName(), [function(){ return bundleView.getDefinition()}])
.directive(collectionView.getName(), [function(){ return collectionView.getDefinition()}])
.directive(appCardMobileVersionView.getName(), [function(){ return appCardMobileVersionView.getDefinition()}])
.directive(appCardMobileBundleView.getName(), [function(){ return appCardMobileBundleView.getDefinition()}])
.directive(appCardTabletVersionView.getName(), [function(){ return appCardTabletVersionView.getDefinition()}])
.directive(appCardTabletBundleView.getName(), [function(){ return appCardTabletBundleView.getDefinition()}])
.directive(appCardTVVersionView.getName(), [function(){ return appCardTVVersionView.getDefinition()}])
.directive(appCardTVBundleView.getName(), [function(){ return appCardTVBundleView.getDefinition()}]);
