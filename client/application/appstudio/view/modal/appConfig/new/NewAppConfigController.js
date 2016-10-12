var Digi = require('core/Digi');
var ModalController = require('core/modal/AbstractModalController');
var ModelTypes = require('appstudio/plugin/PluginModelType');
var Purpose = require('core/plugin/Purpose');

var NewAppConfigController = function ($modalInstance, customModalOption, modelFactory, modelOperation) {
    NewAppConfigController.super_.apply(this, [$modalInstance, customModalOption]);
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this.modalOptions = customModalOption;
    this.ready = false;
    this.version = null;
    this.purpose = Purpose;
    this.$modalInstance = $modalInstance;
    
    var self = this;

    this._modelFactory.create(this.modalOptions.schema[0]['$ref']).then(
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
Digi.inherits(NewAppConfigController, ModalController);

NewAppConfigController.prototype = {
    close: function () {
        this.modalOptions.onCancel();
    },
    submit: function () {
        this.modalOptions.onSubmit(this.form);
    }
};

module.exports = NewAppConfigController;