    'use strict';

	var ContentTypeFieldController = function contentTypeFieldController($scope) {

        var initialValue;
        var escapePressed = false;

        $scope.isContentType = false;

        $scope.saveCallback = function () {

            console.log("SAVE! callback --------- ");
            console.log($scope.contentId);
            console.log($scope.field);
            console.log($scope.value);

            if (!escapePressed) {
                //TODO			$scope.onupdate({ contentId: $scope.contentId, field: $scope.field, value: $scope.value });
                $scope.showForm = false;
                escapePressed = false;
            }
        };

        $scope.cancelCallback = function () {
            $scope.value = initialValue;
            escapePressed = true;
            $scope.showForm = false;
        };

        $scope.setEscapeToDefault = function () {
            escapePressed = false;
        };

        $scope.tryToEdit = function () {
            if ($scope.edit !== 'view') {
                $scope.focusInput = true;
                $scope.showForm = true;
            }
        };

        function initialize() {

            if ($scope.value) {
                initialValue = angular.copy($scope.value);
                $scope.isContentType = false;
            }
            else if ($scope.field && $scope.field.fieldType) {
                $scope.value = $scope.field.fieldType;
                $scope.isContentType = true;
            }

            if ($scope.edit === 'edit') {
				$scope.showForm = true;
			}
        }

        initialize();
    };
	
	module.exports = ['$scope', ContentTypeFieldController];
