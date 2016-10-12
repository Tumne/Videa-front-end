var CarouselPreview = require('appstudio/plugin/preview/component/carousel/CarouselPreview');
var GridViewPreview = require('appstudio/plugin/preview/component/gridView/GridViewPreview');
var ImagePreview = require('appstudio/plugin/preview/component/image/ImagePreview');
var LabelPreview = require('appstudio/plugin/preview/component/label/LabelPreview');
var ListViewPreview = require('appstudio/plugin/preview/component/listView/ListViewPreview');
var SwimLanePreview  = require('appstudio/plugin/preview/component/swimLane/SwimLanePreview');
var CollectionViewPreview  = require('appstudio/plugin/preview/component/collectionView/CollectionViewPreview');

var swimlanePreview = new SwimLanePreview();
var listViewPreview = new ListViewPreview();
var labelPreview = new LabelPreview();
var imagePreview = new ImagePreview();
var gridViewPreview = new GridViewPreview();
var carouselPreview = new CarouselPreview();
var collectionViewPreview = new CollectionViewPreview();

require('appstudio/plugin/preview/appType');
angular.module('appstudio.plugin.preview', [
    'appstudio.plugin.preview.apptype'
]).run(function(){
    
})
.directive(swimlanePreview.getName(), [function(){ return swimlanePreview.getDefinition()}])
.directive(listViewPreview.getName(), [function(){ return listViewPreview.getDefinition()}])
.directive(carouselPreview.getName(), [function(){ return carouselPreview.getDefinition()}])
.directive(gridViewPreview.getName(), [function(){ return gridViewPreview.getDefinition()}])
.directive(imagePreview.getName(), [function(){ return imagePreview.getDefinition()}])
.directive(labelPreview.getName(), [function(){ return labelPreview.getDefinition()}])
.directive(collectionViewPreview.getName(), [function(){ return collectionViewPreview.getDefinition()}]);