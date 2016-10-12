
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var FeedEdit = function (){

};

Implements(FeedEdit, IView);

FeedEdit.prototype = {
    getName: function(){
        return 'feedEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;
                this.ready = false;
                this.ignore = ['_metadata', 'id', 'name', 'createdDate', 'modifiedDate'];
                var _this = this,
                    beginIndex = 1,
                    endIndex = 20;

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    _this.ready = true;

                    if (_this._scope.model.getRange().getFieldValue('beginIndex')){
                        beginIndex = _this._scope.model.getRange().getFieldValue('beginIndex');
                    }

                    if (_this._scope.model.getRange().getFieldValue('endIndex')){
                        endIndex = _this._scope.model.getRange().getFieldValue('endIndex');
                    }

                    _this.slide = {
                        minValue: beginIndex,
                        maxValue: endIndex,
                        options: {
                            floor: 1,
                            ceil: 100,
                            draggableRange: true,
                            onChange: function(){
                                _this._scope.model.getRange().setFieldValue('beginIndex', _this.slide.minValue);
                                _this._scope.model.getRange().setFieldValue('endIndex', _this.slide.maxValue);
                            }
                        }
                    };
                });
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/feed/feed.html'
        };
    },
    getDirective : function() {
        return '<feed-edit-component></feed-edit-component>';
    }
};

module.exports = FeedEdit;