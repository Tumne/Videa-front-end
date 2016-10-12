
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');

var ColorFontEdit = function (){

};

Implements(ColorFontEdit, IView);
ColorFontEdit.prototype = {
    getName: function(){
        return 'colorFontEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;
                this.ready = false;
                var _this = this,
                    color = '#000000';

                // modelOperation.populateHasOne(this._scope.model).then(function(){
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
                        }
                    });
                // });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/colorFont/colorFontEdit.html'
        };        
    },
    getDirective : function() {
        return '<color-font-edit-component></color-font-edit-component>';
    }
};

module.exports = ColorFontEdit;