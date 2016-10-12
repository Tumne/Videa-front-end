
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Digi = require('core/Digi');

var JsonEdit = function (){
};

Implements(JsonEdit, IView);

JsonEdit.prototype = {
    getName: function(){
        return 'jsonEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'toastService', function($scope, toastService){
                
                this._scope = $scope;
                this._toastService = toastService;

                this.text = _.clone(this._scope.model.getFieldValue('content'));
                var self = this;
                
                try{
                    self.text = JSON.stringify(JSON.parse(self.text), null, 2);
                } catch (e) {
                    if (self._scope.model.getFieldValue('content').length > 0) {
                        console.log(e);
                        self.text = '';
                    }
                    self.text = self._scope.model.getFieldValue('content');
                }
    
                this.aceLoaded = function(_editor) {
                    _editor.setReadOnly(false);
                    _editor.$blockScrolling = Infinity;
                };
                
                this.onChange = function(e){
                    try{
                        var dirtyText = JSON.stringify(JSON.parse(self.text), null, 2);
                        self._scope.model.setFieldValue('content', dirtyText);
                    } catch (e) {
                    }
                };
                
                this.validate = function(){
                    var rawText = '',
                        self = this;
                    try{
                        rawText = JSON.parse(self.text);
                        self._toastService.success('Valid JSON');
                    } catch (e) {
                        if (self.text.length > 0) {
                            console.log(e);    
                        }                    
                        self._toastService.error('Invalid JSON cannot save!');
                    }
                };
                
                this.beautify = function() {
                    var rawText = '',
                        self = this;
                    try{
                        rawText = JSON.parse(self.text);
                        self.text = JSON.stringify(JSON.parse(self.text), null, 2);
                        self._toastService.success('Beautified');
                    } catch (e) {
                        console.log(e);
                        self._toastService.error('Invalid JSON cannot Beautify');
                    }                    
                }
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'core/uicomponents/editor/jsonEditor/jsonEdit.html'
        }
    },
    getDirective : function() {
        return '<json-edit-component></json-edit-component>';
    }

};

module.exports = JsonEdit;