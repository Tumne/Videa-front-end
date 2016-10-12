var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');
var GenericDisplayView = function (){

};

Implements(GenericDisplayView, IView);

GenericDisplayView.prototype = {
    getName: function(){
        return 'genericDisplayViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.ready = true;
                this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
                this.scope = $scope;
                this.purpose = Purpose;
                this.retrieveHasOneModel = function(getter) {
                  return this.object[getter]();
                };
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div class="display-view-component">',
                '   <div ng-repeat="oneField in vm.scope.model.getFields()" ng-if="vm.ignore.indexOf(oneField.getName()) < 0">',
                '       <div class="title">{{oneField.getTitle()}}:</div>',
                '       <div class="content">&nbsp;{{oneField.value}}</div>',
                '   </div>',
                '    <div class="has-one-component" ng-repeat="hasOneField in vm.scope.model.getHasOneAssociations()">',
                '       <plugin-component ',
                '                 model="vm..retrieveHasOneModel(hasOneField._getterName)" ',
                '                 purpose="vm.purpose.VIEW"',
                '	     	      options="{}">',
                '       </plugin-component>',      
                '   </div>',  
                '    <div ng-repeat="hasManyField in vm.scope.model.getHasManyAssociations()">',
                '       <div ng-if="vm.scope.model.getAssociationModelType(hasManyField.getName()) == \'string\'">',
                '           <has-many-string-editor object="vm.scope.model" association-name="hasManyField.getName()" association-title="hasManyField.getItemTitle()" ignore="vm.ignore"></has-many-string-editor>',
                '       </div>',
                '       <div ng-if="vm.scope.model.getAssociationModelType(hasManyField.getName()) != \'string\'">',
                '           <has-many-object-editor object="vm.scope.model" association-name="hasManyField.getName()" association-title="hasManyField.getItemTitle()" ignore="vm.ignore"></has-many-object-editor>',
                '       </div>',            
                '    </div>',                         
                '</div>'
            ].join('')
        };
    },
    getDirective : function() {
        return '<generic-display-view-component></generic-display-view-component>';
    }
};

module.exports = GenericDisplayView;