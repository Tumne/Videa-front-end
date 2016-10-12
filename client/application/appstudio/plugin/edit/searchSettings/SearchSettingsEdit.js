var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Implements = require('core/plugin/Implements');
var PluginModelType = require('appstudio/plugin/PluginModelType');
var SearchSettingsEdit = function (){

};

Implements(SearchSettingsEdit, IView);

SearchSettingsEdit.prototype = {
    getName: function(){
        return 'searchSettingsEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'screenService', 'appService', 
                            function($scope, screenService, uiConfigurationService, appService){
                this._scope = $scope;
                this._screenService = screenService;
                this._appService = appService;
                this._uiConfigurationService = uiConfigurationService;
                this.ignore = ['_metadata', 'id', 'createdDate', 'modifiedDate', 'screenId'];
                this.screenNames = [];
                this.screenIds = [];
                this.screenId = '';
                this.configNames = [];
                this.configIds = [];
                this.configId = '';
                var _this = this;
                this.fields = this._scope.model.getFields();
                
                this.searchScreenSchemas = [];
                
                for(var i in PluginModelType.EDIT.SEARCHRESULTSCREEN){
                this.searchScreenSchemas.push(PluginModelType.EDIT.SEARCHRESULTSCREEN[i]);
                } 
                               
                this.retrieveHasOneModel = function(getter) {
                    return this._scope.model[getter]();
                };
                
                this.screen = this._scope.model._getField('screenId');
                if (this.screen) {
                    this.updateScreenValue = function (value, field){
                        var id = this.screenNames.indexOf(value);
                        this.screenId = value;
                        this._scope.model.setFieldValue(this.screen.getName(), this.screenIds[id]);
                    };
                    
                    this.updateConfigValue = function (value, field){
                        var id = this.configNames.indexOf(value);
                        this.configId = value;
                        this._scope.model.setFieldValue(this.config.getName(), this.configIds[id]);
                    };
                    
                    this._screenService.getScreens(_this._scope.options.account,
                                                _this._scope.options.configId)
                                                .then(function (screens) {
                        for(var i = 0; i < screens.length; i++){
                            if (_this.searchScreenSchemas.indexOf(screens[i].getFieldValue('_metadata')) > -1) {
                                _this.screenNames.push(screens[i].getFieldValue('name'));
                                _this.screenIds.push(screens[i].getFieldValue('id'));
                            }
                        }
                        var id = _this.screenIds.indexOf(_this.screen.value);
                        _this.screenId =  _this.screenNames[id];
                    });
                }
				this.save = function() {
					this._scope.$emit('uiConfig-save');
				};                  
            }],            
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template:[
                '<div>',
                '    <div>',
                '        <object-editor  object="vm._scope.model" ignore="vm.ignore"></object-editor>',
                '        <div class="text-combobox-component" ng-if="vm.screen">',
                '            <div class="title">Search Result Screen</div>',
                '            <ui-select tagging ng-model="vm.screenId" theme="bootstrap" title="" on-select="vm.updateScreenValue($item, vm.screen)">',
                '                <ui-select-match placeholder="">{{$select.selected}}</ui-select-match>',
                '                <ui-select-choices repeat="oneEnum in vm.screenNames | filter: $select.search">',
                '                    <div>{{oneEnum}}</div>',
                '                </ui-select-choices>',
                '            </ui-select>',
                '        </div>                       ',
                '   	<div class="save-button--bar">',
                '   		<button class="btn btn-main bg-darkblue" ng-click="vm.save()">SAVE</button>',
                '   	</div>', 
                '    </div>',
                '</div>'                
            ].join(' ')            
        };
    },
    getDirective : function() {
        return '<search-settings-edit-component></search-settings-edit-component>';
    }
};

module.exports = SearchSettingsEdit;
