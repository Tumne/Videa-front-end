var Digi = require('core/Digi');
var ModalController = require('core/modal/AbstractModalController');
var ModelTypes = require('appstudio/plugin/PluginModelType');
var Purpose = require('core/plugin/Purpose');

var NewBundleController = function ($modalInstance, customModalOption, modelFactory, modelOperation) {
    NewBundleController.super_.apply(this, [$modalInstance, customModalOption]);
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this.modalOptions = customModalOption;
    this.ready = false;
    this.version = null;
    this.purpose = Purpose;
    this.$modalInstance = $modalInstance;
    this.versions = this.modalOptions.versions;
    var self = this;

    this._modelFactory.create(this.modalOptions.schema[1]['$ref']).then(
        function(schema) {
            self._modelOperation.populateHasOne(schema).then(function(fullSchema){
            self.version = fullSchema;
            self.ready = true;
            });
        }, function(err){
            console.log('Cannot find UI Config Schema', err);
        }
    );
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