var Digi = require('core/Digi');
var Inflected = require('inflected');
var Purpose = require('core/plugin/Purpose');
var HasManyEditorController = function ($scope,
										blankModalService,
										confirmationModalService,
										toastService) {
	this.title = this.associationName.toUpperCase();
	this.newTitle = 'NEW ' + this.associationName.toUpperCase();
	this.schemaId = this.model.getAssociationRef(this.associationName);
	this.anyOf = [];
	this.isAnyOf = this.model.getAnyOfTypes(this.associationName).length > 0;
	this.modelType = this.model.getAssociationModelType(this.associationName);
	this.itemTitle = this.model.getAssociationItemTitle(this.associationName);

	this._modalInstance = null;
	this.purpose = Purpose;
	this._blankModalService = blankModalService;
	this._confirmModalService = confirmationModalService;
	this._toastService = toastService;
	this.type = null;
	this.selectedIndex = null;
	this.list = [];
	this.modelSelected = null;
	this.getRows();
	this.setAnyOf();
	this.selectView();
	this.selectedIndex = (this.list.length > 0) ? (this.list.length - 1) : null;
	this._scope = $scope;
    if (this.getRows().length > 0 ) {
        this.selected(0);
    }

};

HasManyEditorController.prototype = {
	getRows: function () {
		this.resetList();
		return this.model['get' + Digi.String.capitalizeFirstLetter(Inflected.pluralize(this.associationName))]();
	},
	rowName: function (oneRow) {
		return oneRow.getFieldValue(this.listName);
	},
	create: function () {
		var vm = this;

		var createModalOptions = {
			includeText: 'core/uicomponents/editor/hasManyEditor/modal/createHasManyModal.html',
			schemaId: vm.schemaId,
			viewType: vm.type,
			anyOf: vm.anyOf,
			itemTitle: vm.itemTitle,
			headerText: 'Add New ' + Digi.String.capitalizeFirstLetter(this.associationName),
			onSubmit: vm.submitModel.bind(vm),
			onCancel: vm.dismissModal.bind(vm)
		};

		var createModalSettings = {
			controller: 'createHasManyModalController',
			size: 'md'
		};

		vm._modalInstance = vm._blankModalService.showModal(createModalSettings, createModalOptions);
	},
	submitModel: function (form) {
		var vm = this;
        if (this.type == 'nameView') {
            this.model['add' + Digi.String.capitalizeFirstLetter(this.associationName)](form);
        } else {
            this.model['add' + Digi.String.capitalizeFirstLetter(this.associationName)](form.value);
        }
		this.setAnyOf();
		this.resetList();
		vm.dismissModal();
	},
	dismissModal: function () {
		var vm = this;
		vm._modalInstance.dismiss();
	},
	selectView: function () {
		//if has anyof then selectbox view
		if (this.isAnyOf) {
			this.type = 'selectView';
		} else {
			//is object save name only
			this.type = 'nameView';
		}
	},
	resetList: function () {
		this.list = this.model['get' + Digi.String.capitalizeFirstLetter(Inflected.pluralize(this.associationName))]();
	},
	selected: function (index) {
		this.selectedIndex = index;
		this.modelSelected = this.list[this.selectedIndex];
	},
	getModelSelected: function () {
		return this.modelSelected;
	},
	remove: function () {
		var name = this.modelSelected.getFieldValue('name');
		this._confirmModalService.showModal({}, {
			actionButtonText: 'DELETE',
			//headerText: 'Delete ' + this.title,
			bodyText: 'Are you sure you want to delete "' + name + '" permanently?'
		}).then(function () {
			this.model['remove' + Digi.String.capitalizeFirstLetter(this.associationName)](this.selectedIndex);
			this.selectedIndex = null;
			this.modelSelected = null;
			this.setAnyOf();
			this.resetList();
			this._toastService.success(name + ' Deleted!');
		}.bind(this));
	},
	save: function () {
		this._scope.$emit(this.saveEvent);
	},
	isActive: function (index) {
		return index === this.selectedIndex;
	},
	//Filters the anyOf associations in order to prevent the user from selecting an already selected value
	setAnyOf: function () {
		var self = this;
		var flag = true;

		//TODO: We need to give the BaseModel functionality to filter through valid AnyOf associations
		self.anyOf = (self.model.getAnyOfTypes(self.associationName)).filter(function (current) {
			flag = true;
			for (var x = 0; x < self.list.length; x++) {
				if (self.list[x].getFieldValue("_metadata") === current.$ref) {
					flag = false;
				}
			}
			return flag;
		});
	}
};

module.exports = HasManyEditorController;
