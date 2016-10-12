var Digi = require('core/Digi');
var _ = require('underscore');
var Purpose = require('core/plugin/Purpose');
var UIConfigurationViewController = function ($scope, $state, $log, uiConfigurationService, toastService, confirmationModalService, modelFactory, modelOperation, screenService) {

	var vm = this;
	this._scope = $scope;
	this._state = $state;
	this._log = $log;

	//Required Ids for this view.
	this.appId = this._state.params.appId;
	this.accountId = this._state.params.a;
	this.uiConfigId = this._state.params.uiConfigId;
	this.brandId = this._state.params.brandId;

	//Set the option object that is passed into the uiConfigurationEditor.
	this.options = {
		account: this.accountId,
		brand: this.brandId,
        configId: this.uiConfigId,
        app: this.appId,
		screens: [],
        saveTitle: 'SAVE SCREEN'
	};

	//Dirty flag to check if the model was changed. 
	this.dirty = false;
	this.ready = false;
	this.ignore = ['id', '_metadata', 'name', 'createdDate', 'modifiedDate'];

	//Services
	this._confirmModalService = confirmationModalService;
	this._modelFactory = modelFactory;
	this._modelOperation = modelOperation;
	this._screenService = screenService;
	this._toastService = toastService;
	this._uiConfigurationService = uiConfigurationService;

    this.purpose = Purpose;
    
	this.saveTitle = function (configName) {
        vm.uiConfigModel.setFieldValue('name', configName);
        vm.saveUIConfig();
	};

	this.goBack = function () {
		this._state.go('app.appStudio.appConfigurationView', {
			'brandId': this.brandId,
			'accountId': this.accountId,
			'appId': this.appId,
		});
	};
	
	this._registerEventHandlers();
	this._init();
};

_.extend(UIConfigurationViewController.prototype, {

	//Get desired UIConfig to edit from the server using the passed uiConfigId ('version')
	_init: function() {
		this._uiConfigurationService.getById(this.accountId, this.appId, this.uiConfigId).then(function(data) {
			this.uiConfigModel = data;
			this.appType = this.uiConfigModel.getFieldValue('_metadata');
            this.editTitle = this.uiConfigModel.getFieldValue('name');
			this.ready = true;
			this._getScreens();
			this.options.uiConfigId = this.uiConfigModel.id;
			this.options.appId = this.appId;
			// this._log.debug("Loaded uiConfig: ", this.uiConfigModel);
		}.bind(this));
	},
	//TODO: Refresh the screens on save
	saveUIConfig: function () {

		var vm = this;
		
		vm._log.debug("Saving uiConfigModel (accountId, appId, configModel): ", 
			vm.accountId, " ", vm.appId, " ", vm.uiConfigModel);
		
		vm._uiConfigurationService.updateAppConfig(vm.accountId, vm.appId, vm.uiConfigModel).then(vm._getScreens()).then(function() {
			vm._toastService.success("Saved!");
		}, function(error){
			vm._toastService.error("Save Failed!");
			vm._log.error("Error saving the uiConfig (error, accountId, appId, uiConfigModel): ", error, 
				vm.accountId, vm.appId, vm.uiConfigModel)
		});
	},
	//Get the required screen models that the uiConfigurationEditor uses.
	_getScreens: function () {
		
		var vm = this;
		
		return vm._screenService.getScreens(this.accountId, vm.uiConfigModel.id).then(function (screens) {
			vm.options.screens = screens;
			return screens;
		});
	},
	_registerEventHandlers: function() {

		var vm = this;
		
		//Save the config when a plugin save button is clicked
		this._scope.$on('uiConfig-save', function () {
			vm.saveUIConfig();
		});

		this._scope.$on('uiConfig-reorder', function (event, newScreens) {

			var newScreensLength = newScreens.length;

			for(var i = newScreensLength; i > -1; i--){
				vm.uiConfigModel.removeScreen(i);
			}

			for(var j = 0; j < newScreensLength; j++){
				vm.uiConfigModel.addScreen(newScreens[j]);
			}

			vm.saveUIConfig();
		});

		this._scope.$on('uiConfig-update-screens', function () {
			vm.options.initScreens = true;
			vm._init();
		});

	},
});

module.exports = UIConfigurationViewController;
