var chai = require("chai");
require("../../../application/global");
var Digi = require("core/Digi.js");
var HttpService = require("core/http/HttpService.js");

var assert = require('chai').assert;
var expect = require('chai').expect;
describe('GIVEN: Digi Utility Function Test', function(){
    
    describe('WHEN: isBoolean is called with input of type boolean', function(){
        it('THEN return true', function(){
            assert.equal(Digi.isBoolean(true), true);
        });
    });
    describe('WHEN: isBoolean is called with input of type not boolean', function(){
        it('THEN return false', function(){
            assert.equal(Digi.isBoolean(1), false);
            assert.equal(Digi.isBoolean('a'), false);
            assert.equal(Digi.isBoolean(undefined), false);
            assert.equal(Digi.isBoolean(null), false);
        });
    });   
    
    describe('WHEN: isString is called with input of type String', function(){
        it('THEN return true', function(){
            assert.equal(Digi.isString('dfsdfsdf'), true);
        });
    });
    describe('WHEN: isString is called with input of type not String', function(){
        it('THEN return false', function(){
            assert.equal(Digi.isString(1), false);
            assert.equal(Digi.isString(true), false);
            assert.equal(Digi.isString(undefined), false);
            assert.equal(Digi.isString(null), false);
        });
    });   
    describe('WHEN: isDefined is called with input of type undefined', function(){
        it('THEN return false', function(){
            assert.equal(Digi.isDefined(undefined), false);
        });
    });
    describe('WHEN: isDefined is called with input of type not undefined', function(){
        it('THEN return true', function(){
            assert.equal(Digi.isDefined(1), true);
            assert.equal(Digi.isDefined(true), true);
            assert.equal(Digi.isDefined('asdsad'), true);
            assert.equal(Digi.isDefined(null), true);
        });
    });   
    describe('WHEN: isNumber is called with input of type number', function(){
        it('THEN return false', function(){
            assert.equal(Digi.isNumber(1), true);
            assert.equal(Digi.isNumber(1.1), true);
        });
    });
    describe('WHEN: isNumber is called with input of type not number', function(){
        it('THEN return true', function(){
            assert.equal(Digi.isNumber('sdassdad'), false);
            assert.equal(Digi.isNumber(true), false);
            assert.equal(Digi.isNumber(undefined), false);
            assert.equal(Digi.isNumber(null), false);
        });
    });    
    describe('WHEN: isArray is called with input of type array', function(){
        it('THEN return false', function(){
            assert.equal(Digi.isArray([]), true);
            assert.equal(Digi.isArray([1,2,3,4,5]), true);
            assert.equal(Digi.isArray([{a:1}, {b:2}]), true);
        });
    });
    describe('WHEN: isArray is called with input of type not array', function(){
        it('THEN return true', function(){
            assert.equal(Digi.isArray('sdassdad'), false);
            assert.equal(Digi.isArray(true), false);
            assert.equal(Digi.isArray(undefined), false);
            assert.equal(Digi.isArray(null), false);
        });
    });    
    describe('WHEN: inArray is called with needle in array', function(){
        it('THEN return true', function(){
            assert.equal(Digi.inArray(1,[1]), true);
            assert.equal(Digi.inArray(1, [2,3,1,4,5]), true);
            assert.equal(Digi.inArray(1, [2,3,1,4,5,1]), true);
        });
    });
    describe('WHEN: inArray is called with needle not in array', function(){
        it('THEN return false', function(){
            assert.equal(Digi.inArray(1,[]), false);
            assert.equal(Digi.inArray(1, [3,4,5]), false);
        });
    });              
    describe('WHEN: capitalizeFirstLetter is called with string', function(){
        it('THEN return capitalize first letter string', function(){
            assert.equal(Digi.String.capitalizeFirstLetter('a'), 'A');
            assert.equal(Digi.String.capitalizeFirstLetter('absdfsdf'), 'Absdfsdf');
        });
    });
    describe('WHEN: capitalizeFirstLetter is called with no string', function(){
        it('THEN return input', function(){
            assert.equal(Digi.String.capitalizeFirstLetter(1), 1);
        });
    });                  
    describe('WHEN: Digi.Schema.isArrayProperty is called with type array', function(){
        it('THEN return true', function(){
            assert.equal(Digi.Schema.isArrayProperty({type:'array'}), true);
        });
    });
    describe('WHEN: Digi.Schema.isArrayProperty is called with no type array', function(){
        it('THEN return false', function(){
            assert.equal(Digi.Schema.isArrayProperty(1), false);
        });
    });    
    describe('WHEN: Digi.Schema.isRefProperty is called with method $ref', function(){
        it('THEN return true', function(){
            assert.equal(Digi.Schema.isRefProperty({'$ref':'something'}), true);
        });
    });
    describe('WHEN: Digi.Schema.isRefProperty is called with no method $ref', function(){
        it('THEN return false', function(){
            assert.equal(Digi.Schema.isRefProperty(1), false);
        });
    });   
    describe('WHEN: Digi.Schema.isObjectProperty is called with type object', function(){
        it('THEN return true', function(){
            assert.equal(Digi.Schema.isObjectProperty({type:'object'}), true);
        });
    });
    describe('WHEN: Digi.Schema.isObjectProperty is called with no type object', function(){
        it('THEN return false', function(){
            assert.equal(Digi.Schema.isObjectProperty(1), false);
        });
    });
    describe('WHEN: Digi.Schema.getAnyOfList is called with type object', function(){
        var schema = {
            "item": {
                "type": "array",
                "title": "Components",
                "anyOf": [
                {
                    "$ref": "schema.appstudio.component.list.ListView"
                },
                {
                    "$ref": "schema.appstudio.component.carousel.Carousel"
                }
                ],
                "items": {
                "$ref": "schema.appstudio.component.Component"
                }
            }            
        };
        var expected = [
                'schema.appstudio.component.list.ListView',
                'schema.appstudio.component.carousel.Carousel'
            ],
            result = Digi.Schema.getAnyOfList(schema, 'item');
        it('THEN return true', function(){
            assert.equal(result[0], expected[0]);
            assert.equal(result[1], expected[1]);
        });
    });
    describe('WHEN: Digi.Schema.getAnyOfList is called with no type object', function(){
        it('THEN return false', function(){
            assert.equal(Digi.Schema.getAnyOfList({}, 'item'), null);
        });
    });  
    describe('WHEN: Digi.Array.lastElement is called with array', function(){
        it('THEN return new array', function(){
            assert.equal(Digi.Array.lastElement([1,2,3,4]), 4);
            assert.equal(Digi.Array.lastElement([1]), 1);
        });
    });
    describe('WHEN: Digi.Array.move is called with before and after index', function(){
        var array = [1,2,3,4];
        it('THEN return new array', function(){
            Digi.Array.move(array, 0, 1);
            expect(array).to.deep.equal([2,1,3,4]);
            Digi.Array.move(array, 2, 3);
            expect(array).to.deep.equal([2,1,4,3]);
            Digi.Array.move(array, 3, 4);
            expect(array).to.deep.equal([2,1,4,3]);  
            Digi.Array.move(array, 0, -1);
            expect(array).to.deep.equal([2,1,4,3]);
            Digi.Array.move(array, 0, 0);
            expect(array).to.deep.equal([2,1,4,3]);
            Digi.Array.move(array, 3, 3);
            expect(array).to.deep.equal([2,1,4,3]);                                    
        });
    }); 
    describe('WHEN: Digi.Function.hasFunction is called with object with method', function(){
        var obj = {
            test: function(){return 1;},
            test2: 1  
        };
        it('THEN return true', function(){
            expect(Digi.Function.hasFunction(obj, 'test')).to.deep.equal(true);
            expect(Digi.Function.hasFunction(obj, 'test2')).to.deep.equal(false);      
        });
    });                 
    describe('WHEN: Digi.Class.implements is called with 2 objects', function(){
        var obj = {
            test: function(){return 1;},
            test2: 1  
        };
        var obj2 = {
          test3: 3,
          test4: function() { return 2;}  
        };
        Digi.Class.implements(obj, obj2);

        it('THEN return new combined object', function(){
            expect(obj.test()).to.deep.equal(1);
            expect(obj.test4()).to.deep.equal(2);
            expect(obj.test2).to.deep.equal(1);
            expect(obj.test3).to.deep.equal(3);      
        });
    });    
    describe('WHEN: Digi.Namespace.extend is called with object and string seperated by periods', function(){
        var obj = {
            window: {
                com : {
                    videa: {
                        
                    }
                }
            }
        };
        var type = "a.b.c.d.e";
        Digi.Namespace.extend(obj, type);

        it('THEN return new array', function(){
            expect(obj.a).to.deep.equal({b:{c:{d:{e:{}}}}});
        });
    });                       
    describe('WHEN: Digi.Function.pass is called with object and string seperated by periods', function(){
        var obj = {
            'getter': Digi.Function.pass(function (list) {
                return list;
            }, [[1,2,3,4,5]])
        };
        it('THEN return new array', function(){
            expect(obj.getter()).to.deep.equal([1,2,3,4,5]);
        });
    });      
    describe('WHEN: Digi.inherits is called with parent and child class', function(){
        var A = function(b){
            this.b = b;
            this.test = function(){
                return b;
            }
        };
        var C = function (d) {
            C.super_.apply(this, [d]);
            this.newTest = function(){
                return this.b + 1;
            }
        };
        Digi.inherits(C, A);
        var result = new C(3);
        it('THEN return new array', function(){
            expect(result.newTest()).to.deep.equal(4);
        });
    });          
});