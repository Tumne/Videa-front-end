var chai = require("chai");
var q = require('q');
var Capitalize = require("../../../../application/core/filter/capitalize/Capitalize.js");

describe('GIVEN: Capitalize function test', function(){
    var assert = require('chai').assert;
    describe('WHEN: no input given to function', function(){
        
        it('THEN: return null', function(){
            assert.equal(Capitalize()(), undefined);
        });
    });
    describe('WHEN: character string input given', function(){
        var s = 'a';
        it('THEN: string should be capitalize', function(){
            assert.equal(Capitalize()(s), 'A');
        });
    });
    describe('WHEN: multi-character input given', function(){
        var s = "vkdkjdnkjnds sdvds sdf sdf sfsdfsdfsdf"
        it('THEN: string should be capitalize', function(){
            assert.equal(Capitalize()(s), 'Vkdkjdnkjnds sdvds sdf sdf sfsdfsdfsdf');
        });
    });    
    describe('WHEN: number input given', function(){
        it('THEN: it should return the number', function(){
            assert.equal(Capitalize()(23), 23);
        });
    });        
});