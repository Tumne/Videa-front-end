var Purpose = require('core/plugin/Purpose');
var AbstractComplexModelEditor = function () {
	this.listName = 'name';
};

AbstractComplexModelEditor.prototype = {
	getSection: function () {
		return [
			'        <ul class="complex-tab">',
			'        <li ng-repeat="tab in vm.tabs"',
			'            ng-click="vm.switchTab(tab)" ',
			'            ng-class="{active: vm.showTab(tab)}">',
			'            {{tab.title}}',
			'        </li>',
			'        </ul>'
		].join('');
	},
	getGeneral: function () {
		return [
			'            <div ng-if="(vm.activeTab.title == \'General\' && vm.activeTab.active)">',
			'                <object-editor  object="vm.object" ignore="vm.ignore"></object-editor>',
			'            </div>'
		].join('');
	},
	getHasOne: function () {
		return [
			'            <div class="tab-view" ',
			'                 ng-repeat="hasOne in vm.object.getHasOneAssociations()"',
			'                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasOne) && vm.activeTab.active">',
			'                 <plugin-component  ',
			'                               model="vm.object[hasOne._getterName]()" ',
			'                               purpose="vm.purpose.EDIT"',
			'								options="vm.options">',
			'                 </plugin-component>',
			'            </div>'
		].join('');
	},
	getHasMany: function () {
		return [
			'            <div class="tab-view" ',
			'                 ng-repeat="hasMany in vm.object.getHasManyAssociations()"',
			'                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasMany)">',
			'                   <has-many-editor model="vm.object"',
			'                        association-name="hasMany.getName()"',
			'                        list-name="vm.listName"',
			'						 options="vm.options"',
			'                   ></has-many-editor>',
			'            </div>                    '
		].join('');
	},
	getFooter: function () {
		return [].join('');
	},
	getComponentClass: function () {
		//this class helps you add a class to the top level class so you can manipulate the styling for your particular editor
		return '';
	},
	render: function () {
		var section = this.getSection(),
			general = this.getGeneral(),
			hasOne = this.getHasOne(),
			hasMany = this.getHasMany(),
			footer = this.getFooter(),
			componentClass = this.getComponentClass(),
			listName = this.listName;
		return {
			controller: ['$scope', '$state', function ($scope, $state) {
				this._scope = $scope;
				this.purpose = Purpose;

				this.initialize = function () {
					this._metadata = this.object.getFieldValue('_metadata');
					this._ignoreList = (this.ignore) ? this.ignore : [];
					this.hasOneAssociations = this.object.getHasOneAssociations();
					this.hasManyAssociations = this.object.getHasManyAssociations();
					this.fields = this.object.getFields();
					this.activeTab = null;
					this.listName = listName;
					this.schemaPropertyList = Object.keys(this.object.getSchemaProperties()).filter(function (oneProperty) {
						return this._ignoreList.indexOf(oneProperty) < 0;
					}.bind(this));
					this.tabs = [{
						title: 'General',
						active: false,
						show: false
					}];
					for (var i = 0; i < this.hasOneAssociations.length; i++) {
						this.tabs.push({
							title: this.object.getAssociationTitle(this.hasOneAssociations[i]),
							active: false,
							name: this.hasOneAssociations[i].getName()
						});
					}
					for (i = 0; i < this.hasManyAssociations.length; i++) {
						this.tabs.push({
							title: this.object.getAssociationTitle(this.hasManyAssociations[i]),
							active: false,
							name: this.hasManyAssociations[i].getName()
						});
					}

					for (i = 0; i < this.fields.length; i++) {
						if (this.ignore.indexOf(this.fields[i].getName()) < 0) {
							this.tabs[0].show = true;
						}
					}
					if (!(this.tabs.length > 1 && this.tabs[0].show )) {
						this.tabs.shift();
					}

					this.sortTab(this.tabs, this.schemaPropertyList);
					this.activeTab = this.tabs[0];
					this.activeTab.active = true;
				};

				this.retrieveHasOneModel = function (getter) {
					return this.object[getter]();
				};

				this.switchTab = function (tab) {
					this.activeTab.active = false;
					this.activeTab = tab;
					this.activeTab.active = true;
				};

				this.showTab = function (oneTab) {
					return this.activeTab && (this.activeTab.title == oneTab.title);
				};

				this.sortTab = function (oldTab, orderTab) {
					for (var j = 0; j < orderTab.length; j++) {
						for (var k = 0; k < oldTab.length; k++) {
							if (orderTab[j] == oldTab[k].name) {
								var temp = oldTab[j];
								oldTab[j] = oldTab[k];
								oldTab[k] = temp;
							}
						}
					}
				};
				
				this.save = function() {
					this._scope.$emit("ComplexModelEditor-save");	
				};

				this._scope.$watch(function () {
					return this._metadata;
				}.bind(this), function (newObject, oldObject) {
					if (newObject != oldObject) {
						this.initialize();
					}
				}.bind(this));

				this.initialize();
			}],
			replace: true,
			controllerAs: 'vm',
			bindToController: {
				'object': '=',
				'ignore': '=',
				'options': '='
			},
			scope: {},
			template: [
				'<div class="' + componentClass + '">',
				section,
				'<div class="content-editor">',
				general,
				hasOne,
				hasMany,
				'</div>',
				'<div class="clearfix"></div>',
				footer,
				'</div>'].join('')
		};
	}
};
module.exports = AbstractComplexModelEditor;
