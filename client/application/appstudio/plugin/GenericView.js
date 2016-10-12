var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var GenericEdit = function (){

};

Implements(GenericEdit, IView);

GenericEdit.prototype = {
    getName: function(){
        return 'genericEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.ready = true;
                this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
                this.scope = $scope;

            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div>',
                '   <object-editor  object="vm.scope.model" ignore="vm.ignore"></object-editor>',
                '</div>'
            ].join('')
        };
    },
    getDirective : function() {
        return '<generic-edit-component></generic-edit-component>';
    }
};

module.exports = GenericEdit;