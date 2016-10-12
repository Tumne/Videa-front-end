'use strict';

var ngEnterkeydown = function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnterkeydown);
				});

				event.preventDefault();
			}
		});
	};
};

module.exports = ngEnterkeydown;
