'use strict'

var _ = require('underscore');

var SpinnerService = function($rootScope, $q) {
    this.loading = false;
	this.deferred = null;
	this._rootScope = $rootScope;
	this._q = $q;
	
	this.startTime = 0;
	this.stopTime = 0;
	
	this.MIN_TIME = 1500; //The minimum time the loading screen appears. 
};

_.extend(SpinnerService.prototype, {
	
	start: function() {
		this._startSpinner();
		this._createStartTimestamp();
	},
	stop: function() {
		
		this._createStopTimestamp();
		
		if(this.stopTime - this.startTime > this.MIN_TIME){
			this._stopSpinner();
		} else {
			this._delaySpinner();
		}
		
	},
	_createStartTimestamp: function() {
		this.startTime = Date.now();
	},
	_createStopTimestamp: function() {
		this.stopTime = Date.now();
	},
	_delaySpinner: function() {
		var difference = this.stopTime - this.startTime,
			self = this;
		var delay = this.MIN_TIME - difference;
		
		window.setTimeout(function(){
			this._stopSpinner();
			this._rootScope.$apply();
		}.bind(self), delay); 
	},
	_stopSpinner: function () {
		this.loading = false;
	},
	_startSpinner: function () {
		this.loading = true;
	}
	
});

module.exports = SpinnerService;
