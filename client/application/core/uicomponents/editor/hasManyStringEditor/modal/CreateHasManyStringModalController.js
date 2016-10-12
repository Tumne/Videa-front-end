var CreateHasManyStringModalController = function ($modalInstance, 
                                             customModalOption, 
                                             $controller) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));

    this.title = this.modalOptions.title;
    this.field = '';
};

CreateHasManyStringModalController.prototype = {
    close: function () {
        this.modalOptions.onCancel();
    },
    submit: function () {
        this.modalOptions.onSubmit(this.field);
    }
};

module.exports = CreateHasManyStringModalController;