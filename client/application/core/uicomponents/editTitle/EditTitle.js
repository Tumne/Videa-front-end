var EditTitle = function () {
    return {
        restrict: 'E',
        templateUrl: 'core/uicomponents/editTitle/editTitle.html',
        scope: {
            title: '=',
            savetitle: '&',
            index: '='
        },
        transclude: true,
        link: function ( $scope, element) {
            // Let's get a reference to the input element, as we'll want to reference it.
            var inputElement = angular.element(element.children()[1]);

            // This directive should have a set class so we can style it.
            element.addClass('edit-title');

            // Initially, we're not editing.
            $scope.editing = false;
	        var cleanText = ''; 
            // ng-click handler to activate edit-in-place
            $scope.edit = function () {
                cleanText = inputElement[0].value;
                $scope.editing = true;
                // We control display through a class on the directive itself. See the CSS.
                element.addClass('active');

                // And we must focus the element.
                // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                // we have to reference the first element in the array.
                inputElement[0].focus();
            };

            // When we leave the input, we're done editing.
            inputElement.bind('blur', function() {
                $scope.editing = false;
                element.removeClass('active');

                if (inputElement[0].value.length > 0){
                    if ($scope.index != undefined) {
                        $scope.savetitle()(inputElement[0].value, $scope.index);    
                    } else {
                        $scope.savetitle()(inputElement[0].value);    
                    }
                } else {
                    inputElement[0].value = cleanText;
                    $scope.title = cleanText;
                }
                $scope.$apply();
            });
        }
    };
};

module.exports = EditTitle;
