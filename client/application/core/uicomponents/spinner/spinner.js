
var Spinner = function () {
    return {
        restrict: 'E',
        templateUrl: 'core/uicomponents/spinner/spinner.html',
        scope: {},
        bindToController: {},
        controller: ['spinnerService', '$scope', function(spinnerService, $scope){
            this.state = spinnerService.loading;
            $scope.$watch(function(){
				return spinnerService.loading;
			}, function (newValue) {
                this.state = newValue;
            }.bind(this), true);
        }],
        controllerAs: 'vm',
        transclude: true
    };
};

module.exports = Spinner;

//TODO: Move to global
