
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardVersionView = function (){
	
};

Implements(AppCardVersionView, IView);

AppCardVersionView.prototype = {
	getName: function(){
		return 'appCardMobileVersionViewComponent';
	},
	getDefinition: function(){
		return {
			controller: ['$scope', function($scope){
				this.scope = $scope;
				this.deviceList = "iPhone, Android";
			}],
			controllerAs: 'vm',
			replace: false,
			scope: false,
			templateUrl: 'appstudio/plugin/view/version/appCardVersion/appCardVersionView.html'
		};
	},
	getDirective : function() {
		return '<app-card-mobile-version-view-component></app-card-mobile-version-view-component>';
	}
};

module.exports = AppCardVersionView;
