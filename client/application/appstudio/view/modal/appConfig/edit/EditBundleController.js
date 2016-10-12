var Digi = require('core/Digi');
var ModalController = require('core/modal/AbstractModalController');
var ModelTypes = require('appstudio/plugin/PluginModelType');
var Purpose = require('core/plugin/Purpose');

var NewBundleController = function ($modalInstance, customModalOption, modelFactory, modelOperation) {
    NewBundleController.super_.apply(this, [$modalInstance, customModalOption]);
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this.modalOptions = customModalOption;
    this.ready = true;
    this.version = this.modalOptions.bundle;
    this.purpose = Purpose;
    this.$modalInstance = $modalInstance;
    this.versions = this.modalOptions.versions;
    this.bundleVersions = this.modalOptions.bundleVersions;
};
Digi.inherits(NewBundleController, ModalController);


NewBundleController.prototype = {
    close: function () {
        this.modalOptions.onCancel();
    },
    submit: function () {
        this.modalOptions.onSubmit(this.form);
    }
};
module.exports = NewBundleController;