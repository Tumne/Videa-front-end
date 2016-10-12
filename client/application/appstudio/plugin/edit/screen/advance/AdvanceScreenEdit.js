var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');
var AdvanceScreenEdit = function (){

};

Implements(AdvanceScreenEdit, IView);

AdvanceScreenEdit.prototype = {
    getName: function(){
        return 'advanceScreenEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                this._scope = $scope;
                this.purpose = Purpose;

                this.saveScreen = function() {
                    this._scope.options.save(this._scope.model);
                };
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template: [
                '<div>',
                '     <plugin-component  ',
                '       model="vm._scope.model.getCustomData()" ',
                '       purpose="vm.purpose.EDIT"',
                '	    options="vm._scope.options">',
                '     </plugin-component>',    
                '     <br/>',            
                '     <div class="pull-right" style="margin-right:30px;">',
                '       <button class="btn btn-main bg-darkblue" ng-click="vm.saveScreen()">SAVE SCREEN</button>',
                '   </div>',                
                '</div>'
            ].join(' ')
        };        
    },
    getDirective : function() {
        return '<advance-screen-edit-component></advance-screen-edit-component>';
    }
};

module.exports = AdvanceScreenEdit;