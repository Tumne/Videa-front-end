var EditAppController = function ($modalInstance, customModalOption, $controller) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));

    this.form = {
        appModel: this.modalOptions.app,
        brandId: this.modalOptions.brand.getId()
    };

};

EditAppController.prototype.close = function(){
    this.modalOptions.close();
};

EditAppController.prototype.submit = function(){
    this.modalOptions.ok(this.form);
};

module.exports = EditAppController;