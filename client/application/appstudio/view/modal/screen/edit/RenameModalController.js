
var Digi = require('core/Digi');

var ModalController = require('core/modal/AbstractModalController');

var RenameModalController = function ($modalInstance, customModalOption) {
    RenameModalController.super_.apply(this, [$modalInstance, customModalOption]);

    this.customModalOptions = customModalOption;

};

Digi.inherits(RenameModalController, ModalController);

RenameModalController.prototype.submitModal = function(){
    this.customModalOptions.onSubmit(this.customModalOptions.form);
};


RenameModalController.prototype.close = function(){
    this.customModalOptions.onCancel();
};

module.exports = RenameModalController;