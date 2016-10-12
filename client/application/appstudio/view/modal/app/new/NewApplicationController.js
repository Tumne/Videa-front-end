var ModelTypes = require('appstudio/plugin/PluginModelType');
var Purpose = require('core/plugin/Purpose');

var NewApplicationController = function ($modalInstance, customModalOption, $controller, modelFactory, modelOperation) {
    angular.extend(this, $controller('blankModalController', {
        $uibModalInstance: $modalInstance,
        customModalOption: customModalOption
    }));
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this._appTypeSchemas = Object.keys(ModelTypes.PREVIEW.APPTYPE);
    this._appTypes = [];
    this.purpose = Purpose;
    this.appTypes = this.modalOptions.appTypes;
    this.form = {
        name: '',
        appType: false
    };
    this.ready = false;
    this.app = null;
    var self = this;
    
    self._modelFactory.create(ModelTypes.CREATE.APP).then(
        function(schema) {
            self.app = schema;
            self.ready = true;
        }, function(err){
            console.log('Cannot find App Schema', err);
        }
    );
};

NewApplicationController.prototype.close = function(){
    this.modalOptions.onCancel();
};

NewApplicationController.prototype.submit = function(){
    this.modalOptions.onSubmit(this.form);
};

module.exports = NewApplicationController;