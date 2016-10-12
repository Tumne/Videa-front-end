var Actions = require('core/actions/Actions');

var MediaGalleryViewController = function (blankModalService,
										   confirmationModalService,
										   $scope,
										   $state,
										   mediaGalleryService,
										   spinnerService) {
	var vm = this;

	//Provided from scope
	vm._state = $state;

	vm.brandId = vm._state.params.brandId;
	vm.accountId = vm._state.params.a;

	vm._blankModalService = blankModalService;
	vm._confirmationModalService = confirmationModalService;
	vm._mediaGalleryService = mediaGalleryService;
	vm._scope = $scope;

	vm._modalInstance = null;
	vm._spinnerService = spinnerService;

	//View Model Data
	vm.isEmpty = true;
	vm.dataReady = false;
	vm.galleryAssets = [];

	vm.actions = [
		new Actions.BaseAction('replace', vm.openReplaceModal, vm),
		new Actions.BaseAction('rename', vm.openRenameAssetModal, vm),
		new Actions.DeleteAction('delete', vm.openDeleteConfirmationModal, vm),
	];

	vm.goBack = function () {
		vm._state.go('app.appStudio.brandView');
	};

	vm.initialize();
};

_.extend(MediaGalleryViewController.prototype, {

	//Get
	getGalleryAssets: function () {
		return this.galleryAssets;
	},
	initialize: function () {
		this._getAllGalleryAssets();
	},
	checkIfBrandIsValid: function (brandModel) {
		var isValid = angular.isDefined(brandModel) ? true : false;
		return isValid;
	},
	openUploadNewGalleryAsset: function () {
		var vm = this;

		var editAppModalOptions = {
			includeText: 'appstudio/view/modal/mediaGallery/uploadModal.html',
			headerText: 'Upload New Asset',
			onSubmit: vm.uploadNewGalleryAsset.bind(vm),
			onCancel: vm.dismissModal.bind(vm)
		};
		var editAppModalSettings = {
			controller: 'uploadModalController',
			size: 'md'
		};

		vm._modalInstance = vm._blankModalService.showModal(editAppModalSettings, editAppModalOptions);
	},
	openRenameAssetModal: function (assetModel) {
		var vm = this;

		var editAppModalOptions = {
			includeText: 'appstudio/view/modal/mediaGallery/renameModal.html',
			headerText: 'Rename New Asset',
			onSubmit: vm.renameAsset.bind(vm),
			onCancel: vm.dismissModal.bind(vm),
			form: {
				assetId: assetModel.getFieldValue('id'),
				assetName: assetModel.getFieldValue('name')
			}
		};
		var editAppModalSettings = {
			controller: 'uploadModalController',
			size: 'md'
		};

		vm._modalInstance = vm._blankModalService.showModal(editAppModalSettings, editAppModalOptions);
	},
	openReplaceModal: function (assetModel) {
		var vm = this;

		var editAppModalOptions = {
			includeText: 'appstudio/view/modal/mediaGallery/uploadModal.html',
			headerText: 'Replace Asset',
			onSubmit: vm.replaceGalleryAsset.bind(vm),
			onCancel: vm.dismissModal.bind(vm),
			form: {
				asset: assetModel,
				assetName: assetModel.getFieldValue('name'),
				image: assetModel.getFieldValue('image')
			}
		};
		var editAppModalSettings = {
			controller: 'uploadModalController',
			size: 'md'
		};

		vm._modalInstance = vm._blankModalService.showModal(editAppModalSettings, editAppModalOptions);
	},
	openDeleteConfirmationModal: function (assetModel) {
		var vm = this;

		var editAppModalOptions = {
			headerText: 'Delete Confirmation',
			bodyText: "Are you sure you want to delete this asset?"
		};
		var editAppModalSettings = {
			controller: 'uploadNewModalController',
			size: 'md'
		};

		vm._modalInstance = vm._confirmationModalService.showModal(editAppModalSettings, editAppModalOptions)
			.then(function () {
				vm._mediaGalleryService.deleteGalleryAsset(vm.accountId, vm.brandId, assetModel.getFieldValue('id'))
					.then(function () {
						vm._getAllGalleryAssets();
					});
			});
	},
	uploadNewGalleryAsset: function (modalForm) {
		var vm = this;

		vm._spinnerService.start();
		vm._modalInstance.close();
		vm._mediaGalleryService.createGalleryAsset(vm.accountId, vm.brandId, modalForm)
			.then(function () {
				return vm._getAllGalleryAssets();
			})
			.then(function () {
				vm._spinnerService.stop();
			}).catch(function (error) {
			console.log("Error Uploading Asset", error);
		});
	},
	replaceGalleryAsset: function (modalForm) {
		var vm = this;

		vm._spinnerService.start();
		vm._modalInstance.close();
		vm._mediaGalleryService.updateGalleryAsset(vm.accountId, vm.brandId, modalForm.asset.id, modalForm)
			.then(function () {
				return vm._getAllGalleryAssets();
			})
			.then(function () {
				vm._spinnerService.stop();

			}).catch(function (error) {
			console.log("Error Uploading Asset", error);
		});
	},
	renameAsset: function (modalForm) {
		var vm = this;

		vm._spinnerService.start();
		vm._modalInstance.close();
		vm._mediaGalleryService.renameGalleryAsset(vm.accountId, vm.brandId, modalForm.assetId, modalForm)
			.then(function () {
				return vm._getAllGalleryAssets();
			})
			.then(function () {
				vm._spinnerService.stop();
				vm._modalInstance.close();
			}).catch(function (error) {
			console.log("Error Uploading Asset", error);
		});
	},
	dismissModal: function () {
		var vm = this;
		vm._modalInstance.dismiss();
	},
	//Private
	_getAllGalleryAssets: function () {
		var vm = this;
		vm._mediaGalleryService.getAllMediaGalleryAssets(vm.accountId, vm.brandId).then(function (galleryArray) {
			vm.galleryAssets = galleryArray;
			vm.galleryAssets.length > 0 ? vm.isEmpty = false : vm.isEmpty = true;
			vm.dataReady = true;
		});
	}

});

module.exports = MediaGalleryViewController;
