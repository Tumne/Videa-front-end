
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardTVBundleView = function (){

};

Implements(AppCardTVBundleView, IView);

AppCardTVBundleView.prototype = {
	getName: function(){
		return 'appCardTvBundleViewComponent';
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
			templateUrl: 'appstudio/plugin/view/bundle/appCardBundle/appCardBundleView.html'
		};
	},
	getDirective : function() {
		return '<app-card-tv-bundle-view-component></app-card-tv-bundle-view-component>';
	}
};

module.exports = AppCardTVBundleView;
