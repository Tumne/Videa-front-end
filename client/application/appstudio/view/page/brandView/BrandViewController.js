'use strict'

var Digi = require('core/Digi');
var BrandViewController = function (account,
                                    brandDataService,
                                    appService,
                                    appTypeService,
									uiConfigurationService,
                                    blankModalService,
                                    confirmationModalService,
                                    $scope,
                                    $state,
                                    spinnerService,
									modelFactory) {

    this._brandService = brandDataService;
    this._appService = appService;
    this._appTypeService = appTypeService;
    this._configService = uiConfigurationService;
    this._modalService = blankModalService;
    this._confirmModalService = confirmationModalService;
    this._spinnerService = spinnerService;
	this._modelFactory = modelFactory;
	
    this._modalInstance = null;
    this._appTypes = [];
    this._scope = $scope;
    this._state = $state;
	this.ready = false;

    this.brands = [];
    this.apps = [];
    this.appConfigs = {};

    this.accountId = account.id;

    this.brandChosen = null;
    this.appChosen = null;

    this.createBrandActionList();
    this.getAllAppType();
    this.getAllBrands();

    this.activeConfigId = null;
    this.version = null;

    this.editBrand = {
        'save': this.submitEditBrand.bind(this)
    }
};

BrandViewController.prototype.getAllAppType = function() {
    this._appTypeService.getAll(this.accountId).then(function (appTypeModels) {
        this._appTypes = appTypeModels;
    }.bind(this));
};

BrandViewController.prototype.getAllBrands = function() {
    this.brandStartPage = true;
    this.loading = true;
    this._brandService.getAll(this.accountId).then(function (brandModels) {
        console.log('brandModels', brandModels);
        this.brands = brandModels;
        this.getAllAppByBrand(this.brands);

        if(this.brands.length == 0){
            this.brandStartPage = false;
        }
    }.bind(this));
};

//TODO: This does not belong here (PW)
BrandViewController.prototype.createBrandActionList = function(){
    this.brandUpdateButtons = [{
        text: '<i class="fa fa-pencil"></i>',
        callback: this.editBrand.bind(this)
    }, {
       text: '<img src="/images/delete-button.svg">',
        callback: this.deleteBrand.bind(this)
    }];

    this.brandButtonActions = [{
        text: 'Gallery <i class="fa fa-chevron-right"></i>',
        callback: this.manageBrandAssets.bind(this)
    }, {
        text: 'New App <i class="fa fa-plus"></i>',
        callback: this.newApp.bind(this)
    }];
};

BrandViewController.prototype.newBrand = function() {
    this._modalInstance = this._modalService.showModal({
        controller: 'newBrandController'
    }, {
        includeText: 'appstudio/view/modal/brand/new/newBrand.html',
        headerText: 'Set up a New Brand',
        onSubmit: this.submitNewBrand.bind(this),
        onCancel: this.closeModal.bind(this)
    });
    this.openModal(function(newBrand){});
};

BrandViewController.prototype.submitNewBrand = function(form){
    var vm = this;
    vm.closeModal();
    vm._spinnerService.start();
    this._brandService.create(this.accountId, form.brandName, form.image).then(function (newBrand) {
        vm.getAllBrands();
        vm._spinnerService.stop();
    });
};

BrandViewController.prototype.submitEditBrand = function(brandModel){
    var vm = this;
    vm._brandService.update(this.accountId, brandModel.getId(), brandModel.getName(), null).then(function (editBrand) {
        vm.getAllBrands();
    });
};

BrandViewController.prototype.editBrand = function(brandModel) {
	//this._modalInstance = this._modalService.showModal({
	//    controller: 'editBrandController'
	//}, {
	//    includeText: 'appstudio/view/modal/brand/edit/editBrand.html',
	//    headerText: 'Edit a Brand',
	//    brand: brandModel,
	//    ok: this.submitEditBrand.bind(this),
	//    close: this.closeModal.bind(this)
	//});
	//this.openModal(function(editBrand){
	//    //do something once new brand made
	//});
};

BrandViewController.prototype.deleteBrand = function(brandModel) {
    this._confirmModalService.showModal({},{
        actionButtonText: 'DELETE',
        headerText: 'Delete Brand',
        bodyText: 'Are you sure you want to delete "' + brandModel.getName() + '" brand permanently?'
    }).then(function(){
        this._brandService.delete(this.accountId, brandModel.getId()).then(function(){
            this.getAllBrands();
        }.bind(this));
    }.bind(this));
};

BrandViewController.prototype.manageBrandAssets = function(brandModel){
    this._state.go('app.appStudio.mediaGalleryView', {
        'brandModel': brandModel,
        'brandId': brandModel.data.id,
        'a': this.accountId,
    });
};

BrandViewController.prototype.showConfigManagement = function(appModel) {
    this.appChosen = appModel;
    this.brandChosen = this.getBrandByApp(appModel);
    this._state.go('app.appStudio.appConfigurationView', {
        'brandId': this.brandChosen.data.id,
        'appId': this.appChosen.id,
        'a': this.accountId,
    });
};

BrandViewController.prototype.getAppsByBrand = function(brandModel){
    var appIds = brandModel.getAppIds();
    return this.apps.filter(function(oneApp){
        if (!Digi.inArray(oneApp.getFieldValue('id'), appIds)){
            return false;
        }
        return true;
    });
};

BrandViewController.prototype.getBrandByApp = function(appModel){
    var appIdList = [],
        appId = appModel.getFieldValue('id');
    return this.brands.filter(function(oneBrand){
        appIdList = oneBrand.getAppIds();
        if (Digi.inArray(appId, appIdList)){
            return true;
        }
        return false;
    })[0];
};

BrandViewController.prototype.newApp = function(brandModel){
    var self = this;
    this.brandChosen = brandModel;
    this._modalInstance = this._modalService.showModal({
        controller: 'newAppController'
    }, {
        includeText: 'appstudio/view/modal/app/new/newApp.html',
        headerText: 'Create a New App',
        appTypes: this._appTypes,
        onSubmit: this.submitNewApp.bind(this),
        onCancel: this.closeModal.bind(this)
    });

    this.openModal(function(newApp){});
};

// front-end and backend to getApps or getAppsByBrand
BrandViewController.prototype.getAllAppByBrand = function(brands){
    this._appService.getAll(this.accountId, brands).then(function(apps){
        this.apps = apps;
        this.getAllActiveConfigByApp(this.apps);
    }.bind(this));
};

BrandViewController.prototype.editApp = function(brandModel, appModel){
    this._modalInstance = this._modalService.showModal({
        controller: 'editAppController'
    }, {
        includeText: 'appstudio/view/modal/app/edit/editApp.html',
        headerText: 'Edit a App',
        brand: brandModel,
        app: appModel,
        ok: this.submitEditApp.bind(this),
        close: this.closeModal.bind(this)
    });
    this.openModal(function(editApp){
        //do something once new brand made
    });
};

BrandViewController.prototype.submitEditApp = function(form){
    var vm = this;
    this._appService.update(this.accountId, form.brandId, form.appModel).then(function (editApp) {
        vm.getAllBrands();
        vm.closeModal();
    });
};

BrandViewController.prototype.deleteApp = function(brandModel, appModel){
    this._confirmModalService.showModal({},{
        actionButtonText: 'DELETE',
        headerText: 'Delete App',
        bodyText: 'Are you sure you want to delete "' + appModel.getFieldValue('name') + '" app permanently?'
    }).then(function(){
        this._appService.delete(this.accountId, brandModel.getId(), appModel.getFieldValue('id')).then(function(){
            this.getAllBrands();
        }.bind(this));
    }.bind(this));
};

BrandViewController.prototype.getAllActiveConfigByApp = function(apps){
    this._configService.getAllActiveAppConfigs(this.accountId, apps).then(function(appConfigs) {
        this.appConfigs = appConfigs;
		this.ready = true;
    }.bind(this));
};

BrandViewController.prototype.submitNewApp = function(form) {
    var appModelJson = form.getJson();
	
    this._appService.create(this.accountId, this.brandChosen.getId(), appModelJson).then(function (newApp) {
        this.getAllBrands();
        this.closeModal();
    }.bind(this));
};

BrandViewController.prototype.getUIConfig = function(oneApp) {
	var activeConfig = this.appConfigs[oneApp.getFieldValue('activeConfig')];
	return activeConfig;
};

BrandViewController.prototype.openModal = function(callback) {
    this._modalInstance.result.then(function (result) {
        callback(result);
    });
};

BrandViewController.prototype.closeModal = function() {
    this._modalInstance.dismiss('cancel');
};

module.exports = BrandViewController;
