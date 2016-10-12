
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');

var ColorFieldEdit = function (){

};

Implements(ColorFieldEdit, IView);
ColorFieldEdit.prototype = {
    getName: function(){
        return 'colorFieldEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;
                this.ready = false;
                var _this = this,
                    color = '#FFFFFF';

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    _this.ready = true;

                    if (_this._scope.model.getFieldValue('value')) {
                        color = _this._scope.model.getFieldValue('value');
                    }
                    _this.color = {
                        value: color
                    };

                    $scope.$watch(function () {
                        return _this.color.value;
                    }, function (newVal, oldVal) {
                        if (newVal != _this._scope.model.getFieldValue('value')){
                            _this._scope.model.setFieldValue('value', _this.color.value);
                            console.log()
                        }
                    });
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/colorField/colorFieldEdit.html'
        };        
    },
    getDirective : function() {
        return '<color-field-edit-component></color-field-edit-component>';
    }
};

module.exports = ColorFieldEdit;