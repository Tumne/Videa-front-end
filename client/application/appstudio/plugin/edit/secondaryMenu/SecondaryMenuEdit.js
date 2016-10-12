var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SecondaryMenuEdit = function (){

};

Implements(SecondaryMenuEdit, IView);

SecondaryMenuEdit.prototype = {
    getName: function(){
        return 'secondaryMenuEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.scope = $scope;
                this.ignore = ['_metadata', 'id', 'createdDate', 'modifiedDate'];
                this.sectionName = 'sections';
                this.name = 'name';
            }],            
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template:[
                  '<div class="secondary-menu">',
                  '   <has-one-object-editor  object="vm.scope.model" ignore="vm.ignore" options="vm.scope.options"></has-one-object-editor>',
                    '<has-many-editor' ,
                    '    model="vm.scope.model"',
                    '    association-name="vm.sectionName"',
                    '    options="vm.scope.options"',
                    '    save-event=""' ,
                    '    empty-state=""' ,
                    '    list-name="vm.name"', 
                    '></has-many-editor>',                  
                  '</div>'                 
            ].join(' ')            
        };
    },
    getDirective : function() {
        return '<secondary-menu-edit-component></secondary-menu-edit-component>';
    }
};

module.exports = SecondaryMenuEdit;
        