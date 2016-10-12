var Digi = require('core/Digi');
var ComplexModelTabEditor = require('core/uicomponents/editor/complexModelTabEditor/ComplexModelTabEditor');

var AppConfigurationEditor = function () {
	AppConfigurationEditor.super_.apply(this, []);
};

Digi.inherits(AppConfigurationEditor, ComplexModelTabEditor);

_.extend(AppConfigurationEditor.prototype, {
	////This method is used to modify the classes on the AbstractComplexModelEditor
	//getComponentClass: function () {
	//	return '';
	//},
	getHasOne: function () {
		return [
			'            <div class="hasone-tab-view" ',
			'                 ng-repeat="hasOne in vm.object.getHasOneAssociations()"',
			'                 ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasOne) && vm.activeTab.active">',
			'                <div ng-switch="hasOne.getName()">',
            '                   <div ng-switch-default>',
            '				       <div class="left-panel">',
			'               	    <plugin-component  ',
			'                               model="vm.object[hasOne._getterName]()" ',
			'                               purpose="vm.purpose.EDIT"',
			'								options="vm.options">',
			'               	    </plugin-component>',
			'				        </div>',
			'				        <div class="right-panel">',
			'					       <div class="save-button">',
			'						      <button class="btn btn-main bg-darkblue" ng-click="vm.save()">SAVE SETTINGS</button>',
			'					       </div>',
			'				        </div>',
            '                   </div>',
            '               </div>',
			'            </div>'
		].join('');
	},
	//Overrides the getHasMany of AbstractComplexModelEditor and implements a custom view for versions
	getHasMany: function () {
        var analyticEmptyStateString = 'empty-state="To enable analytics for your app, click \'New Analytic\', choose a provider, and configure."> ',
            cmsEmptyStateString = 'empty-state="To connect a CMS to your app, click \'New CMS\', choose a provider, and configure."> ';
		return ['<div class="tab-view"',
					'ng-repeat="hasManyAssociation in vm.object.getHasManyAssociations()"',
					'ng-if="vm.activeTab.title == vm.object.getAssociationTitle(hasManyAssociation)"',
					'ng-switch="hasManyAssociation.getName()">',
						'<versions-view ng-switch-when="uiConfig"',
										'app-model="vm.object"',
										'association="hasManyAssociation"',
										'brand-id="vm.options.brandId"',
										'account-id="vm.options.accountId"',
										'app-id="vm.options.appId"',
                                        'active-config="vm.options.activeConfig">',
						'</versions-view>',
            '<has-many-editor  ng-switch-when="cms"',
                    'model="vm.object"',
										'association-name="hasManyAssociation.getName()"', 
										'list-name="vm.listName"',
                    'options="vm.options" ',
                    'save-event="appConfig-save"',
                    cmsEmptyStateString,
						'</has-many-editor>',
						'<has-many-editor ',
										'ng-switch-default model="vm.object"',
										'association-name="hasManyAssociation.getName()"', 
										'list-name="vm.listName"',
                    'options="vm.options" ',
                    'save-event="appConfig-save"',
                    'empty-state="">',
						'</has-many-editor>',
				'</div>'].join(' ');
	}
});

module.exports = AppConfigurationEditor;
