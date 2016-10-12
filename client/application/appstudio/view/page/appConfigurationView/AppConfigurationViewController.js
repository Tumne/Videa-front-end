'use strict'

var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');

var AppConfigurationViewController = function ($scope, $state, $log, appService, toastService) {
	var vm = this;

	vm._scope = $scope;
	vm._state = $state;
	vm._log = $log;
	vm._appService = appService;
	vm._toastService = toastService;
	
	vm.ready = false;
	vm.appModel = null;
	vm.appType = null;
	vm.purpose = Purpose;
	
	vm.brandId = vm._state.params.brandId;
	vm.accountId = vm._state.params.a;
	vm.appId = vm._state.params.appId;
	
	vm.init();


	vm.goBack = function () {
		vm._state.go('app.appStudio.brandView');
	};

	vm.saveTitle = function() {
		vm._saveAppConfig();
	};

	this.ignore = ['id', '_metadata', 'name',
		'clientConfig', 'activeConfig', 'createdDate', 'modifiedDate'
	];

  this._scope.$on('app-loaded',
      function (event, args) {
          this.appModel = args.appModel;
      }.bind(this)
  );

};

_.extend(AppConfigurationViewController.prototype, {

	init: function () {
		this._appService.getById(this.accountId, this.brandId, this.appId).then(function (data) {
			this.appModel = data;

			console.log('this.appModel', this.appModel);
			
			this.appTitle = this.appModel.getFieldValue('name');
			this.appType = this.appModel.getConfiguration().getFieldValue('_metadata');
			
			this.options = {
				brandId: this.brandId,
				accountId: this.accountId,
				appId: this.appModel.getFieldValue('id'),
				activeConfig: this.appModel.getFieldValue('activeConfig'),
                save: this._save.bind(this)
			};
			this.ready = true;
		}.bind(this));

		this._registerEventHandlers();
	},
	_registerEventHandlers: function () {

		var vm = this;

		//Save the config when a plugin save button is clicked
		this._scope.$on('appConfig-save', function () {
			vm._saveAppConfig();
		});

		this._scope.$on('ComplexModelEditor-save', function () {
			vm._saveAppConfig();
		});
		
		this._scope.$on('app-loaded',
			function (event, args) {
				this.appModel = args.appModel;
				this.options = {
					brandId: this.brandId,
					accountId: this.accountId,
					appId: this.appModel.getFieldValue('id'),
					activeConfig: this.appModel.getFieldValue('activeConfig'),
                    save: this._save.bind(this)
				};
			}.bind(this)
		);
	},
	_saveAppConfig: function () {
		var vm = this;
		this.appModel.setFieldValue('name', this.appTitle);
		this._appService.update(this.accountId, this.brandId, this.appModel).then(function () {
			vm._toastService.success("App Configuration was saved.");
		}, function (error) {
			vm._toastService.success("Error saving.");
			vm._log.error("Error saving app configuration (error, accountId, brandId, appModel): ",
				error, this.accountId, this.brandId, this.appModel);
		});
	},
    _save: function () {
        var vm = this;
        vm._scope.$emit('ComplexModelEditor-save', {});
    }
});

module.exports = AppConfigurationViewController;
