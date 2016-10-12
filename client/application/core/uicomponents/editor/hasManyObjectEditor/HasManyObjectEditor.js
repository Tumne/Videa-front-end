var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Actions = require('core/actions/Actions');

var HasManyObjectEditor = function() {
    return {
        controller: ['blankModalService', function (blankModalService) {
            var self = this;
            this._blankModalService = blankModalService;
            this._modalInstance = null;     
            this.width = '200px';  
            this.purpose = Purpose;
			
            var association = self.object.getAssociation(self.associationName),
                anyOf = this.object.getAnyOfTypes(self.associationName);

            if (anyOf.length < 1) {
                anyOf = [{
                    '$ref': self.object.getAssociationRef(self.associationName),
                    'title': self.object.getAssociationItemTitle(self.associationName)
                }];
            }
            this.add = function () {
                var vm = this,
                    createModalOptions = {
                    includeText: 'core/uicomponents/editor/hasManyEditor/modal/createHasManyModal.html',
                    schemaId: '',
                    viewType: 'formView',
                    anyOf: anyOf,
                    itemTitle: '',
                    options: (vm.options)?vm.options:{},
                    headerText: 'Add New ' + Digi.String.capitalizeFirstLetter(vm.associationName),
                    onSubmit: vm.submitModel.bind(vm),
                    onCancel: vm.dismissModal.bind(vm)
                },  createModalSettings = {
                    controller: 'createHasManyModalController',
                    size: 'md'
                };

                vm._modalInstance = vm._blankModalService.showModal(createModalSettings, createModalOptions);                
            };
            
            this.edit = function(obj, index) {
                var vm = this,
                    createModalOptions = {
                    includeText: 'core/uicomponents/editor/hasManyEditor/modal/createHasManyModal.html',
                    schemaId: '',
                    viewType: 'editFormView',
                    anyOf: vm.object.getAnyOfTypes(vm.associationName),
                    itemTitle: '',
                    index: index,
                    model: obj,
                    options: (vm.options)?vm.options:{},
                    headerText: 'Edit ' + Digi.String.capitalizeFirstLetter(vm.associationName),
                    onSubmit: vm.submitEditModel.bind(vm),
                    onCancel: vm.dismissModal.bind(vm)
                },  createModalSettings = {
                    controller: 'createHasManyModalController',
                    size: 'md'
                };
                vm._modalInstance = vm._blankModalService.showModal(createModalSettings, createModalOptions);                
            };
            
            this.delete = function(obj, index) {
                self.object[association.getRemoveName()](index);
            };
            
            this.submitModel = function(obj) {
                self.object[association.getSetterName()](obj);
                this.setTableColumnWidth();
                self.dismissModal();
            };
            
            this.submitEditModel = function(obj, index) {
                var self = this,
                    association = self.object.getAssociation(self.associationName);
                self.object[association.getReplaceName()](index, obj);  
                self.dismissModal();  
                self.rows = self.object[association.getGetterName()]();
            };
            
            this.dismissModal = function () {
                self._modalInstance.dismiss();
            };

            this.setTableColumnWidth = function() {
                if (this.rows.length > 0) {
                    var count = 1,
                        fields = this.rows[0].getFields();
                    for(var i = 0; i < fields.length; i++) {
                        if (this.ignore.indexOf(fields[i].getName()) < 0) {
                            count++;
                        }    
                    }
                    
                    for(i = 0; i < this.rows[0].getHasOneAssociations(); i++) {
                        count++;
                    }
                    
                    this.width = (200/count) + 'px';
                }                
            };

			this.actions = [
				new Actions.EditAction('edit', this.edit, this),
				new Actions.DeleteAction('delete', this.delete, this),
			];
            
            this.rows = self.object[association.getGetterName()]();
            this.setTableColumnWidth();
            
            
        }],
        replace: true,
        controllerAs: 'vm',
        bindToController: {
            'object': '=',
            'associationName': '=',
            'ignore': '=',
            'associationTitle': '=',
            'options': '='
        },
        scope: {},
        templateUrl: 'core/uicomponents/editor/hasManyObjectEditor/hasManyObjectEditor.html'
    };
};

module.exports = HasManyObjectEditor;
