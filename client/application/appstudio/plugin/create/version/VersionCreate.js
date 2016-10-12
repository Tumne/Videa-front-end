
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var VersionCreate = function (){

};

Implements(VersionCreate, IView);

VersionCreate.prototype = {
    getName: function(){
        return 'versionCreateComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', 'modelOperation', function($scope, modelFactory, modelOperation){
                this._scope = $scope;
                this._modelFactory = modelFactory;
                this._modelOperation = modelOperation;
                this.fields = this._scope.model.getFields();
                this.nameFieldIndex = 0;
				
				//TODO: Why is this looping through the fields? Use getName directly? (PW)
                for (var i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].getName() == 'name') {
                        this.nameFieldIndex = i;
                    }
                }
                
                this.title = this.fields[this.nameFieldIndex].getTitle();
				
                this.create = function(){
                    this._scope.options.submit(this._scope.model);  
                };
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/create/version/versionCreate.html'
        };
    },
    getDirective : function() {
        return '<version-create-component></version-create-component>';
    }
};

module.exports = VersionCreate;
