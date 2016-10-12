

var BlankModalService = function ($uibModal) {
    this.$uibModal = $uibModal;
    this._modalSetting = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'core/modal/blankModal.html',
        size: 'md'
    };
    this._modalOptions = {
        headerText: 'Default Header',
        showFooter: true
    };
};

BlankModalService.prototype.showModal = function (customModalDefaults, customModalOptions) {
    return this._show(customModalDefaults?customModalDefaults:{}, customModalOptions);
};

BlankModalService.prototype._show = function (customModalDefaults, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var modalDefaults = {},
        modalOptions = {},
        controller = modalDefaults.controller;

    //Map angular-ui modal custom defaults to modal defaults defined in service
    _.extend(
        modalDefaults,
        this._modalSetting,
        customModalDefaults);

    //Map modal.html $scope custom properties to defaults defined in service
    _.extend(
        modalOptions,
        this._modalOptions,
        customModalOptions);

    modalDefaults.controller = modalDefaults.controller + ' as vm';
    modalDefaults.resolve = {
        customModalOption: function() {
            return modalOptions;
        }
    };
    return  this.$uibModal.open(modalDefaults);
};


module.exports = BlankModalService;