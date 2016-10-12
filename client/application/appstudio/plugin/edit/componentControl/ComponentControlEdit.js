
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');

var ComponentControlEdit = function (){

};

Implements(ComponentControlEdit, IView);
ComponentControlEdit.prototype = {
    getName: function(){
        return 'componentControlEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.scope = $scope;
                this.ready = false;
                this.associationName = 'listeners';
                this.association = this.scope.model.getAssociation(this.associationName);
                this.associationTitle = this.scope.model.getAssociationItemTitle(this.associationName);
                this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div class="component-control">',
                '   <object-editor  object="vm.scope.model" ignore="vm.ignore"></object-editor>',
                '       <has-many-object-editor object="vm.scope.model" association-name="vm.associationName" ',
                '        association-title="vm.associationTitle" ignore="vm.ignore" options="options">',
                '       </has-many-object-editor>',
                '</div>'
            ].join(' ')
        };        
    },
    getDirective : function() {
        return '<component-control-edit-component></component-control-edit-component>';
    }
};

module.exports = ComponentControlEdit;