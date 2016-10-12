
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var AppCardBundleView = function (){

};

Implements(AppCardBundleView, IView);

AppCardBundleView.prototype = {
	getName: function(){
		return 'appCardBundleViewComponent';
	},
	getDefinition: function(){
		return {
			controller: ['$scope', function($scope){
				this.scope = $scope;
			}],
			controllerAs: 'vm',
			replace: true,
			scope: false,
			templateUrl: 'appstudio/plugin/view/bundle/appCardBundle/appCardBundleView.html'
		};
	},
	getDirective : function() {
		return '<app-card-bundle-view-component></app-card-bundle-view-component>';
	}
};

module.exports = AppCardBundleView;
