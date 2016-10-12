
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');

var ColorCardEdit = function (){

};

Implements(ColorCardEdit, IView);
ColorCardEdit.prototype = {
    getName: function(){
        return 'colorCardEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;
                this.ready = false;
                var _this = this,
                    color = '#000000';

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    _this.ready = true;

                    if (_this._scope.model.getFieldValue('value')) {
                        color = _this._scope.model.getFieldValue('value');
                    }
                    _this.color = {
                        value: color
                    };
                    // _this.title = _this._scope.model.getFieldValue('value');

                    $scope.$watch(function () {
                        return _this.color.value;
                    }, function (newVal, oldVal) {
                        if (newVal != _this._scope.model.getFieldValue('value')){
                            _this._scope.model.setFieldValue('value', _this.color.value);
                        }
                    });
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/colorCard/colorCardEdit.html'
        };        
    },
    getDirective : function() {
        return '<color-card-edit-component></color-card-edit-component>';
    }
};

module.exports = ColorCardEdit;