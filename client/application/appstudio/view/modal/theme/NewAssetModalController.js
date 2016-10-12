var NewAssetModalController = function ($modalInstance, customModalOption, $controller) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));

    this.form = {
        image: null
    };

    this.errorMapping = {};
    this.errorMapping.InternalServerError = 'Sorry your image is not JPG or PNG.';
    this.errorMapping.ItemNotFoundError = 'Sorry, something went wrong saving your Brand. Please refresh the page.';
};

NewAssetModalController.prototype.submit = function(asset){
    this.modalOptions.onSubmit(asset);
};

NewAssetModalController.prototype.close = function(){
    this.modalOptions.onClose();
};

module.exports = NewAssetModalController;