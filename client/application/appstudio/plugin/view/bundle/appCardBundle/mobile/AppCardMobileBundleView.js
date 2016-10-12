
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardMobileBundleView = function (){

};

Implements(AppCardMobileBundleView, IView);

AppCardMobileBundleView.prototype = {
	getName: function(){
		return 'appCardMobileBundleViewComponent';
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
			templateUrl: 'appstudio/plugin/view/bundle/appCardBundle/appCardBundleView.html'
		};
	},
	getDirective : function() {
		return '<app-card-mobile-bundle-view-component></app-card-mobile-bundle-view-component>';
	}
};

module.exports = AppCardMobileBundleView;
