
var ConfirmationModalService = function ($uibModal) {
    this.$uibModal = $uibModal;
    this._modalSetting = {
        keyboard: true,
        modalFade: true,
        backdrop : 'static',
        templateUrl: 'core/modal/confirmationModal.html',
        size: 'md'
    };
    this._modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };
};

ConfirmationModalService.prototype.showModal = function (customModalSetting, customModalOptions) {
    return this._show(customModalSetting?customModalSetting:{}, customModalOptions);
};

ConfirmationModalService.prototype._show = function (customModalSetting, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var modalSetting = {},
        modalOptions = {},
        controller = modalSetting.controller;

    //Map angular-ui modal custom defaults to modal defaults defined in service
    _.extend(
        modalSetting,
        this._modalSetting,
        customModalSetting);

    //Map modal.html $scope custom properties to defaults defined in service
    _.extend(
        modalOptions,
        this._modalOptions,
        customModalOptions);

    modalSetting.controller = controller?(modalSetting.controller + ' as vm'):'modalController as vm';
    modalSetting.resolve = {
        customModalOption: function() {
            return modalOptions;
        }
    };
    return  this.$uibModal.open(modalSetting).result;
};


module.exports = ConfirmationModalService;