var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');

var AssetsEdit = function (){

};

Implements(AssetsEdit, IView);

AssetsEdit.prototype = {
    getName: function(){
        return 'assetsEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', 'mediaGalleryService', function($scope, modelOperation, mediaGalleryService){
                this._scope = $scope;
                var vm = this;

                this._scope = $scope;
                this.ready = false;
                this.purpose = Purpose;
                this.options = this._scope.options;
                this.galleryAssets = [];
                this._mediaGalleryService = mediaGalleryService;

                this.accountId = this._scope.options.account;
                this.brandId = this._scope.options.brand;

                this.hasOneAssociations = this._scope.model.getHasOneAssociations();
                

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    this.init();
                }.bind(this));
                
                this.retrieveHasOneModel = function(getter) {
                    return this._scope.model[getter]();
                };

                this.getHasOneFieldName = function(hasOneField) {
                    return this._scope.model.getAssociationTitle(hasOneField);
                };

				//TODO: Change location of the mediaGallery assets
                this.init = function () {
                    var vm = this;
					
                    this._mediaGalleryService.getAllGalleryAssetsAsMap(this.accountId, this.brandId).then(function (assets) {
                        vm.options.galleryAssets = vm.galleryAssets.concat(assets.values());
                        vm.options.galleryAssetsMap = assets;
                        vm.ready = true;
                    }, function (error) {
                        vm._logger.error("ThemeViewController: init(): Error getting assets", error);
                    });

                };

            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/assets/assetsEdit.html'
        };
    },
    getDirective : function() {
        return '<assets-edit-component></assets-edit-component>';
    }
};

module.exports = AssetsEdit;
