
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardVersionView = function (){
	
};

Implements(AppCardVersionView, IView);

AppCardVersionView.prototype = {
	getName: function(){
		return 'appCardTvVersionViewComponent';
	},
	getDefinition: function(){
		return {
			controller: ['$scope', function($scope){
				this.scope = $scope;
				this.deviceList = "Roku, PS4, Xbox";
			}],
			controllerAs: 'vm',
			replace: false,
			scope: false,
			templateUrl: 'appstudio/plugin/view/version/appCardVersion/appCardVersionView.html'
		};
	},
	getDirective : function() {
		return '<app-card-tv-version-view-component></app-card-tv-version-view-component>';
	}
};

module.exports = AppCardVersionView;
