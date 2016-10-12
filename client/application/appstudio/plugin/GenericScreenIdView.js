
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var GenericScreenIdView = function (){

};

Implements(GenericScreenIdView, IView);

GenericScreenIdView.prototype = {
    getName: function(){
        return 'genericScreenIdViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'screenService', 'uiConfigurationService', 'appService', 
                            function($scope, screenService, uiConfigurationService, appService){
                this._scope = $scope;
                this.purpose  = Purpose;
                this._screenService = screenService;
                this._appService = appService;
                this._uiConfigurationService = uiConfigurationService;
                this.ignore = ['_metadata', 'id', 'name', 'configId', 'createdDate', 'modifiedDate', 'screenId'];
                this.screenNames = [];
                this.screenIds = [];
                this.screenId = '';
                this.configNames = [];
                this.configIds = [];
                this.configId = '';
                var _this = this;
                this.fields = this._scope.model.getFields();
                
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
                            _this.screenNames.push(screens[i].getFieldValue('name'));
                            _this.screenIds.push(screens[i].getFieldValue('id'));
                        }
                        var id = _this.screenIds.indexOf(_this.screen.value);
                        _this.screenId =  _this.screenNames[id];
                    });
                }
                //get ui configs
                this.config = this._scope.model._getField('configId');
                if (this.config){
                    this._appService.getById(_this._scope.options.account,
                                            _this._scope.options.brand, 
                                            _this._scope.options.app).then(
                        function(appModel){
                        _this._uiConfigurationService.getAppVersions(_this._scope.options.account, 
                                                                    appModel.getConfiguration(), 
                                                                    _this._scope.options.app)
                            .then(function (versions) {
                                for(var i = 0; i < versions.length; i++){
                                    _this.configNames.push(versions[i].getFieldValue('name'));
                                    _this.configIds.push(versions[i].getFieldValue('id'));
                                }
                                var id = _this.configIds.indexOf(_this.config.value);
                                _this.configId =  _this.configNames[id];
                            }, function (error) {
                                self._log.error('Verion Error: ', error);
                        });     
                    });         
                }  
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            template:[
                '<div>',
                '    <div>',
                '        <object-editor  object="vm._scope.model" ignore="vm.ignore"></object-editor>',
                '        <div class="text-combobox-component" ng-if="vm.screen">',
                '            <div class="title">Screen</div>',
                '            <ui-select tagging ng-model="vm.screenId" theme="bootstrap" title="" on-select="vm.updateScreenValue($item, vm.screen)">',
                '                <ui-select-match placeholder="">{{$select.selected}}</ui-select-match>',
                '                <ui-select-choices repeat="oneEnum in vm.screenNames | filter: $select.search">',
                '                    <div>{{oneEnum}}</div>',
                '                </ui-select-choices>',
                '            </ui-select>',
                '        </div>                       ',
                '        <div class="text-combobox-component" ng-if="vm.config">',
                '            <div class="title">Version</div>',
                '            <ui-select tagging ng-model="vm.configId" theme="bootstrap" title="" on-select="vm.updateConfigValue($item, vm.config)">',
                '                <ui-select-match placeholder="">{{$select.selected}}</ui-select-match>',
                '                <ui-select-choices repeat="oneConfig in vm.configNames | filter: $select.search">',
                '                    <div>{{oneConfig}}</div>',
                '                </ui-select-choices>',
                '            </ui-select>',
                '        </div>                       ',
                '    </div>',
                '</div>'                
            ].join(' ')
        };
    },
    getDirective : function() {
        return '<generic-screen-id-view-component></generic-screen-id-view-component>';
    }
};

module.exports = GenericScreenIdView;