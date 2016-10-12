
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardTabletBundleView = function (){

};

Implements(AppCardTabletBundleView, IView);

AppCardTabletBundleView.prototype = {
	getName: function(){
		return 'appCardTabletBundleViewComponent';
	},
	getDefinition: function(){
		return {
			controller: ['$scope', function($scope){
				this.scope = $scope;
				this.deviceList = "iPad, Android Tablet";
			}],
			controllerAs: 'vm',
			replace: false,
			scope: false,
			templateUrl: 'appstudio/plugin/view/bundle/appCardBundle/appCardBundleView.html'
		};
	},
	getDirective : function() {
		return '<app-card-tablet-bundle-view-component></app-card-tablet-bundle-view-component>';
	}
};

module.exports = AppCardTabletBundleView;
