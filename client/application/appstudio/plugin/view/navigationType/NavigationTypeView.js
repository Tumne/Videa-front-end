var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');

var NavigationTypeView = function () {

};

Implements(NavigationTypeView, IView);

NavigationTypeView.prototype = {
    getName: function(){
        return 'navigationTypeViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope','$log', function($scope, $log){
                //Get the type of menu from the schema
                // console.log($scope.model);
                // console.log($scope.model.getFieldValue("_metadata"));

                this.type = $scope.model.getFieldValue("_metadata").split('.').splice(-1)[0];
                // console.log(this.type);
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/view/navigationType/navigationTypeView.html'
        };        
    },
    getDirective : function() {
        return '<navigation-type-view-component></navigation-type-view-component>';
    }
};

module.exports = NavigationTypeView;



