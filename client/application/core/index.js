var Digi = require('core/Digi');
var HttpService = require('core/http/HttpService');
var ViewRegistry = require('core/plugin/ViewRegistry');

var BaseService = require('core/service/BaseService');
var HttpService = require('core/http/HttpService');
var HttpUploadService = require('core/http/HttpUploadService');

var AbstractModalController = require('core/modal/AbstractModalController');
var BlankModalController = require('core/modal/BlankModalController');
var ConfirmationModalService = require('core/modal/ConfirmationModalService');
var BlankModalService = require('core/modal/BlankModalService');

var SchemaService = require('core/schema/SchemaService');
var CapitalizeFilter = require('core/filter/capitalize/Capitalize');
var IdFilter = require('core/filter/idFilter/IdFilter');

var ModelFactory = require('core/data/ModelFactory');
var ModelOperation = require('core/data/ModelOperation');

require('core/utility/StringFunction');
require('core/uicomponents');

angular.module('core', [
    'core.components'
])
.service('httpService', ['$http', '$q', HttpService])
.service('viewRegistry', [ViewRegistry])
.service('baseService', ['$http', '$q', BaseService])
.service('httpService', ['$http', '$q', HttpService])
.service('httpUploadService', ['$http', '$q', 'Upload', HttpUploadService])
.service('schemaService', ['$q', 'httpService', SchemaService])
.service('confirmationModalService', ['$uibModal', ConfirmationModalService])
.service('blankModalService', ['$uibModal', BlankModalService])
.controller('modalController', ['$uibModalInstance', 'customModalOption', AbstractModalController])
.controller('blankModalController', ['$uibModalInstance', 'customModalOption', BlankModalController])
.filter('capitalize', [CapitalizeFilter])
.filter('idfilter', [IdFilter])
.service('modelFactory', ['schemaService', '$q', ModelFactory])
.service('modelOperation', ['$q', 'modelFactory', ModelOperation])
.run(function(){
    
});