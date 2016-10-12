
var IView = require('core/plugin/IView');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');

var FontEdit = function (){

};

Implements(FontEdit, IView);

FontEdit.prototype = {
    getName: function(){
        return 'fontEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;
                this.ready = false;
                this.purpose = Purpose;
                this.ignore = ['id', '_metadata', 'name', 'createdDate', 'modifiedDate'];       
                var _this = this;
                modelOperation.populateHasOne(this._scope.model).then(function(){
                    _this.ready = true;
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/font/font.html'
        };
    },
    getDirective : function() {
        return '<font-edit-component></font-edit-component>';
    }
};

module.exports = FontEdit;