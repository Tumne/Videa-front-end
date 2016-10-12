var BlankModalController = function ($modalInstance, customModalOption) {
    var self = this;
    this._$modalInstance = $modalInstance;
    this.modalOptions = customModalOption;
    this.errorMessage = '';
    this.errorMapping = {
        'DuplicatedItemIdError': 'Sorry that %s already exist.',
        'InternalServerError': 'Something went wrong on the Server',
        'ItemNotFoundError': 'Sorry %s cannot be found'
    };
};


BlankModalController.prototype.replacePlaceholder = function(str, replaceText) {
    return str.replace('%s', replaceText);
};

BlankModalController.prototype.formValid = function() {
    return true;
};

module.exports = BlankModalController;
