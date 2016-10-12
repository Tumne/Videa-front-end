'use strict';


var SearchSuggestionsInputDirective = function ($timeout) {

	function link(scope, element, attrs) {


		function initialize() {
			scope.listOfSuggestions = [];
			scope.fetchingSuggestions = false;
		}

		initialize();

		scope.fetchNewSuggestions = function(){
			if(scope.fetchingSuggestions){
				return;
			}

			fetchSuggestions();
		}

		function fetchSuggestions(){
			scope.fetchingSuggestions = true;

			$timeout(function(){

				scope.getSuggestions().then(function(results){
					var totalSuggestions = results.total;
					scope.listOfSuggestions = [];

					for(var i = 0; i < totalSuggestions; i++){
						var nodeSuggestion = results.data[i];
						scope.listOfSuggestions.push(nodeSuggestion.text);
					}

					scope.fetchingSuggestions = false;
				});
			}, scope.waitForSuggestions);
		}
	}

	return {
		restrict: 'E',
		scope: {
			placeholder : '=',
			waitForSuggestions : '=',
			query : '=',
			getSuggestions : '&',
			performSearch : '&',
			typeAheadWait : '='
		},
		templateUrl: 'cms/view/directive/directives/searchSuggestionsInput.html',
		link: link
	};
};

module.exports = ['$timeout', SearchSuggestionsInputDirective];
