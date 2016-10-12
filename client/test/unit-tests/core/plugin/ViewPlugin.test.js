var chai = require("chai");
require("../../../../application/global");
var ViewPlugin = require("core/plugin/ViewPlugin");
var Purpose = require("core/plugin/Purpose");
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('GIVEN: ViewPlugin Class Test', function(){
    var viewPlugin = new ViewPlugin(Purpose.PREVIEW, {});
    describe('WHEN: getPurpose is called ', function(){
        
        it('THEN return PREVIEW', function(){
            assert.equal(viewPlugin.getPurpose(), Purpose.PREVIEW);
        });
    });
    
    describe('WHEN: getView is called ', function(){
        it('THEN return object', function(){
            expect(viewPlugin.getView()).to.deep.equal({});
        });
    });    
}); 