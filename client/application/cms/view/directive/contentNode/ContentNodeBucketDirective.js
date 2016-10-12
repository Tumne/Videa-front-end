'use strict';

var ContentNodeBucketDirective = function ($window, $filter, $uibModal, contentNodeService) {

	function link(scope, element, attrs) {

		var availabilityBackup = null;

		function initialize() {
			scope.isLoading = false;

			scope.globalBucketList = null;
			scope.selectedBucket = null;
			scope.selectedIndex = 0;

			scope.bucketsChanged = {};
			scope.calendar = {};
			populateNode();
		}


		scope.$watch('content', function () {
			initialize();
		});


		scope.getBucketName = function (bucketId) {
			if (!scope.globalBucketList) {
				return "";
			}

			for (var i = 0; i < scope.globalBucketList.length; i++) {
				var bucket = scope.globalBucketList[i];
				if (bucketId === bucket.id) {
					return bucket.name;
				}
			}
			return "";
		};

		scope.changeCalendar = function (calendar) {
			for (var key in scope.calendar) {
				if(scope.calendar.hasOwnProperty(key)) {
					scope.calendar[key] = false;
				}
			}
			scope.calendar[calendar] = true;
		};

		var resetSelectedBucket = function () {
			if (scope.globalBucketList) {
				scope.selectedIndex = 0;
				scope.selectedBucket = scope.globalBucketList[scope.selectedIndex];
			} else {
				scope.selectedIndex = -1;
				scope.selectedBucket = null;
			}
		};

		scope.cancelCallback = function () {

			//replace from old data
			scope.globalBucketList = angular.copy(availabilityBackup);
			resetSelectedBucket();
			scope.isAvailabilityTouched = false;
		};


		var updateAvailabilityCallback = function (availabilityList) {
			if (scope.onupdate) {
				var contentId = scope.data ? scope.data.id : undefined;
				scope.onupdate({contentId: contentId, availabilityList: availabilityList});
			}
		};

		scope.updateSpecificAvailabilityCallback = function(index){
			var availability = scope.availabilities[index];
			availability.fromDate = $filter('date')(availability.fromDate, "yyyy-MM-dd");
			availability.expireDate = $filter('date')(availability.expireDate, "yyyy-MM-dd");
			scope.data.availabilities[index] = availability;
			scope.availabilities[index] = availability;
			updateAvailabilityCallback(scope.data.availabilities);
		};

		scope.updateAvailabilitiesCallback = function(bucketId, fromDate, expireDate){

			scope.availabilities[scope.lastIndex].bucketId = bucketId;
			scope.availabilities[scope.lastIndex].fromDate = $filter('date')(fromDate, "yyyy-MM-dd");
			scope.availabilities[scope.lastIndex].expireDate = $filter('date')(expireDate, "yyyy-MM-dd");
			scope.data.availabilities = scope.availabilities;
			updateAvailabilityCallback(scope.availabilities);
			scope.lastIndex = -1;
		};

		scope.addNewAvailabilityCallback = function(bucketId, fromDate, expireDate, name){

			var availability = {};
			availability.bucketId = bucketId;
			availability.fromDate = $filter('date')(fromDate, "yyyy-MM-dd");
			availability.expireDate = $filter('date')(expireDate, "yyyy-MM-dd");
			console.log("FROM DATA", fromDate);
			console.log("availability", availability);

			if(name) {
				scope.bucketsNames[bucketId] = name;
			}
			if(!scope.availabilities){
				scope.availabilities = [];
			}

			scope.availabilities.push(availability);
			//scope.data.availabilities = scope.availabilities;
			updateAvailabilityCallback(scope.availabilities);
		};

		scope.addEditAvailabilityInContentNode = function(index, edit){

			scope.lastIndex = index;
			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentNode/contentNodeBucketPickerModal.html',
				controller: 'contentNodeBucketPickerModalController',

				resolve: {
					values : function(){
						if(scope.lastIndex || scope.lastIndex === 0){
							return scope.availabilities[scope.lastIndex];
						}
						else {
							return {};
						}
					},
					edit : function(){return edit;},
					saveFunction: function(){
						if(edit){
							return scope.updateAvailabilitiesCallback;
						}
						return scope.addNewAvailabilityCallback;
					},
					bucketsData : function(){ return scope.bucketsData;},
					bucketsNames : function(){ return scope.bucketsNames;}
				}
			});

			modalInstance.result
				.then(function (data) {
					if (data) {
						scope.pageChanged();
					}
				}, function () {
				});
		};

		scope.deleteBucketInContentNode = function(index){

			if(scope.availabilities[index]!== undefined) {
				var preAvailabilities =  JSON.parse(JSON.stringify(scope.availabilities));
				scope.availabilities.splice(index, 1);
				scope.data.availabilities = scope.availabilities;

				if (scope.onupdate) {
					scope.onupdate({contentId: scope.data.id, availabilityList: scope.availabilities}).then(function(result){
						},
						function(){
							scope.availabilities = preAvailabilities;
							scope.data.availabilities = scope.availabilities;
						});
				}
			}
		};

		var populateNode = function () {
			if (scope.content) {
				if (scope.content.availabilities) {
					scope.availabilities = scope.content.availabilities;
					scope.data = scope.content;
				}

				if (scope.content.id) {
					contentNodeService.get(scope.content.id).then(function (data) {
							scope.data = data;
							scope.availabilities = data.availabilities;
						},
						function () {
							//TODO
						});
				}
			}
		};
	}

	return {
		restrict: 'E',
		scope: {
			content: '=',
			action: '=',
			expanded: '=',
			onupdate: '&onupdate',
			bucketsData : '=',
			bucketsNames : '='
		},
		templateUrl: 'cms/view/directive/contentNode/contentNodeBucketDirective.html',
		link: link
	};
};

module.exports = ['$window', '$filter', '$uibModal', 'contentNodeService', ContentNodeBucketDirective];
