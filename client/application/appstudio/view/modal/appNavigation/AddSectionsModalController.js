
var Digi = require('core/Digi');

var ModalController = require('core/modal/AbstractModalController');

var AddSectionsModalController = function ($modalInstance, customModalOption) {
    AddSectionsModalController.super_.apply(this, [$modalInstance, customModalOption]);

    this.customModalOptions = customModalOption;
    this.selectedScreenId = this.customModalOptions.sectionModel.getFieldValue('screenId');
    this.options = customModalOption.options;
    //Get the selected screen and set the selected model.
    for (var i = 0; i < this.customModalOptions.screenModels.length; i++) {
        if (this.customModalOptions.screenModels[i].getFieldValue('id') == this.selectedScreenId) {
            this.selectedScreen = this.customModalOptions.screenModels[i];
        }
    }
};

Digi.inherits(AddSectionsModalController, ModalController);

AddSectionsModalController.prototype.updateComboBoxValue = function (selectedSection) {
    this.selectedScreenId = this.selectedScreen.getFieldValue("id");
};

AddSectionsModalController.prototype.submitModal = function () {
    this.customModalOptions.sectionModel.setFieldValue('screenId', this.selectedScreenId);
    this.customModalOptions.onSubmit(this.customModalOptions.sectionModel);
};

AddSectionsModalController.prototype.close = function () {
    this.customModalOptions.onCancel();
};

AddSectionsModalController.prototype.cancel = function () {
    this.customModalOptions.onCancel();
};

AddSectionsModalController.prototype.ok = function () {
    this.customModalOptions.onSubmit();
};

AddSectionsModalController.prototype.deleteSection = function () {
    this.customModalOptions.onDelete(this.customModalOptions.index, this.customModalOptions.sectionModel);
};

module.exports = AddSectionsModalController;