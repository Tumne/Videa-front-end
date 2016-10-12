var Digi = require('core/Digi');
var ComplexModelTabEditor = require('core/uicomponents/editor/complexModelTabEditor/ComplexModelTabEditor');

var UIConfigurationEditor = function () {
  UIConfigurationEditor.super_.apply(this, []);
};

Digi.inherits(UIConfigurationEditor, ComplexModelTabEditor);

_.extend(UIConfigurationEditor.prototype, {
  //This method is used to modify the classes on the AbstractComplexModelEditor
  //getComponentClass: function () {
  //  return 'top-tab-view ui-configuration-editor';
  //},
    getHasMany: function () {
    return [
      '            <div class="tab-view" ',
      '                 ng-repeat="hasMany in vm.object.getHasManyAssociations()"',
      '                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasMany)"',
      '                 ng-switch="hasMany.getName()">',
      '                   <screens-editor  ng-switch-when="screen"',
      '                                    model="vm.object"',
      '                                    association-name="hasMany.getName()"',
      '                                    options="vm.options">',
      '                   </screens-editor>',
      '                   <has-many-editor ng-switch-default',
      '                        model="vm.object"',
      '                        association-name="hasMany.getName()"',
      '                        list-name="vm.listName"',
      '                        options="vm.options"',
      '                        save-event="uiConfig-save"',
      '                   ></has-many-editor>',
      '            </div>                    '
    ].join('');
  },
});

module.exports = UIConfigurationEditor;
