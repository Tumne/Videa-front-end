var HasManyStringEditor = function() {
    return {
        controller: ['blankModalService', function (blankModalService) {
            var self = this;
            this._blankModalService = blankModalService;
            this._modalInstance = null;
            
            this.add = function () {
                var vm = this;
                var createModalOptions = {
                    includeText: 'core/uicomponents/editor/hasManyStringEditor/modal/createHasManyStringModal.html',
                    title: vm.associationTitle,
                    headerText: 'Add New ' + vm.associationTitle,
                    onSubmit: vm.submitModel.bind(vm),
                    onCancel: vm.dismissModal.bind(vm)
                };

                var createModalSettings = {
                    controller: 'createHasManyStringModalController',
                    size: 'md'
                };

                vm._modalInstance = vm._blankModalService.showModal(createModalSettings, createModalOptions);                
            };
            
            this.edit = function(name, index) {
                var association = self.object.getAssociation(self.associationName);
                self.object[association.getReplaceName()](index, name);
            };
            
            this.delete = function(index) {
                self.object[association.getRemoveName()](index);
            };
            
            this.submitModel = function(name) {
                self.object[association.getSetterName()](name);
                self.dismissModal();
            };
            
            this.dismissModal = function () {
                self._modalInstance.dismiss();
            };

            var association = self.object.getAssociation(self.associationName);
            this.rows = self.object[association.getGetterName()]();
        }],
        replace: true,
        controllerAs: 'vm',
        bindToController: {
            'object': '=',
            'associationName': '=',
            'ignore': '=',
            'associationTitle': '='
        },
        scope: {},
        templateUrl: 'core/uicomponents/editor/hasManyStringEditor/hasManyStringEditor.html'
    };
};

module.exports = HasManyStringEditor;