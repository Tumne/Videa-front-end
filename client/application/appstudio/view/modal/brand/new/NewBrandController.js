var NewBrandController = function ($modalInstance, customModalOption, $controller) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));

    this.form = {
      image: null,
      brandName: ''
    };

    this.errorMapping = {};
    this.errorMapping.InternalServerError = 'Sorry your image is not JPG or PNG.';
    this.errorMapping.ItemNotFoundError = 'Sorry, something went wrong saving your Brand. Please refresh the page.';
};

NewBrandController.prototype.submit = function(){
    this.modalOptions.onSubmit(this.form);
};


NewBrandController.prototype.close = function(){
  this.modalOptions.onCancel();
};

NewBrandController.prototype.test = function(){
  console.log("works!");
};


module.exports = NewBrandController;
