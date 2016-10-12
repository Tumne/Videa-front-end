var EditBrandController = function ($modalInstance, customModalOption, $controller) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));

    this.form = {
        image: null,
        brandName: this.modalOptions.brand.getName(),
        brandId: this.modalOptions.brand.getId()
    };
    this.errorMapping = {};
    this.errorMapping.InternalServerError = 'Sorry your image is not JPG or PNG.';
    this.errorMapping.ItemNotFoundError = 'Sorry, something went wrong saving your Brand. Please refresh the page.';
};

EditBrandController.prototype.close = function(){
    this.modalOptions.close();
};

EditBrandController.prototype.submit = function(){
    this.modalOptions.ok(this.form);
};
module.exports = EditBrandController;
