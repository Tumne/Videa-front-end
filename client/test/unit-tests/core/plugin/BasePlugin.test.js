var chai = require("chai");
require("../../../../application/global");
var BasePlugin = require("core/plugin/BasePlugin");
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('GIVEN: BasePlugin Class Test', function(){
    
    describe('WHEN: getCardinality is called ', function(){
        var basePlugin = new BasePlugin();
        it('THEN return 1', function(){
            assert.equal(basePlugin.getCardinality(), 1);
        });
    });
}); 