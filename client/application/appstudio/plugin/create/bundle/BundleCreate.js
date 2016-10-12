
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var BundleCreate = function (){

};

Implements(BundleCreate, IView);

BundleCreate.prototype = {
    getName: function(){
        return 'bundleCreateComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', 'modelOperation', function($scope, modelFactory, modelOperation){
                this._scope = $scope;
                this._modelFactory = modelFactory;
                this._modelOperation = modelOperation;
                this.fields = this._scope.model.getFields();
                this.nameFieldIndex = 0;
                this.selectedVersion = [];
                this.selectedUiConfig = null;

                this.versions = this._scope.options.versions.filter(function(oneVersion){
                    return !oneVersion.isBundle;
                });
				
				//TODO: Why is this looping through the fields? Use getName directly? (PW)
                for (var i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].getName() == 'name') {
                        this.nameFieldIndex = i;
                    }
                }
                
                this.title = this.fields[this.nameFieldIndex].getTitle();
				
                this.create = function(){
                    if (this.selectedVersion.length > 0){
                        for(var i = 0; i < this.selectedVersion.length; i++){
                           this._scope.model.addUiConfigRefs(this.selectedVersion[i]); 
                        }
                        this._scope.options.submit(this._scope.model);                        
                    }
  
                };
                
                this.selected = function(newId) {
                    var index = this.selectedVersion.indexOf(newId);
                    if (index > -1){
                        this.selectedVersion.splice(index, 1);
                    } else {
                        this.selectedVersion.push(newId);    
                    }  
                };
                
                this.isSelected = function(id) {
                    return this.selectedVersion.indexOf(id) > -1;
                }
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/create/bundle/bundleCreate.html'
        };
    },
    getDirective : function() {
        return '<bundle-create-component></bundle-create-component>';
    }
};

module.exports = BundleCreate;
