var Purpose = require('core/plugin/Purpose');

var ScreenEditController = function($scope, blankModalService, modelFactory, screenService, toastService) {
    this._scope = $scope;
    this._modalService = blankModalService;
    this._modelFactory = modelFactory;
    this._screenService = screenService;
    this._toastService = toastService;
    this.ready = true;
    this.purpose = Purpose;

    this.options = this._scope.options;
    this.accountId = this.options.account;
    this.uiConfigId = this.options.uiConfigId;
    this.appId = this.options.appId;
    this.brandId = this.options.brand;

    this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate', 'onClickNavigation'];

    this.phone = true;
    this.deviceSelected = this.options.deviceSelected;
    this.screenChosen = this._scope.model;
    this.selectedComponentIndex = null;
    this.componentChosen = this._scope.model;

    this._scope.$watch('model', function (newValue) {
         if (newValue !== undefined) {
            this.screenChosen = newValue;
            this.componentChosen = newValue;
         }
    }.bind(this), false);

    this._scope.$watch('options.deviceSelected', function (newValue) {
     if (newValue !== undefined) {
        this.deviceSelected  = newValue;
     }
    }.bind(this), false);
    
    this._scope.$on('select-component',
        function (event, args) {
            this.componentChosen = null;
            this.selectedComponentIndex = args.selectedIndex;
            this.componentChosen = this.screenChosen.getItems()[this.selectedComponentIndex];
            this.deviceSelected = false;
        }.bind(this)
    );

    this._scope.$on('remove-component',
        function (event, args) {
            this.screenChosen.removeItem(args.selectedIndex);
            var componentsArray = this.screenChosen.getItems();
            this.componentChosen = (componentsArray.length > 0) ? componentsArray[componentsArray.length - 1] : this._scope.model;
            this.selectLastComponent();
        }.bind(this)
    );

    this._scope.$on('reorder-component',
        function (event, args) {
            var length = this.screenChosen.getItems().length,
                component;
            if (args.afterIndex >= length){
                return false;
            }
            this.componentChosen = null;
            this.deviceSelected = false;
            component = this.screenChosen.getItems()[args.beforeIndex];
            this.screenChosen.reorderItem(args.beforeIndex, args.afterIndex);
        }.bind(this)
    );

    this._scope.$on('select-no-component',
        function (event, args) {
            this.componentChosen = args.newComponent;
            this.selectedComponentIndex = null;
            // this.componentChosen = this.screenChosen.getItems()[this.selectedComponentIndex];
            this.deviceSelected = false;
            this._scope.$broadcast('unselect-all-component');
        }.bind(this)
    );

};

ScreenEditController.prototype.addComponent = function() {
    if (!this.screenChosen) {
        return false;
    }

    this._modalInstance = this._modalService.showModal({
        controller: 'addComponentController'
    }, {
        includeText: 'appstudio/view/modal/screen/new/addComponent.html',
        headerText: 'Add a Component',
        components: this.screenChosen.getHasManyTypes('item'),
        onSubmit: this.submitAddComponent.bind(this),
        onCancel: this.closeModal.bind(this)
    });

    this.openModal(function(componentAdded){});
};

ScreenEditController.prototype.submitAddComponent = function(componentSelected) {
    this._modelFactory.create(componentSelected).then(
        function(component) {
            this.screenChosen.addItem(component);
            var componentsArray = this.screenChosen.getItems();
            this.selectedComponentIndex = componentsArray.length - 1;
            this.componentChosen = componentsArray[this.selectedComponentIndex];
            this._modalInstance.close();
            this.selectLastComponent();

        }.bind(this),
        function(err) {
            console.log('err', err);
        }
    );
};


ScreenEditController.prototype.closeModal = function() {
    this._modalInstance.dismiss('cancel');
};

ScreenEditController.prototype.openModal = function(callback) {
    this._modalInstance.result.then(function (result) {
        callback(result);
    });
};

ScreenEditController.prototype.saveScreen = function() {
    this._screenService.updateScreen(this.accountId, this.uiConfigId, this.screenChosen).then(
        function (updatedScreen) {
            // this.screenChosen = updatedScreen;
            this._toastService.success('Screen Saved!');
            // this.componentChosen = this.screenChosen.getItems()[this.selectedComponentIndex];
            // this._scope.$emit('screen-refresh');
        }.bind(this)
    );
};

ScreenEditController.prototype.selectLastComponent = function() {
    setTimeout(function(){
        var result = document.getElementsByClassName('component');
        angular.element(result[result.length-1]).triggerHandler('click');
    }, 0);
};

module.exports = ScreenEditController;
