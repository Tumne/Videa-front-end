    'use strict';

    var ContentNodeAvailabilityDirective = function ($window, $filter, $uibModal, pageContext, contentNodeService, bucketService) {

        function link(scope, element, attrs) {

            var availabilityBackup = null;

            function initialize() {
                scope.isLoading = false;

                scope.globalBucketList = null;
                scope.selectedBucket = null;
                scope.selectedIndex = 0;
                scope.initDate = new Date();
                scope.isAvailabilityTouched = false;
				
				
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

            scope.selectedBucketChanged = function () {

                //set new bucketId index on selectedIndex

                if (scope.selectedBucket && typeof scope.selectedBucket.id !== 'undefined') {

                    for (var idx = 0; idx < scope.globalBucketList.length; idx++) {
                        var item = scope.globalBucketList[idx];
                        if (item.id === scope.selectedBucket.id) {
                            scope.selectedIndex = idx;
                            break;
                        }
                    }
                }
            };


            scope.changeCalendar = function (calendar) {
                for (var key in scope.calendar) {
					if(scope.calendar.hasOwnProperty(key)) {
						scope.calendar[key] = false;
					}
                }
				
                scope.calendar[calendar] = true;
            };

            scope.toogleAvailabilityModal = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'cms/view/modal/contentNode/contentNodeAvailabilityModal.html',
                    controller: 'contentnodeAvailabilityModalController',
                    windowClass: 'modal-mid-width',
                    resolve: {
                        globalBucketList: function () {
                            return scope.globalBucketList;
                        },
                        content: function () {
                            return scope.content;
                        }
                    }
                });

                modalInstance.result
                    .then(function (result) {

                        var newList = [];
                        for (var i = 0; i < result.length; i++) {
                            var newR = angular.copy(result[i]);

                            if (!newR.selected || !newR.fromDate) {
                                newR.fromDate = null;
                                newR.expireDate = null;
                            }

                            newList.push(newR);
                        }
                        scope.globalBucketList = newList;
                        resetSelectedBucket();
                        scope.updateAvailability();

                    }, function () {

                    });
            };

            scope.touchAvailabilityToQuickChange = function () {
                scope.selectedBucket.selected = true;
                scope.isAvailabilityTouched = true;
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

            scope.updateAvailability = function () {

                var availabilityList = [];

                for (var i = 0; i < scope.globalBucketList.length; i++) {
                    var item = scope.globalBucketList[i];
					var bucketObj = {};

                    if (typeof item.selected !== "undefined" && item.selected && typeof item.fromDate !== "undefined") {

                        bucketObj = {
                            bucketId: item.id
                        };

                        bucketObj.fromDate = item.fromDate ? new Date(item.fromDate) : null;
                        bucketObj.expireDate = item.expireDate ? new Date(item.expireDate) : null;

                        availabilityList.push(bucketObj);
                    } else {

                        bucketObj = {
                            bucketId: item.id,
                            fromDate: null,
                            expireDate: null
                        };
                    }
                }
                updateAvailabilityCallback(availabilityList);
            };

            var updateAvailabilityCallback = function (availabilityList) {

                scope.isAvailabilityTouched = false;

                if (scope.onupdate) {
					scope.onupdate({contentId: scope.content.id, availabilityList: availabilityList});
				}
            };

            var populateNode = function () {

                if (scope.content) {
                    bucketService.list().then(function (results) {
                        scope.globalBucketList = results.data;

                        //add data
                        for (var globalIdx = 0; globalIdx < scope.globalBucketList.length; globalIdx++) {
                            var globalItem = scope.globalBucketList[globalIdx];

                            if (scope.content && scope.content.availability) {
                                for (var nodeIdx = 0; nodeIdx < scope.content.availability.length; nodeIdx++) {
                                    var nodeItem = scope.content.availability[nodeIdx];

                                    if (globalItem.id === nodeItem.bucketId) {

                                        globalItem.selected = true;
                                        globalItem.fromDate = nodeItem.fromDate ? new Date(nodeItem.fromDate) : null;
                                        globalItem.expireDate = nodeItem.expireDate ? new Date(nodeItem.expireDate) : null;
                                        break;
                                    }
                                }
                            }
                        }

                        //set initial availability data
                        if (scope.globalBucketList && scope.globalBucketList.length > 0) {

                            scope.globalBucketList = $filter('orderBy')(scope.globalBucketList, 'name');
                            availabilityBackup = angular.copy(scope.globalBucketList);
                            resetSelectedBucket();
                        }

                    });
                }
            };
        }

        return {
            restrict: 'E',
            scope: {
                content: '=',
                action: '=',
                expanded: '=',
                onupdate: '&onupdate'
            },
            templateUrl: 'cms/view/directive/contentNode/contentNodeAvailabilityDirective.html',
            link: link
        };
    };

module.exports = ['$window', '$filter', '$uibModal', 'pageContext', 'contentNodeService', 'bucketService', ContentNodeAvailabilityDirective];
