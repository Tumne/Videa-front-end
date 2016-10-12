

var AbstractModalController = function ($modalInstance, customModalOption) {
    var self = this;
    this._$modalInstance = $modalInstance;
    this.modalOptions = customModalOption;
    this.errorMessage = '';
    this.errorMapping = {
        'DuplicatedItemIdError': 'Sorry that %s already exist.',
        'InternalServerError': 'Something went wrong on the Server',
        'ItemNotFoundError': 'Sorry %s cannot be found'
    };

    //cant be prototype
    this.modalOptions.ok = function () {
        self._$modalInstance.close(self.modalOptions);
    };
    this.modalOptions.close = function () {
        self._$modalInstance.dismiss('cancel');
    };

};


AbstractModalController.prototype.replacePlaceholder = function(str, replaceText) {
    return str.replace('%s', replaceText);
};

AbstractModalController.prototype.formValid = function() {
    return true;
};

module.exports = AbstractModalController;