var chai = require("chai");
var q = require('q');
var BaseService = require("../../../../application/core/service/BaseService.js");

describe('GIVEN BaseService', function(){
    var assert = require('chai').assert
    var service = new BaseService(q);
    describe('WHEN BaseService is initialized', function(){
        it('THEN q service should be saved', function(){
            assert.equal(service._q, q);
        });
    });
    describe('WHEN getDeferred is called', function(){
        it('THEN a promise should be returned', function(){
            var deferred = q.defer();
            assert.equal(typeof  service.getDeferred(), typeof deferred);
        });
    });    
});