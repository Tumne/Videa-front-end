'use strict';

var CastMemberDirectives = function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ngModel) {

			function fromUser(text) {

				var result = [];

				text.split("\n").forEach(function (value){
					result.push({
						Name: value
					});
				});

				return result;
			}

			function toUser(array) {
				if (!array) {
					return;
				}
				var result = [];
				array.forEach(function (castMember){
					result.push(castMember.Name);
				});
				return result.join("\n");
			}

			ngModel.$parsers.push(fromUser);
			ngModel.$formatters.push(toUser);
		}
	};
};

module.exports = CastMemberDirectives;
