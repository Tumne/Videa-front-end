var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var AdsEdit = function (){

};

Implements(AdsEdit, IView);

AdsEdit.prototype = {
    getName: function(){
        return 'adsEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this.ready = true;
                this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
                this.scope = $scope;
				
				this.save = function() {
					this.scope.$emit('uiConfig-save');
				};

            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div>',
                '    <complex-model-editor  object="vm.scope.model" ignore="vm.ignore" options="vm.scope.options"></complex-model-editor>',
                '   	<div class="save-button--bar">',
                '   		<button class="btn btn-main bg-darkblue" ng-click="vm.save()">SAVE</button>',
                '   	</div>',                
                '</div>'
            ].join(' ')
        };
    },
    getDirective : function() {
        return '<ads-edit-component></ads-edit-component>';
    }
};

module.exports = AdsEdit;
