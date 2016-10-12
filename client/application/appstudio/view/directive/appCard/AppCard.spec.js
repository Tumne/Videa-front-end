describe("AppCard Directive Test Suite: ", function () {
	var element, scope, compiled;

	beforeEach(function(){
		module('videa.templates');
		module('core');
		module('appstudio');
		module('ngMockE2E');
	});

	beforeEach(inject(function($rootScope, $compile) {

		scope = $rootScope.$new();

		scope.showConfigSpy = sinon.spy();
		scope.editAppSpy =  sinon.spy();
		scope.deleteAppSpy =  sinon.spy();
		
		scope.brand = "brandTest";

		scope.AppModel = {
			"name": "test",
			"appType": {
				"id": "phone",
				"name": "phone",
				"icon": {
					"id": "wlefiwdeulidwuyprklk",
					"createdDate": "2016-01-08T21:32:59Z",
					"modifiedDate": "2016-01-08T21:32:59Z",
					"name": "device_phone.png",
					"fullName": "wlefiwdeulidwuyprklk.png",
					"imageType": "40bebec0-9db1-49cc-baf8-eec62e0709f8",
					"width": 192,
					"height": 192,
					"url": "http://res.cloudinary.com/gadsdigiflare/image/upload/v1452288779/wlefiwdeulidwuyprklk.png",
					"bytes": 8307
				},
				"createdDate": "2016-01-08T21:32:59.364Z",
				"modifiedDate": "2016-01-08T21:32:59.364Z"
			},
			"config": [
				"dfee63f0-b88d-11e5-a177-b9d8096ca9ff"
			],
			"activeConfig": "",
			"id": "dfea9360-b88d-11e5-a177-b9d8096ca9ff",
			"createdDate": "2016-01-11T18:05:19.126Z",
			"modifiedDate": "2016-01-11T18:05:19.157Z"
		};

		element = angular.element('<app-card' +
			' logo="AppModel.appType.icon.url"' +
			' title="AppModel.name"' +
			' subtitle="AppModel.appType.name"' +
			' version=""' +
			' lastmodified="AppModel.modifiedDate"' +
			' edit="showConfigSpy(AppModel)"' +
			' model="AppModel"' +
			' editapp="editAppSpy(brand)"' +
			' deleteapp="deleteAppSpy(brand)"' +
			'></app-card>');

		compiled = $compile(element)(scope);
		scope.$digest();
		
	}));

	afterEach(function () {

	});
	
	it('should open the edit config page when edit is clicked', function () {
		var button = compiled.find('button');
		button.triggerHandler('click');
		
		assert(scope.showConfigSpy.calledOnce, "Edit was not called");
	});
	
});
