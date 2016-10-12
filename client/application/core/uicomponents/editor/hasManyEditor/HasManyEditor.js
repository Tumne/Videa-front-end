var HasManyEditorController = require('core/uicomponents/editor/hasManyEditor/HasManyEditorController');
var HasManyEditor = function() {

};

_.extend(HasManyEditor.prototype,{
    getEditorClass: function () {
        return 'row has-many-component';    
    },
    getLeftPanel: function () {
        return [
            '<button class="btn btn-main bg-coralpink" ng-click="vm.create()">{{vm.newTitle}}</button>',
            '<div class="item-title">{{vm.itemTitle}}:</div>',
            '<ul class="item-list">',
            '   <li ng-repeat="oneRow in vm.getRows()" ',
            '       ng-class="{active: vm.isActive($index)}">',
            '       <span class="pull-left" ng-click="vm.selected($index)">{{vm.rowName(oneRow)}}</span>',
            '       <div class="clearfix"></div>',
            '   </li>',
            '</ul>'
        ].join('');
    },
    getCenterPanel: function () {
        return [
            '<div class="empty-state text-center" ng-if="vm.modelSelected == null">',
            '{{vm.emptyState}}',
            '</div>',
            '<div class="edit-component" ng-if="vm.modelSelected != null">',
			'    <plugin-component  ',
			'     model="vm.modelSelected" ',
			'     purpose="vm.purpose.EDIT"',
            '     options="vm.options">',
			'    </plugin-component>',
            '</div>'
        ].join('');
    },
	getRightPanel: function () {
		return [
			'<div class="has-many-editor-actions">',
				'<button class="btn btn-main bg-darkblue" ng-click="vm.save()" ng-if="vm.saveEvent.length > 0">SAVE</button>',
				'<button class="btn btn-main bg-red" ng-show="vm.modelSelected" ng-click="vm.remove()">DELETE</button>',
			'</div>'
		].join('');
	},
    render: function () {
        var leftPanel = this.getLeftPanel(),
			centerPanel = this.getCenterPanel(),
            rightPanel = this.getRightPanel(),
            editorClass = this.getEditorClass();
        return {
            controller: ['$scope', 
                         'blankModalService', 
                         'confirmationModalService',
                         'toastService', 
                         HasManyEditorController],
            replace: true,
            controllerAs: 'vm',
            bindToController: {
                'model': '=',
                'listName': '=',
                'associationName': '=',
				'options': '=',
                'emptyState': '@',
                'saveEvent': '@'
            },
            scope: {},
            template: [
                '<div class="' + editorClass + '">',
                    '<div class="left-panel col-md-3">',
                    leftPanel,
                    '</div>',
					'<div class="center-panel col-md-6">',
					centerPanel,
					'</div>',
                    '<div class="right-panel col-md-3">',
                    rightPanel,
                    '</div>',
                    '<div class="clearfix"></div>',
                '</div>'].join('')
        };      
  }  
});
module.exports = HasManyEditor;
