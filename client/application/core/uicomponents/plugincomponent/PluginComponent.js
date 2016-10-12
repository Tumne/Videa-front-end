
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');

var PluginComponent = function () {
    return {
        restrict: 'E',
        template: '<div dynamichtml="component" class="dynamic" ng-if="ready"></div>',
        scope: {
            model: '=',
            options: '=',
            purpose: '='
        },
        controller: function (viewRegistry, $scope, $log) {
            var editablePurposes = [Purpose.EDIT, Purpose.CREATE],
                viewablePurposes = [Purpose.LIST, Purpose.PREVIEW, Purpose.TABLE, Purpose.LIST];
                
            $scope.ready = false;
            $scope.ignore = ['_metadata', 'id', 'createdDate', 'name', 'modifiedDate'];

            this.initialize = function (){
                $scope.ready = false;
                var plugins = undefined;
                if (Digi.isString($scope.model)) {
                    plugins = viewRegistry.getPlugin($scope.model, $scope.purpose);
                }

                if ($scope.model && Digi.Function.hasFunction($scope.model, 'getFieldValue')) {
                    plugins = viewRegistry.getPlugin($scope.model.getFieldValue('_metadata'), $scope.purpose);   
                }
                
                if (!Digi.isDefined(plugins)) {
                    if ($scope.model != undefined && editablePurposes.indexOf($scope.purpose) > -1) {
                        $scope.component = '<complex-model-editor  object="model" ignore="ignore" options="options"></complex-model-editor>';
                    } else if ($scope.model != undefined && viewablePurposes.indexOf($scope.purpose) > -1) {
                        $scope.component = '<generic-display-view-component  object="model" ignore="ignore"></generic-display-view-component>';
                    } else if ($scope.model === undefined){
                        
                    }else{
                        $scope.component = '';
                        console.log("PluginComponent: Plugin is not registered: ", $scope);                        
                    }
                } else {
                    if($scope.options && typeof $scope.options.prefer !== "undefined" && typeof plugins[$scope.options.prefer] !== "undefined") {
                        $scope.component = plugins[$scope.options.prefer].getView().getDirective();
                    } else {
                        $scope.component = plugins[0].getView().getDirective();
                    }
                }
                $scope.ready = true;
            };
            
            this.initialize();
            
            $scope.$watch('model', function (newValue) {
                this.initialize();
            }.bind(this), false);
            
        }
    };
};

module.exports = PluginComponent;