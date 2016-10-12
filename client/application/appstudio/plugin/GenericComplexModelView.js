var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var GenericEdit = function (){

};

Implements(GenericEdit, IView);

GenericEdit.prototype = {
    getName: function(){
        return 'genericComplexModelEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.ready = true;
                this.ignore = ['_metadata', 'id', 'createdDate', 'modifiedDate'];
                this.scope = $scope;

            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div>',
                '   <complex-model-editor  object="vm.scope.model" ignore="vm.ignore" options="vm.scope.options"></complex-model-editor>',
                '</div>'
            ].join('')
        };
    },
    getDirective : function() {
        return '<generic-complex-model-edit-component></generic-complex-model-edit-component>';
    }
};

module.exports = GenericEdit;