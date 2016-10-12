var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');
var Digi = require('core/Digi');

var ColorGalleryImage = function (){

};

Implements(ColorGalleryImage, IView);

ColorGalleryImage.prototype = {
    getName: function(){
        return 'colorGalleryImageComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation',  'blankModalService', 'mediaGalleryService', function($scope, modelOperation, blankModalService, mediaGalleryService){
                var vm = this;

                this._scope = $scope;
                this.ready = false;
                this.purpose = Purpose;

                this._blankModalService = blankModalService;
                this._mediaGalleryService = mediaGalleryService;

                //View Data
                this.accountId = this._scope.options.accountId;
                this.brandId = this._scope.options.brand;
                this.galleryAssets = this._scope.options.galleryAssets;
                this.galleryAssetsMap = this._scope.options.galleryAssetsMap;
                this.currentAsset = null;
                this.currentAssetType = null;
                this.backgroundImageSelected = true;
                this.backgroundImage = '/images/Placeholder_v2.png';
                

                this.init = function() {
                    var galleryImageId = this._scope.model.getFieldValue('galleryImageId');
                    if(galleryImageId){
                        this.backgroundImage = this.galleryAssetsMap.get(galleryImageId).getFieldValue('url');
                    } else {
                        var colorField = this._scope.model._color.getFieldValue('value');
                        if(colorField !== '' && typeof colorField !== "undefined"){
                            this.backgroundColor = colorField;
                            this.backgroundImageSelected = false;
                        }
                    }

                };

                $scope.$watch(function () {
                    return this.backgroundColor;
                }.bind(this), function (newVal, oldVal) {
                    if (newVal != this._scope.model._color.getFieldValue('value')){
                        // console.log(this._scope.model._color.getFieldValue('value'));
                        this._scope.model._color.setFieldValue('value', this.backgroundColor);
                    }
                }.bind(this));

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    this.init();
                    this.ready = true;
                }.bind(this));
                
                this.pickImage = function() {
                    this.backgroundImageSelected = true;

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

                this.showBackgroundColor = function() {
                    vm.backgroundImageSelected = false;
                    this._scope.model.setFieldValue('galleryImageId', undefined);
                    this.backgroundImage = '/images/Placeholder_v2.png';
                    console.log(this._scope.model);
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
                    this._scope.model._color.setFieldValue('value', undefined);
                    this.backgroundImage = assetUrl;
                    this.backgroundColor = '';
                    this._modalInstance.close();
                };



            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/assets/colorGalleryImage/colorGalleryImage.html'
        };
    },
    getDirective : function() {
        return '<color-gallery-image-component></color-gallery-image-component>';
    }
};

module.exports = ColorGalleryImage;
