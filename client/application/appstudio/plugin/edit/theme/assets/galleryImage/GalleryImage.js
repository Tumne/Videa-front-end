var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');
var Digi = require('core/Digi');

var GalleryImage = function (){

};

Implements(GalleryImage, IView);

GalleryImage.prototype = {
    getName: function(){
        return 'galleryImageComponent';
    },
    getDefinition: function(){
        return {
            // controller: 'galleryImageController',
            controller: ['$scope', 'modelOperation', 'blankModalService', 'mediaGalleryService', function($scope, modelOperation, blankModalService, mediaGalleryService){
                this._scope = $scope;
                this.purpose = Purpose;
                this.ready = false;
                var vm = this;
                
                //Services
                this._blankModalService = blankModalService;
                this._mediaGalleryService = mediaGalleryService;

                //View Data
                this.accountId = this._scope.options.accountId;
                this.brandId = this._scope.options.brand;
                this.galleryAssets = this._scope.options.galleryAssets;
                this.galleryAssetsMap = this._scope.options.galleryAssetsMap;
                this.currentAsset = null;
                this.currentAssetType = null;

                this.imageUrl = '/images/Placeholder_v2.png';


                this.init = function() {
                    if(this._scope.model.getFieldValue('galleryImageId')){
                        this.galleryImageId = this._scope.model.getFieldValue('galleryImageId');
                        vm.imageUrl = this.galleryAssetsMap.get(this.galleryImageId).getFieldValue('url');
                    }
                };

                this.init();
                this.pickImage = function() {

                    var editAppModalOptions = {
                        includeText: 'appstudio/view/modal/theme/newAssetModal.html',
                        headerText: 'Pick Image',
                        showFooter: false,
                        onSubmit: this.setAssetImage.bind(this),
                        onClose: this.dismissModal.bind(this),
                        galleryAssets: this.galleryAssets
                    };
                    var editAppModalSettings = {
                        controller: 'newAssetModalController',
                        size: 'md'
                    };

                    this._modalInstance = this._blankModalService.showModal(editAppModalSettings, editAppModalOptions);

                };

                this.dismissModal = function () {
                    this._modalInstance.dismiss('cancel');
                };

                this.setAssetImage = function(selectedGalleryAsset) {

					var assetId = '',
						assetUrl = '/images/Placeholder_v2.png';

					if(Digi.isDefined(selectedGalleryAsset)) {
						assetId = selectedGalleryAsset.id;
						assetUrl = selectedGalleryAsset.getFieldValue('url');
					}
					
                    this._scope.model.setFieldValue('galleryImageId', assetId);
                    this.imageUrl = assetUrl;
                    this._modalInstance.close();
                };


            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/assets/galleryImage/galleryImage.html'
        };
    },
    getDirective : function() {
        return '<gallery-image-component></gallery-image-component>';
    }
};

module.exports = GalleryImage;
