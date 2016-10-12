var Digi = require('core/Digi');
var AbstractComplexModelEditor = require('core/uicomponents/editor/abstractComplexModelEditor/AbstractComplexModelEditor');
var ComplexModelAccordionEditor = function() {
    ComplexModelAccordionEditor.super_.apply(this, []);
};

Digi.inherits(ComplexModelAccordionEditor, AbstractComplexModelEditor);

_.extend(ComplexModelAccordionEditor.prototype,{
    getComponentClass: function() {
      return 'accordion-view';  
    },
    getSection: function() {
            return [
                '<uib-accordion close-others="true">',
                '<uib-accordion-group is-open="status.open" ng-repeat="tab in vm.tabs" >',
                '      <uib-accordion-heading ng-click="vm.switchTab(tab)">',
                '        <div ng-click="vm.switchTab(tab)">{{tab.title}} <i class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}" ></i></div>',
                '      </uib-accordion-heading>',
                //general
                '            <div ng-if="(vm.activeTab.title == \'General\' && vm.activeTab.active)">',
                '                <object-editor  object="vm.object" ignore="vm.ignore"></object-editor>',
                '            </div>',
                //hasone
                '            <div class="tab-view" ',
                '                 ng-repeat="hasOne in vm.object.getHasOneAssociations()"',
                '                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasOne) && vm.activeTab.active">',
                '                 <plugin-component  ',
                '                               model="vm.object[hasOne._getterName]()" ',
                '                                purpose="vm.purpose.EDIT">',
                '                 </plugin-component>',
                '            </div>',  
                //has many
                '            <div class="tab-view" ',
                '                 ng-repeat="hasMany in vm.object.getHasManyAssociations()"',
                '                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasMany)">',
                '               <div class="listing-component">',
                '                    <ul>',
                '                    </ul>',
                '                </div>',
                '                <div class="editing-component">',
                '                    {{vm.activeTab.title}}',
                '                </div>',
                '            </div>                    ',                
                '    </uib-accordion-group>',
                '</uib-accordion>',            
            ].join('');
    },
    getGeneral: function() {
            return '';          
    },
    getHasOne: function () {
            return '';
    },
    getHasMany: function () {
        return '';    
    }
});
module.exports = ComplexModelAccordionEditor;