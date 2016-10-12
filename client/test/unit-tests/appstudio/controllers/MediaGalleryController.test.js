//var q = require('q');
//var chai = require('chai');
//var BrandModel = require("appstudio/model/BrandModel.js");
//var MediaGalleryController = require('appstudio/view/page/mediaGallery/MediaGalleryController');
//var _ = require('underscore');
//
//describe('Media Gallery Controller Testing Suite', function () {
//
//	describe('VAS-30:', function () {
//		var assert = require('chai').assert;
//		
//		var scope, controller;
//		
//		beforeEach(function () {
//			
//			scope = {
//				$on: function(){}
//			}
//			
//		});
//
//		describe('GIVEN I had previously uploaded assets to app studio: ', function () {
//			var brandModel;
//			//	scope, 
//			//	controller,
//			//	$controller,
//			//	deferred,
//			//	blankModalService, 
//			//	confirmationModalService, 
//			//	mediaGalleryService, 
//			//	spinnerService;
//            //
//			beforeEach(function (){
//				
//				brandModel = new BrandModel({
//					"name": "Test",
//					"app": [
//						"bcbcbd60-ba3f-11e5-8592-879c4ef57222"
//					],
//					"gallery": [
//						"zfzhr2vnvm32yorkyxdq"
//					],
//					"id": "e27991e0-b96d-11e5-9de3-bfda38ee4714",
//					"createdDate": "2016-01-12T20:48:50.686Z",
//					"modifiedDate": "2016-01-14T19:03:03.034Z"
//				});
//				
//				var controllerBinding = {
//					brandModel: brandModel
//				};
//				
//				//_.extend(MediaGalleryController, controllerBinding);
//				
//				controller = MediaGalleryController.apply(controllerBinding,['','',scope,'','']);
//				
//				//console.log(scope.brandModel);
//            
//				//blankModalServiceMock = sinon.mock(blankModalServiceMock);
//				//confirmationModalServiceMock = sinon.mock(confirmationModalService);
//				//mediaGalleryServiceMock = sinon.mock(mediaGalleryService);
//				//spinnerServiceMock = sinon.mock(spinnerService);
//				
//				console.log("Controller:", controller);
//
//
//			});
//
//			describe('WHEN The controller is initialized', function () {
//				it('THEN it should load all the gallery assets from the server', function () {
//					
//					//var expectation = sinon.mock(mediaGalleryService).expects('getAllGalleryAssets');
//					
//					//controller = $controller('mediaGalleryController', {
//					//	$scope: scope
//					//},{
//					//	brandModel: brandModel,
//					//	accountId: "videa"
//					//});
//					//
//					//console.log("Expectation: ", expectation.verify());
//					//
//					//var expectation = sinon.mock()
//					
//					//assert(false, "This is false!");
//
//				});
//				it('THEN it should notify the user that something went wrong', function () {
//
//				});
//			});
//
//			describe('WHEN I browse the asset gallery', function () {
//
//				it('THEN it should load all the gallery assets', function () {
//					
//				});
//
//				it('THEN I should see a list of available assets to view and edit', function () {
//						
//				});
//
//			});
//
//
//		});
//
//	});
//
//	describe('GIVEN: I had previously uploaded assets to app studio', function () {
//
//	});
//
//
//});
