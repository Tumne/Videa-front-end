'use strict'

var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var _ = require('underscore');

var AppNavigationEditorController = function ($scope,
											 $log,
											 modelFactory,
											 modelOperation,
											 blankModalService,
											 confirmationModalService,
											 $q) {
	//Available from the scope:
	//model
	//options

	var self = this;

	//Services
	this._modelFactory = modelFactory;
	this._scope = $scope;
	this._log = $log;
	this._blankModalService = blankModalService;
	this._confirmationModalService = confirmationModalService;
    this._modelOperation = modelOperation;
	this._q = $q;
	this._modalInstance = null;
	this.dirty = false;
    this.options = this._scope.options;
    this.options.prefer = 0;
	//ViewModel
	this.dataReady = false;
	this.purpose = Purpose;
	this.model = this._scope.model;
	this.mainMenu = this.model.getHasOneAssociations()[0];
	this.mainMenuGetter = this.mainMenu.getGetterName();
	this.mainMenuModel = this.model[this.mainMenuGetter](); //ex. _mainMenu
    this.sectionName = 'section';
    this.name = 'name';
	//RadioList
	this.navigationTypeModels = []; //used in the radio list
	this.selectedNavigationType = {};
	
	this.setSelectedNavigationType = function (model) {
		this.dirty = true;
		self.model[this.mainMenu.getSetterName()](model);
	};

	//Sections List
	this.sectionsAssociation = this.model.getHasManyAssociations()[0];
	this.sections = this.model.getSections();
	
	this.screens = this._scope.options.screens;

	this._init();
};

_.extend(AppNavigationEditorController.prototype, {

	_init: function () {

		var vm = this,
			mainMenuAssociation = vm.mainMenu;

		var modelTypes = mainMenuAssociation.getModelType(),
			listModels = [],
			promises = [],
			mainMenuObject = vm.model.getMainMenu(),
			editOneOfPurposeSchema = '';

		//Check if the model has a set OneOf association
		if (Digi.isDefined(vm.mainMenuModel)) {
			editOneOfPurposeSchema = mainMenuObject.getFieldValue('_metadata');
		}

		//Loop through each OneOf association in the model
		_.each(modelTypes, function (schema) {

			//Get all the OneOf models to populate the view.
			promises.push(vm._modelFactory.create(schema).then(function (model) {
				
				//Check if the schema name matches the object being selected. If so, set selected model.
				if (editOneOfPurposeSchema === schema) {
					vm.selectedNavigationType = model;
				}
				return listModels.push(model);
			}));

		});
		
		//promises.push(vm.getSectionModels());

		this._q.all(promises).then(function () {
			vm.navigationTypeModels = vm.navigationTypeModels.concat(listModels);
            vm._modelOperation.populateHasOne(vm.model).then(function(){
                    vm.dataReady = true;
                    console.log(vm.model);
            });
		});
	},
	getSectionModel: function (rawJsonData) {
		
		var vm = this;
		
		return vm._modelFactory.create(this.sectionsAssociation.getModelType(), rawJsonData).then(function (model) {
			//Section HasMany OneOf Model
			//console.log('Got Section Model: ', model);
			return model;
		});
	},
	getSectionModels: function() {
		
		var vm = this;

		var sections = this.model.getSections(),
			sectionModels = [],
			promises = [];
		
		_.each(sections, function(section) {

			//Get all the OneOf models to populate the view.
			promises.push(vm._modelFactory.create(section._metadata).then(function (model) {
				return sectionModels.push(model);
			}));
			
		});

		this._q.all(promises).then(function () {
			vm.sections = sectionModels;
			return vm.sections;
		});
		
	},
	addSection: function () {
		var self = this;
		
		this.getSectionModel().then(function (model) {
			self.sectionModel = model;
			self.dirty = true;
			self._openAddSectionModal();
		});
	},
	editSection: function (index, section) {
		this._openEditSectionModal(index, section);
	},
	deleteSection: function(index, section) {
		this._confirmationModalService.showModal({},{
			actionButtonText: 'DELETE',
			headerText: 'Delete',
			bodyText: 'Are you sure you want to delete this section?'
		}).then(function(){
			this.dirty = true;
			this.model.removeSection(index);
		}.bind(this));
	},
	reorderSectionUp: function(index) {
		this.dirty = true;
		this.model.reorderSection(index, index+1);
	},
	reorderSectionDown: function(index) {
		this.dirty = true;
		this.model.reorderSection(index, index-1);
	},
	save: function(){
		console.log("Calling save from AppNavPlugin");
		this._scope.$emit('uiConfig-save');
	},
	_openAddSectionModal: function () {
		var self = this;

		var editAppModalOptions = {
			includeText: 'appstudio/view/modal/appNavigation/addSectionModal.html',
			headerText: 'Add A Section',
			modalType: 'new',
			onSubmit: self._addNewSection.bind(self),
			onCancel: self._dismissModal.bind(self),
			sectionModel: self.sectionModel,
			screenModels: self.screens,
            options: self.options,
			ignore: ['id', '_metadata', 'screenId', 'menuHeader', 'menuLabel', 'createdDate', 'modifiedDate']
		};
		var editAppModalSettings = {
			controller: 'addSectionModalController',
			size: 'md'
		};

		self._modalInstance = self._blankModalService.showModal(editAppModalSettings, editAppModalOptions);
	},
	_addNewSection: function (section) {
		//TODO: Modal Validation once the modelFactory supports it.

		this._scope.model.addSection(section);

		this.sections = this.model.getSections();
		
		console.log("Sections: ", this.sections);

		this._modalInstance.close();
	},
	_openEditSectionModal: function (index, section) {
		var self = this;

		var editAppModalOptions = {
			includeText: 'appstudio/view/modal/appNavigation/addSectionModal.html',
			headerText: 'Edit ' + section.getFieldValue('name'),
			modalType: 'edit',
			onSubmit: self._editSection.bind(self),
			onCancel: self._dismissModal.bind(self),
			sectionModel: section,
			screenModels: self.screens,
			ignore: ['id', '_metadata', 'screenId', 'menuHeader', 'menuLabel', 'createdDate', 'modifiedDate'],
			index: index
		};
		var editAppModalSettings = {
			controller: 'addSectionModalController',
			size: 'md'
		};

		self._modalInstance = self._blankModalService.showModal(editAppModalSettings, editAppModalOptions);
	},
	_deleteSection: function (index, section) {
		this.model.removeSection(index);
		this.dirty = true;
		this._modalInstance.close();
	},
	_editSection: function (section) {
		//TODO: Find a clean way of editing a hasMany association.
		this.dirty = true;
		this._modalInstance.close();
	},
	_dismissModal: function () {
		this._modalInstance.dismiss();
	}
});

module.exports = AppNavigationEditorController;
