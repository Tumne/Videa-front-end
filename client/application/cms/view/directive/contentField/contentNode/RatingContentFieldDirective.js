'use strict';

var RatingContentFieldDirective = function () {
	return {
		restrict: 'E',
		scope: {
			contentId: '=contentid',
			value: '=value',
			field: '=field',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentField/contentNode/ratingContentField.html',
		controller: 'contentFieldController',
		link: function(scope, element, attributes) {

			updateStars();
			
			function updateStars() {
				scope.stars = [];
				for (var i = 0; i < 10; i++) {
					scope.stars.push({
						filled: i < scope.value
					});
				}
			}
			
			scope.toggle = function(index) {
				if(scope.showForm) {
					scope.value = index + 1;
					updateStars();
					scope.saveCallback();
					scope.showForm = false;
				}
				
			};
			
		}
	};
};

module.exports = RatingContentFieldDirective;
