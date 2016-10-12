var ModalController = require('core/modal/AbstractModalController');
var Purpose = require('core/plugin/Purpose');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var Digi = require('core/Digi');
var VersionsViewController = function ($log,
                                       appService,
                                       uiConfigurationService,
                                       blankModalService,
                                       confirmationModalService,
                                       modelFactory,
                                       spinnerService,
                                       $scope,
                                       $state,
                                       toastService) {

	var self = this;
    //Services
    
    this._appService = appService;
    this._uiConfigurationService = uiConfigurationService;
    this._blankModalService = blankModalService;
    this._confirmationModalService = confirmationModalService;
    this._log = $log;
    this._scope = $scope;
    this._state = $state;
    this.bundleTypes = [PluginModelType.VIEW.BUNDLE.MOBILE, PluginModelType.VIEW.BUNDLE.TABLET, PluginModelType.VIEW.BUNDLE.TV];
    
    this._spinnerService = spinnerService;
    this._toastService = toastService;
	this._modelFactory = modelFactory;
    this.purpose = Purpose;

    this.ready = false;
    this.publishReady = false;
    this.versions = [];

    this.publishedUiConfig = null;
    this.modalInstance = null;

    this._initializePage();

	//TODO: Temporary Navigation Functionality
	this.edit = function(uiConfigModel){

        this._state.go('app.appStudio.uiConfigurationView', {
            'uiConfigId': uiConfigModel.id,
            'appId': self.appId,
            'brandId': self.brandId,
            'a': self.accountId,
        });

	};

	//Set the plugin options used by the version cards.
    this.options = {
        publish: this.openPublishConfirmationModal.bind(this),
        delete: this.openDeleteConfirmationModal.bind(this),
        removeVersionFromBundle: this.openRemoveVersionFromBundleModal.bind(this),
        duplicate: this.openDuplicateConfirmationModal.bind(this),
        editBundle: this.openEditBundleModal.bind(this),
        edit: this.edit.bind(this),
        accountId: this.accountId,
        appId: this.appId,
        editUiConfigName: this._editUiConfig.bind(this)
    };
    
    this.publishedOptions = {
        publish: this.openPublishConfirmationModal.bind(this),
        delete: this.openDeleteConfirmationModal.bind(this),
        removeVersionFromBundle: this.openRemoveVersionFromBundleModal.bind(this),
        duplicate: this.openDuplicateConfirmationModal.bind(this),
        editBundle: this.openEditBundleModal.bind(this),
        edit: this.edit.bind(this),
        accountId: this.accountId,
        appId: this.appId,
        editUiConfigName: this._editUiConfig.bind(this),
        published: true
    };    
    
    this._scope.$watch(function () {
		return this.activeConfig;
	}.bind(this), function (newConfig, oldConfig) {
		this.findPublishedUiConfig();
	}.bind(this));     
};

_.extend(VersionsViewController.prototype, {

    _initializePage: function () {
        //get all ui configs
        this._loadVersions();
    },
    openVersionModal: function () {
        var versionModalOptions = {
            headerText: 'Create New Version',
            includeText: 'appstudio/view/modal/appConfig/new/newAppConfig.html',
            onSubmit: this._createVersion.bind(this),
            onCancel: this._closeModal.bind(this),
            schema: this.appModel.getOneOfTypes('uiConfig')
        };

        var configModalSettings = {
            controller: 'newAppConfigController',
            size: 'md'
        };

        this.modalInstance = this._blankModalService.showModal(configModalSettings, versionModalOptions);
    },
    _createVersion: function (form) {
        var self = this;
        self._uiConfigurationService.createAppConfig(self.accountId,
                                               self.appId,
                                               form.getJson())
        .then(function () {
            self._initializePage();
            self._loadAppModel();
            self._closeModal();
        }, function (err) {
            console.log(err);
        });
    },
    openBundleModal: function () {
        var self = this,
            bundleModalOptions = {
                headerText: 'Create New Bundle',
                includeText: 'appstudio/view/modal/appConfig/new/newBundle.html',
                onSubmit: this._createBundle.bind(this),
                onCancel: this._closeModal.bind(this),
                schema: this.appModel.getOneOfTypes('uiConfig'),
                versions: this.versions.map(function(oneVersion){
                            if(oneVersion)
                            return {
                                id: oneVersion.getFieldValue('id'),
                                text: oneVersion.getFieldValue('name'),
                                isBundle: (self.bundleTypes.indexOf(oneVersion.getFieldValue('_metadata')) > -1)
                            };
                })
        };

        var configModalSettings = {
            controller: 'newBundleController',
            size: 'md'
        };
        if(bundleModalOptions.versions.length > 0){
            this.modalInstance = this._blankModalService.showModal(configModalSettings, bundleModalOptions);    
        }
    },
    _createBundle: function(form) {
        var self = this;
        self._uiConfigurationService.createAppConfig(self.accountId,
                                               self.appId,
                                               form.getJson())
        .then(function () {
            self._initializePage();
            self._loadAppModel();
            self._closeModal();
        }, function (err) {
            console.log(err);
        });
    },
    _loadAppModel: function () {
		
        var self = this;
		
        self._appService.getById(self.accountId,
                                 self.brandId,
                                 self.appId)
        .then(function (cleanAppModel) {
            self._scope.$emit('app-loaded', {
               appModel: cleanAppModel
            });
        });
    },
    _closeModal: function () {
        if (this.modalInstance){
            this.modalInstance.dismiss('cancel');    
        }
    },
    _loadVersions: function () {
        var self = this;
        self.ready = false;
        this._uiConfigurationService.getAppVersions(self.accountId, self.appModel, self.appId)
            .then(function (response) {
                // self._log.debug("versions: ", response);
                self.ready = true;
                self.versions = self.filterVersions(response);
                self.findPublishedUiConfig();
                self.stopSpinner();
            }, function (error) {
                self._log.error('Verion Error: ', error);
        });
    },
    openDuplicateConfirmationModal: function (version) {
        var vm = this;

        var confirmModalOptions = {
            actionButtonText: 'DUPLICATE',
            headerText: 'Duplicate Version',
            bodyText: 'Are you sure you want to duplicate "' + version.getFieldValue('name') + '"?'
        };

        var confirmModalSettings = {
            size: 'md'
        };

        this.modalInstance = this._confirmationModalService.showModal(confirmModalSettings, confirmModalOptions)
            .then(function () {
                vm._duplicateVersion(version);
            });

    },
    _duplicateVersion: function (version) {
        var vm = this;

        vm.startSpinner();

        vm._uiConfigurationService.duplicateAppConfig(vm.accountId, vm.appId, version.getFieldValue('id'))
        .then(function () {
            vm._loadAppModel();
            vm.stopSpinner();
            vm._toastService.success('Duplicated!');
        }, function (error) {
            vm._log.error('AppConfigDirectiveController: ', error);
        });
    },
    openDeleteConfirmationModal: function (version) {
        var vm = this;

        var confirmModalOptions = {
            actionButtonText: 'DELETE',
            headerText: 'Delete Confirmation',
            bodyText: 'Are you sure you want to delete "' + version.getFieldValue('name') + '" Version?'
        };

        var confirmModalSettings = {
            size: 'md'
        };

        vm.modalInstance = vm._confirmationModalService.showModal(confirmModalSettings, confirmModalOptions)
            .then(function () {
                vm._deleteVersion(version);
            });

    },
    _deleteVersion: function (version) {
        var vm = this;

        vm.startSpinner();

        vm._uiConfigurationService.deleteAppConfig(vm.accountId,
                                             vm.appId,
                                             version.getFieldValue('id'))
        .then(function (response) {
            vm._loadAppModel();
            vm.stopSpinner();
        }, function (error) {
            vm._log.error('Error: AppConfigDirectiveController: _deleteConfig(): ', error);
        });
    },
    openRemoveVersionFromBundleModal: function(version, bundle) {
        var vm = this;

        var confirmModalOptions = {
            actionButtonText: 'REMOVE',
            headerText: 'Remove Confirmation',
            bodyText: 'Are you sure you want to remove "' + version.getFieldValue('name') + '" from Bundle?'
        };

        var confirmModalSettings = {
            size: 'md'
        };

        vm.modalInstance = vm._confirmationModalService.showModal(confirmModalSettings, confirmModalOptions)
            .then(function () {
                var id = version.getFieldValue('id'),
                    bundleVersionList = bundle.getUiConfigRefs(),
                    versionIndex = bundleVersionList.indexOf(id);
                bundle.removeUiConfigRefs(versionIndex);
                vm._saveBundle(bundle);
        });
    },
    openPublishConfirmationModal: function (version) {
        var vm = this;

        var confirmModalOptions = {
            actionButtonText: 'PUBLISH',
            headerText: 'Publish Confirmation',
            bodyText: 'Are you sure you want to publish "' + version.getFieldValue('name') + '" config?'
        };

        var confirmModalSettings = {
            size: 'md'
        };

        this.modalInstance = this._confirmationModalService.showModal(confirmModalSettings, confirmModalOptions)
            .then(function () {
                vm._publishVersion(version);
            });

    },
    openEditBundleModal: function(bundle, bundleVersions) {
        var bundleModalOptions = {
            headerText: 'Edit Bundle',
            includeText: 'appstudio/view/modal/appConfig/edit/editBundle.html',
            onSubmit: this._editUiConfig.bind(this),
            onCancel: this._closeModal.bind(this),
            bundle: bundle,
            bundleVersions: bundleVersions.map(function(oneVersion){
                        return {
                            id: oneVersion.getFieldValue('id'),
                            text: oneVersion.getFieldValue('name')
                        };
            }),
            versions: this.versions.map(function(oneVersion){
                        return {
                            id: oneVersion.getFieldValue('id'),
                            text: oneVersion.getFieldValue('name'),
                            isBundle: (Digi.Function.hasFunction(oneVersion,'getUiConfigRefs'))?true:false
                        };
            })
        };

        var configModalSettings = {
            controller: 'editBundleController',
            size: 'md'
        };

        this.modalInstance = this._blankModalService.showModal(configModalSettings, bundleModalOptions);        
    },
    _publishVersion: function (version) {
        var vm = this;

        vm.startSpinner();

        vm._uiConfigurationService.publishAppConfig(vm.accountId, vm.appId, version.getFieldValue('id'))
        .then(function (appModel) {
			//TODO: Remove old appModel
            // vm._log.debug("AppConfigViewController:  Published Config: ", appModel);
            vm._loadAppModel();
            vm.stopSpinner();
            vm._toastService.success('Published!');
        }, function (error) {
            vm._log.error('AppConfigViewController: ', error);
        });
    },
    _editUiConfig: function(uiConfig) {
        var vm = this;
        vm.startSpinner();
        vm._uiConfigurationService.updateAppConfig(vm.accountId, vm.appId, uiConfig).then(function(){
            vm._loadAppModel();
            vm.stopSpinner();
            vm._closeModal();
            vm._toastService.success('Modified!');
        });
    },    
    _saveBundle: function(bundle) {
        var vm = this;
        vm.startSpinner();
        vm._uiConfigurationService.updateAppConfig(vm.accountId, vm.appId, bundle).then(function(){
            vm._loadAppModel();
            vm.stopSpinner();
            vm._closeModal();
            vm._toastService.success('Removed!');
        });
    },
    startSpinner: function () {
        this._spinnerService.start();
    },
    stopSpinner: function () {
        this._spinnerService.stop();
    },
    findPublishedUiConfig: function () {
      this.publishReady = false;
      if (this.activeConfig.length < 1) {
          return;
      }
      
      for( var i = 0; i < this.versions.length; i++) {
        if (this.versions[i].getFieldValue('id') == this.activeConfig) {
            this.publishedUiConfig = this.versions[i];
            this.publishReady = true;
        }    
      }  
    },
	//TODO: This is not clear. We have to figure out a better way to do this.
    filterVersions: function(versions) {
        var bundleVersions = [],
            self = this,
            bundles = versions.filter(function(oneVersion){
                if (self.bundleTypes.indexOf(oneVersion.getFieldValue('_metadata')) > -1){
                    bundleVersions = bundleVersions.concat(oneVersion.getUiConfigRefs());
                    return true;
                }
                return false;
            });
        return versions.filter(function(oneVersion2){
            return bundleVersions.indexOf(oneVersion2.getFieldValue('id')) < 0;
        });
    }
});

module.exports = VersionsViewController;
