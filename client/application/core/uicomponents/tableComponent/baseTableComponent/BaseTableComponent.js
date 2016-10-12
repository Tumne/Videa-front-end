'using strict'

//Table Component

var Purpose = require('core/plugin/Purpose');
var Digi = require('core/Digi');

var BaseTableComponent = function () {

	this._tableName = 'baseTableComponent';
	this._baseTableClass = 'base-table-component';
	this._tableContainer = 'base-table-container';
	this._headingsContainer = 'base-headings-container';
	this._bodyContainer = 'base-body-container';
	
};

BaseTableComponent.prototype = {
	_getTableClass: function() {
		return "base-table"
	},
	_buildTableComponent: function () {
		return [
			'       <div class="' + this._baseTableClass + '">',
						this._buildTableContainer(),
			'       </div>'
		].join('');
	},
	_buildTableContainer: function() {
		return [
			'       <table ng-class="vm.customClass" class="'+ this._tableContainer + ' ' + this._getTableClass() + '">',
						this._buildHeadingsContainer(),
						this._buildBody(),
			'       </table>'
		].join('');
	},
	_buildHeadingsContainer: function () {
		return [
			'       <thead class="' + this._headingsContainer + '">',
						this._buildHeadingsRow(),
			'       </thead>'
		].join('');
	},
	//Virtual
	_buildHeadingsRow: function () {
		return [
			'<tr>',
				'<td ng-repeat="field in vm.models[0].getFields()" ng-if="vm.ignoredFields.indexOf(field.getName()) < 0">',
					'{{field.getTitle()}}', 
				'</td>',
				'<td ng-repeat="association in vm.models[0].getHasOneAssociations()" ng-if="vm.ignoredFields.indexOf(association.getName()) < 0">',
					'{{vm.models[0].getAssociationTitle(association)}}',
				'</td>',
				'<td>',
					'Actions',
				'</td>',
			'</tr>'
		].join('');
	},
	_buildBody: function() {
		return [
			'       <tbody class="' + this._bodyContainer + '">',
						this._buildRows(),
			'       </tbody>'
		].join('');
	},
	//Virtual
	_buildRows: function () {
		return [
			'<tr ng-repeat="model in vm.models">',
				'<td ng-switch="field.getName()" ng-repeat="field in model.getFields()" ng-if="vm.ignoredFields.indexOf(field.getName()) < 0">',
					'<span class="image-container" ng-switch-when="url" >'+ this._getImageCellLayout('field.value') + '</span>',
					'<span class="" ng-switch-default>{{field.value}}</span>',
				'</td>',
				'<td ng-repeat="association in model.getHasOneAssociations()" ng-if="vm.ignoredFields.indexOf(association.getName()) < 0">',
					'<plugin-component model="model[association.getGetterName()]()" purpose="vm.purpose.VIEW"></plugin-component>',
				'</td>',
				'<td>',
					this._getActionCellLayout(),
				'</td>',
			'</tr>'
		].join('');
	},
	_getActionCellLayout: function () {
		return [
				'<span ng-switch="action.type" ng-repeat="action in vm.actions">',
			'       <button ng-switch-when="generic" class="btn btn-secondary bg-greyblue pull-left" ng-click="action.performAction(model, $parent.$index)">{{action.label}}</button>',
			'       <button ng-switch-when="delete" class="btn btn-icon" ng-click="action.performAction(model, $parent.$parent.$index)">',
			'			<img src="/images/delete-button.svg" class="center-button">			 ',
			'		</button>',
			'       <button ng-switch-when="edit" class="btn btn-icon" ng-click="action.performAction(model, $parent.$parent.$index)">',
			'			<img src="/images/edit-button.svg" class="center-button">			 ',
			'		</button>',
			'   </span>',
		].join('');
	},
	_getImageCellLayout: function (srcStringBinding) {
		//src = field.value - This is bound by angular
		return [
			'       <img class="" ng-src="{{' + srcStringBinding + '}}">',
			'       </img>'
		].join('');
	},
	//Public
	render: function () {

		var self = this;
		
		return {
			controller: ['$scope', '$log', function ($scope, $log) {
				// $log.debug("Created Base Table Component (models, context): ", this.models, self, this);
				
				var vm = this;
				
				vm.purpose = Purpose;
				vm.empty = false;
				
				vm.intitialize = function() {
					
					//Check for valid data
					if(!Digi.isDefined(vm.models) && !Digi.isArray(vm.models)){
						$log.error("Table Component: Model array is not in an expected format: ", vm.models);
					}else if(vm.models.length < 1){
						//The model array is empty, show an empty table
						vm.empty = true;
					}else{
						//Valid model, continue
					}
				};

				vm.intitialize();
				
			}],
			replace: true,
			controllerAs: 'vm',
			bindToController: {
				'models': '=',
				'ignoredFields': '=',
				'ignoredHeadings': '=',
				'actions': '=',
				'options': '=',
				'customClass': '='
			},
			scope: {},
			template: this._buildTableComponent()
		};
	}
};

module.exports = BaseTableComponent;
