var VideaError = require('core/model/VideaError');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Purpose = require('core/plugin/Purpose');
var Digi = require('core/Digi');


var ScreensEditorController = function($scope,
                                      modelFactory,
                                      modelOperation,
                                      screenService,
                                      blankModalService,
                                      confirmationModalService,
                                      toastService){
    this._scope = $scope;
    this._modelFactory = modelFactory;
    this._modelOperation = modelOperation;
    this._screenService = screenService;
    this._modalService = blankModalService;
    this._confirmModalService = confirmationModalService;
    this._toastService = toastService;

    this.accountId = this.options.account;
    this.uiConfigId = this.options.uiConfigId;

    this.screens = [];
    this.screenChosen = null;
    this.screenTypes = this.model.getOneOfTypes('screen');
    this.purpose = Purpose;
    this.ready = false;
    this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
	this.selectFirstScreen = true;

	this.options.save = this.saveScreen.bind(this);
    
    this.getScreens();
    this.options.deviceSelected = false;
    this.registerEventHandlers();

    this.screenNames = null;

    this.sortable_option = {
      //Only allow draggable when click on handle element
      // handle:'handle',
      //Construct method before sortable code
      // construct:function(model){
      //   for ( var i = 0; i < model.length; i++ ){
      //     model[i].letter +=" (constructed)";
      //   }
      // },
      //Callback after item is dropped
      stop:function(list, dropped_index){
        this.screenSelectedIndex = dropped_index;

        this.screenNames = list;
        var screensArray = [];
        for(var x in this.screens){
            var elementPos = this.screens.map(function(x) {return x.id; }).indexOf(list[x].id);
            screensArray.push(this.screens[elementPos]);
        }

        this.screens = screensArray;
        this.saveReorderedScreens();
      }.bind(this)
    };
};

ScreensEditorController.prototype.getScreens = function () {
        this._screenService.getScreens(this.accountId,
                                       this.uiConfigId).then(
            function(screens) {
                this.screens = screens;
                this.screenNames = this.screens.map(function(obj){
                    var rObj = {};
                    rObj['id'] = obj.id;
                    rObj['value'] = obj._fields[4].value;
                    return rObj;
                });

                if (!this.screenChosen && this.screenNames.length > 0) {
                    var selectLastScreen = ((this.screenNames.length - 1) > -1)?(this.screenNames.length - 1):null;
                    if(this.selectFirstScreen && !this.options.initScreens){
                        this.selectScreen(0);
                        this.selectFirstScreen = false;
                    } else {
                        this.selectScreen(selectLastScreen);
                        this.options.initScreens = false;
                    }
                }
                this.ready = true;
            }.bind(this)
        );
};

ScreensEditorController.prototype.saveReorderedScreens = function() {
    var newScreens =  this.screenNames.map(function(obj){ return obj.id; });
    this._scope.$emit("uiConfig-reorder", newScreens);
};


ScreensEditorController.prototype.createBlankScreen = function() {
    var createScreenModalOptions = {
            includeText: 'appstudio/view/modal/screen/new/createScreen.html',
            headerText: 'Create New Screen',
            onSubmit: this.submitCreateScreen.bind(this),
            onCancel: this.closeModal.bind(this),
            screenTypes: this.screenTypes,
            showFooter: false
        };

    var createScreenModalSettings = {
        controller: 'createScreenController',
        size: 'md'
    };

    this._modalInstance = this._modalService.showModal(
        createScreenModalSettings,
        createScreenModalOptions
    );

    this.openModal(function(newScreen){});
};

ScreensEditorController.prototype.submitCreateScreen = function(form) {
    var screenService = this._screenService,
        accountId = this.accountId,
        uiConfigId = this.uiConfigId,
        selectLastScreen,
        vm = this;
    this._modelFactory.create(form.schema).then(
        function (originalScreen) {
            vm._modelOperation.populateHasOne(originalScreen).then(
                function(screen){
                    screen.setFieldValue('name', form.name);

                    screenService.createScreen(accountId, uiConfigId, screen).then(
                        function(newScreen) {
                            vm.screens.push(newScreen);
                            selectLastScreen = ((vm.screens.length - 1) > -1)?(vm.screens.length - 1):null;
                            vm.selectScreen(selectLastScreen);
                            vm._scope.$emit('screen-saved', {});
							vm._scope.$emit("uiConfig-update-screens");
                            vm._toastService.success('Screen Created!');
                            vm.closeModal();
                    });
            });
        }
    );
};

ScreensEditorController.prototype.closeModal = function() {
    this._modalInstance.dismiss('cancel');
};

ScreensEditorController.prototype.openModal = function(callback) {
    this._modalInstance.result.then(function (result) {
        callback(result);
    });
};

ScreensEditorController.prototype.getScreenChosen = function(){
    return (this.screens[this.screenSelectedIndex])?this.screens[this.screenSelectedIndex]:null;
};

ScreensEditorController.prototype.getScreenNameChosen = function(){
    return (this.screenNames[this.screenSelectedIndex])?this.screenNames[this.screenSelectedIndex]:null;
};

ScreensEditorController.prototype.selectScreen = function(screenIndex) {
    if(this.screenSelectedIndex ==  screenIndex){
        this.componentChosen = null;
        this._scope.$broadcast('select-no-component', {
            newComponent : this.getScreenChosen()
        });
    } else {
        this.screenSelectedIndex = screenIndex;
        this.options.deviceSelected = true;
    }
};

ScreensEditorController.prototype.deleteScreen = function(screenModel) {
    if (this.screens.length < 1) {
        return false;
    }
    this._confirmModalService.showModal({},{
        actionButtonText: 'DELETE',
        headerText: 'Delete Screen',
        bodyText: 'Are you sure you want to delete "' + screenModel.value + '" permanently?'
    }).then(function(){
        this._screenService.deleteScreen(this.accountId, this.uiConfigId, screenModel).then(function(){
			//TODO: We have to redesign this. It is wrong and we shouldn't be doing it this way. 
			this._scope.$emit("uiConfig-update-screens");
            this.screenSelectedIndex = null;
            this.screenChosen = null;
            this.ready = false;
            this.getScreens();
            this._toastService.success('Screen Deleted!');
        }.bind(this));
    }.bind(this));
};

ScreensEditorController.prototype.saveScreen = function() {
    this._screenService.updateScreen(this.accountId, this.uiConfigId, this.screens[this.screenSelectedIndex]).then(
        function (updatedScreen) {
            this.screens[this.screenSelectedIndex] = updatedScreen;
            this._toastService.success('Screen Saved!');
        }.bind(this)
    );
};

ScreensEditorController.prototype.screenActive = function(oneScreen) {
    var screenChoosen = this.getScreenNameChosen();
    return  screenChoosen && oneScreen.id == screenChoosen.id;
};

ScreensEditorController.prototype.registerEventHandlers = function() {
    this._scope.$on('screen-refresh', function () {
        this.getScreens();
    }.bind(this));
};

ScreensEditorController.prototype.editScreen = function (screenModal) {
    var vm = this;

    var editAppModalOptions = {
        includeText: 'appstudio/view/modal/screen/edit/renameModal.html',
        headerText: 'Edit Screen Name',
        onSubmit: vm.renameScreen.bind(vm),
        onCancel: vm.dismissModal.bind(vm),
        form: {
            screenId: screenModal.id,
            screenName: screenModal.value
        }
    };
    var editAppModalSettings = {
        controller: 'renameModalController',
        size: 'md'
    };

    vm._modalInstance = vm._modalService.showModal(editAppModalSettings, editAppModalOptions);
};

ScreensEditorController.prototype.renameScreen = function (modalForm) {
    var vm = this;
    var screenIndex = this.screenNames.map(function(x) {return x.id; }).indexOf(modalForm.screenId);
    this.screenNames[screenIndex].value = modalForm.screenName;
    this.screens[screenIndex].setFieldValue('name', modalForm.screenName);

    this.saveScreen();

    vm._modalInstance.close();
};

ScreensEditorController.prototype.saveScreen = function() {
    this._screenService.updateScreen(this.accountId, this.uiConfigId, this.screenChosen).then(
        function (updatedScreen) {
            this._toastService.success('Screen Saved!');
        }.bind(this)
    );
};


ScreensEditorController.prototype.dismissModal = function () {
    var vm = this;
    vm._modalInstance.dismiss();
};

module.exports = ScreensEditorController;
