'use strict';

var ImageContentFieldDirective = function ($uibModal, mediaService) {

	function link(scope, element, attrs) {

		function initialize() {

			scope.value = scope.value || {};
			
			scope.orderByValue = '';
			scope.orderAsc = true;
			scope.allSelected = false;
			scope.showEditImgName = false;
			scope.imgTypes = [];

			removeNulls();
			
			//get all image types
			mediaService.listImageTypes().then(function (results) {
				scope.imgTypes = results.data;
			});
		}

		function removeNulls(){
			var valuesKeys = Object.keys(scope.value);
			for(var i = 0; i < valuesKeys.length; i++){
				var key =  valuesKeys[i];
				if(!scope.value[key] || scope.value[key] === null){
					delete scope.value[key];
				}
			}
		}
		//Force show form to disable click to edit behavior
		scope.showForm = true;

		scope.tryToEdit = function () {
			if (scope.edit !== 'view') {
				scope.focusInput = true;
				scope.showForm = true;
			}
		};

		scope.getImageUrl = function (url) {
			return mediaService.getImageUrl(url, 'thumb');
		};

		scope.getImageTypeTitle = function (imageTypeId) {
			for (var t in scope.imgTypes) {
				if (scope.imgTypes[t].id === imageTypeId) {
					return scope.imgTypes[t].name;
				}
			}
			return "";
		};

		scope.changeImgType = function (imgData, imgType) {

			imgData.imageType = imgType.id;
			$('.dropdown.open .dropdown-toggle').dropdown('toggle');

			scope.onupdate({contentId: scope.contentId, field: scope.field, value: scope.value});
		};

		scope.changeOrder = function (orderName) {

			if (scope.orderAsc && orderName === scope.orderByValue) {
				scope.orderAsc = false;
				scope.orderByValue = '-' + orderName;
			} else {
				scope.orderAsc = true;
				scope.orderByValue = orderName;
			}

		};

		scope.toggleAll = function () {
			scope.allSelected = !scope.allSelected;

			scope.value.forEach(function (item) {
				item.selected = scope.allSelected;
			});
		};

		scope.saveNewImageName = function (img) {

			if (img.newName !== img.name) {
				img.name = img.newName;

				scope.onupdate({contentId: scope.contentId, field: scope.field, value: scope.value});
			}
		};
		
		scope.removeImage = function(img){
			mediaService.removeImage(scope.contentId, "images."+ img.imageType, img.id).then(function(){
				delete scope.value[img.imageType];
			});
		};

		scope.openAddImageModal = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentField/contentNode/addImage.html',
				controller: 'addImageModalController',

				resolve: {
					contentId: function () {
						return scope.contentId;
					},
					field: function () {
						return scope.field;
					}
				}
			});

			modalInstance.result
				.then(function (obj) {

					if (!scope.value) {
						scope.value = {};
					}
					
					for (var i = 0; i < obj.length; i++) {
						scope.value[obj[i].imageType] = obj[i];
					}

					scope.onupdate({contentId: scope.contentId, field: scope.field, value: scope.value});

				}, function () {

				});
		};

		scope.openAddImageTypeModal = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'cms/view/modal/contentField/contentNode/addImageType.html',
				controller: 'addImageTypeModalController',

				resolve: {}
			});

			modalInstance.result
				.then(function (imageType) {

					if (imageType) {
						scope.imgTypes.push(imageType);
					}

				}, function () {

				});
		};

		initialize();
	}

	return {
		restrict: 'E',
		scope: {
			contentId: '=contentid',
			value: '=value',
			field: '=field',
			edit: '=edit',
			expanded: '=expanded',
			onupdate: '&onupdate'
		},
		templateUrl: 'cms/view/directive/contentField/contentNode/imageContentField.html',
		link: link
	};
};

module.exports = ['$uibModal', 'mediaService', ImageContentFieldDirective];
