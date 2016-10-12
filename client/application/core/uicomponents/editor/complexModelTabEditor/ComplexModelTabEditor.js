var Digi = require('core/Digi');
var AbstractComplexModelEditor = require('core/uicomponents/editor/abstractComplexModelEditor/AbstractComplexModelEditor');
var ComplexModelTabEditor = function () {
	ComplexModelTabEditor.super_.apply(this, []);
};

Digi.inherits(ComplexModelTabEditor, AbstractComplexModelEditor);

_.extend(ComplexModelTabEditor.prototype, {
	getComponentClass: function () {
		return 'complex-model-tab-editor';
	},
	getSection: function () {
		return [
			'        <ul class="complex-tab">',
			'        <li ng-repeat="tab in vm.tabs"',
			'            ng-click="vm.switchTab(tab)" ',
			'            ng-class="{active: vm.showTab(tab)}">',
			'            {{tab.title}}',
			'		 <div ng-class="{activetab: vm.showTab(tab)}"></div>',
			'        </li>',
			'        </ul>'
		].join('');
	},
});

module.exports = ComplexModelTabEditor;
