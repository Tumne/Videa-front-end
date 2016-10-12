
var Digi = require('core/Digi');

var ModalController = require('core/modal/AbstractModalController');

var UploadModalController = function ($modalInstance, customModalOption) {
    UploadModalController.super_.apply(this, [$modalInstance, customModalOption]);

    this.customModalOptions = customModalOption;

};

Digi.inherits(UploadModalController, ModalController);

UploadModalController.prototype.submitModal = function(){
    this.customModalOptions.onSubmit(this.customModalOptions.form);
};


UploadModalController.prototype.close = function(){
    this.customModalOptions.onCancel();
};

module.exports = UploadModalController;