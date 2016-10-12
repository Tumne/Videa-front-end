var ContentNodeModel = require('cms/model/ContentNode');
var ContentTypeModel = require('cms/model/ContentType');
var AssetModel = require('cms/model/AssetModel');

angular.module('cms.model', [])
.factory('Contenttype', ['$q', 'contentTypeService', ContentTypeModel])
.value('AssetModel', AssetModel)
.factory('Contentnode', ['$q', 'contentTypeService', 'Contenttype', ContentNodeModel]);