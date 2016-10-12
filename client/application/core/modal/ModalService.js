
var ModalService = function ($uibModal) {
    this.$uibModal = $uibModal;
    this.modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'app/appstudio/core/modal/modal.html',
        size: 'sm'
    };

    this.modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };
};

ModalService.prototype.showModal = function (customModalDefaults, customModalOptions) {
    if (!customModalDefaults) {
        customModalDefaults = {};
    }
    customModalDefaults.backdrop = 'static';
    return this.show(customModalDefaults, customModalOptions);
};

ModalService.prototype.show = function (customModalDefaults, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var tempModalDefaults = {};
    var tempModalOptions = {};

    //Map angular-ui modal custom defaults to modal defaults defined in service
    angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);

    //Map modal.html $scope custom properties to defaults defined in service
    angular.extend(tempModalOptions, this.modalOptions, customModalOptions);

    if (tempModalDefaults.controller != undefined){
        tempModalDefaults.controller = tempModalDefaults.controller + ' as vm';
    } else {
        tempModalDefaults.controller = 'modalController as vm';
    }

    tempModalDefaults.resolve = {
        customModalOption: function() {
            return tempModalOptions;
        }
    };
    return this.$uibModal.open(tempModalDefaults).result;
};

//Temp function
ModalService.prototype.openModal = function (customModalDefaults, customModalOptions) {

    if (!customModalDefaults) {
        customModalDefaults = {};
    }

    //Create temp objects to work with since we're in a singleton service
    var tempModalDefaults = {};
    var tempModalOptions = {};

    //Map angular-ui modal custom defaults to modal defaults defined in service
    angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);

    //Map modal.html $scope custom properties to defaults defined in service
    angular.extend(tempModalOptions, this.modalOptions, customModalOptions);

    if (tempModalDefaults.controller != undefined){
        tempModalDefaults.controller = tempModalDefaults.controller + ' as vm';
    } else {
        tempModalDefaults.controller = 'modalController as vm';
    }

    tempModalDefaults.resolve = {
        customModalOption: function() {
            return tempModalOptions;
        }
    };
    return this.$uibModal.open(tempModalDefaults);
};


module.exports = ModalService;