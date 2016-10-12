var Digi = require('core/Digi');
var AbstractComplexModelEditor = require('core/uicomponents/editor/abstractComplexModelEditor/AbstractComplexModelEditor');
var ComplexModelListEditor = function() {
    ComplexModelListEditor.super_.apply(this, []);
};

Digi.inherits(ComplexModelListEditor, AbstractComplexModelEditor);

_.extend(ComplexModelListEditor.prototype,{
    getComponentClass: function() {
      return 'list-view';  
    }
});
module.exports = ComplexModelListEditor;