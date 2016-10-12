var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var BundleView = function () {

};

Implements(BundleView, IView);

BundleView.prototype = {
	getName: function () {
		return 'bundleViewComponent';
	},
	getDefinition: function () {
		return {
			controller: ['$scope',
				'modelFactory',
				'modelOperation',
				'$q',
				'uiConfigurationService',
				function ($scope,
						  modelFactory,
						  modelOperation,
						  $q,
						  uiConfigurationService) {
					this._scope = $scope;
					this._modelFactory = modelFactory;
					this._modelOperation = modelOperation;
					this._q = $q;
					this._uiConfigurationService = uiConfigurationService;
					this.fields = this._scope.model.getFields();
					this.versions = [];
					this.ready = false;
					this.bundleName = this._scope.model.getFieldValue('name');
					this.modifiedDate = this._scope.model.getFieldValue('modifiedDate');

					var uiConfigIds = this._scope.model.getUiConfigRefs();
					var promises = [];
					var self = this;
					for (var i = 0; i < uiConfigIds.length; i++) {
						promises.push(uiConfigurationService.getById(
							self._scope.options.accountId,
							self._scope.options.appId,
							uiConfigIds[i]).then(function (model) {
							return self.versions.push(model);
						}));
					}

					this._q.all(promises).then(function (results) {
						self.ready = true;
					});

					this.editVersion = function (oneVersion) {
						this._scope.options.edit(oneVersion);
					};
					this.editBundle = function (bundle, bundleVersions) {
						this._scope.options.editBundle(bundle, bundleVersions);
					};

					this.deleteVersion = function (oneVersion) {
						this._scope.options.removeVersionFromBundle(oneVersion, this._scope.model);
					};

					this.publish = function () {
						this._scope.options.publish(this._scope.model);
					};

					this.duplicateVersion = function (oneVersion) {
						this._scope.options.duplicate(oneVersion);
					};

					this.delete = function () {
						this._scope.options.delete(this._scope.model);
					};

					this.editName = function (title) {
						var currentTitle = self._scope.model.getFieldValue('name');
						console.log(currentTitle, title, currentTitle != title && title.length > 0);
						if (currentTitle != title && title.length > 0) {
							self._scope.model.setFieldValue('name', title);
							self._scope.options.editUiConfigName(self._scope.model);
						} else {
							self.bundleName = currentTitle;
						}
					};
				}],
			controllerAs: 'vm',
			replace: true,
			scope: false,
			templateUrl: 'appstudio/plugin/view/bundle/bundleView.html'
		};
	},
	getDirective: function () {
		return '<bundle-view-component></bundle-view-component>';
	}
};

module.exports = BundleView;
