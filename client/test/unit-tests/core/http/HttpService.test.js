var chai = require("chai");
require("../../../../application/global");
var HttpService = require("core/http/HttpService");
var assert = require('chai').assert;
var expect = require('chai').expect;
var q = require('q');
var $http = {
    defer: function(){
        return q.defer();
    },
    get: function(url){
        var defer = q.defer();
        defer.resolve({test:1});
        return defer.promise;
    },
    post: function(url, data){
        var defer = q.defer();
        defer.resolve({test:1});
        return defer.promise;
    },
    put: function(url, data){
        var defer = q.defer();
        defer.resolve({test:1});
        return defer.promise;
    },
    delete: function(url){
        var defer = q.defer();
        defer.resolve({test:1});
        return defer.promise;
    }
}, $http2 = {
    defer: function(){
        return q.defer();
    },
    get: function(url){
        var defer = q.defer();
        defer.resolve({data:[{test:1},{test:2}]});
        return defer.promise;
    }
};
describe('GIVEN: HttpService Class Test', function(){
    var service = new HttpService($http, q);
    describe('WHEN: getDeferred is called ', function(){
        it('THEN return promise', function(){
            expect(typeof service.getDeferred()).to.deep.equal('object');
        });
    });
    describe('WHEN: doGet is called with no data field', function(){
        it('THEN return promise', function(done){
            service.doGet('url').then(function(data){
                expect(data).to.deep.equal({test:1});
                done();
            });
        });
    });  
    describe('WHEN: doGet is called with data field', function(){
        var service2 = new HttpService($http2, q);
        it('THEN return promise', function(done){
            service2.doGet('url').then(function(data){
                expect(data).to.deep.equal([{test:1},{test:2}]);
                done();
            });
        });
    });      
    describe('WHEN: doPost is called ', function(){
        it('THEN return promise', function(done){
            service.doPost('url',{}).then(function(data){
                expect(data).to.deep.equal({test:1});
                done();
            });
        });
    });  
    
    describe('WHEN: doPut is called ', function(){
        it('THEN return promise', function(done){
            service.doPut('url',{}).then(function(data){
                expect(data).to.deep.equal({test:1});
                done();
            });
        });
    });  
    
    describe('WHEN: doDelete is called ', function(){
        it('THEN return promise', function(done){
            service.doDelete('url').then(function(data){
                expect(data).to.deep.equal({test:1});
                done();
            });
        });
    });                
}); 
