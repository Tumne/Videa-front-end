"use strict";

var MediaService =  function mediaService($q,
										  httpService,
										  Upload,
										  accountService) {
	this._httpService = httpService;
	this._upload = Upload;
	this._accountService = accountService;
	this._q = $q;
	this._url = '/api/v1/accounts/';
	this._resource = '/imagetypes';
};

_.extend(MediaService.prototype, {
	getAccount: function () {
		return this._accountService.getActiveAccount().id;
	},
	addImageType: function (imgType) {
		return this._httpService.doPost(this._url + this.getAccount() + this._resource, imgType);
	},
	listImageTypes: function () {
		return this._httpService.doGet(this._url + this.getAccount() + this._resource);
	},
	uploadImage: function (contentId, fieldId, name, imageType, file) {
		var deferred = this._q.defer();
		this._upload.upload({
			url: this._url + this.getAccount() + '/content/' + contentId + '/values/' + fieldId + '/images?imageType=' + imageType,
			method: 'POST',
			//headers: {'header-key': 'header-value'},
			//withCredentials: true,
			data: {replace: true},
			file: file, // or list of files ($files) for html5 only
			//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
			// customize file formData name ('Content-Disposition'), server side file variable name.
			fileFormDataName: "image", //or a list of names for multiple files (html5). Default is 'file'
			// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
			//formDataAppender: function(formData, key, val){}
		}).progress(function (evt) {
			deferred.notify(parseInt(100.0 * evt.loaded / evt.total));
		}).success(function (data, status, headers, config) {
			// file is uploaded successfully
			deferred.resolve(data);
		}).error(function (data) {
			deferred.reject(data);
		});
		return deferred.promise;
	},
	removeImage: function(contentId, fieldId, imageId){
		return this._httpService.doDelete(this._url + this.getAccount() + '/content/' + contentId + '/values/' + fieldId + '/images/' + imageId);
	},
	applyTemplate: function (url, template) {
		if (!url || typeof url === 'object'){
			return;
		}

		var urlAdd = null;

		// if (template === 'thumb') {
		// 	urlAdd = 'w_200,h_112,c_fill,g_faces/';
		// }
		

		if (urlAdd) {
			var idx = url.indexOf('/upload/') + '/upload/'.length;
			url = url.slice(0,idx) + urlAdd + url.slice(idx);
		}

		return url;
	},
	checkIfIsDictionaryOfImages : function(images){
		var imagesKeys = Object.keys(images);

		if(images) {
			var valuesKeys = Object.keys(images);
			for (var i = 0; i < valuesKeys.length; i++) {
				var key = valuesKeys[i];
				if (!images[key] || images[key] === null) {
					delete images[key];
				}
			}
		}
		
		return images && imagesKeys.length > 0 && images[imagesKeys[0]] && images[imagesKeys[0]].imageType;
	},
	getImageUrl: function (image, template) {
		var url;
		if (!image ||  (typeof image === 'object' && Object.keys(image).length === 0)){
			return this.getNotFoundImageUrl();
		}

		if (this.checkIfIsDictionaryOfImages(image)) {
			var valuesKeys = Object.keys(image);
			
			for(var i = 0; i < valuesKeys.length; i++){
				var key =  valuesKeys[i];
				if(!image[key] || image[key] === null){
					delete image[key];
				}
			}
			
			if (Object.keys(image).length > 0 && image[valuesKeys[0]]){
				url = image[valuesKeys[0]].url;
			} else{
				
				return this.getNotFoundImageUrl();
			}
		} else if(image.url ) {
			url = image.url;
		} else {
			url = image;
		}
		
		return this.applyTemplate(url, template);
	},
	getNotFoundImageUrl: function () {
		return '/images/imagenotfound.png';
	}
});

module.exports = MediaService;
