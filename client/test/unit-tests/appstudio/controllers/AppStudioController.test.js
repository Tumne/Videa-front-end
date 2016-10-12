var q = require('q');
var chai = require('chai');
var sinon = require('sinon');
var AppStudioController = require('appstudio/view/page/appStudio/AppStudioController');
var _ = require('underscore');

describe('AppStudio Controller Testing Suite', function () {

	var assert = require('chai').assert;

	var scope, controller;

	beforeEach(function () {

		scope = {
			$on: function () {
			}
		}

	});

	describe('GIVEN: The user has access to appStudio', function () {
		var navigateToViewSpy;
		
		beforeEach(function () {
			controller = new AppStudioController({id: "videa"}, '', '', '', '', '', '', scope);
			//navigateToViewSpy = sinon.spy(controller.navigateToView);
		});

		describe('WHEN: the user navigates to appStudio', function () {

			it('THEN: the user should see the brand view', function () {
				assert.strictEqual(controller.current.view, 1);
				assert.deepEqual(controller.current.parameters, {});
			});

		});

	});

});
