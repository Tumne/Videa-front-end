
var IView = require('core/plugin/IView');
var Digi = require('core/Digi');
var Purpose = require('core/plugin/Purpose');
var Implements = require('core/plugin/Implements');
var BundleEdit = function (){

};

Implements(BundleEdit, IView);

BundleEdit.prototype = {
    getName: function(){
        return 'bundleEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelFactory', 'modelOperation', function($scope, modelFactory, modelOperation){
                this._scope = $scope;
                this._modelFactory = modelFactory;
                this._modelOperation = modelOperation;
                this.fields = this._scope.model.getFields();
                this.nameFieldIndex = 0;
                this.selectedVersion = this._scope.options.bundleVersions.map(function(oneVersion){
                    return oneVersion.id;
                });

                this.selectedUiConfig = null;

                this.versions = this._scope.options.versions.filter(
                    function(oneVersion){
                        return !oneVersion.isBundle;
                }).concat(this._scope.options.bundleVersions);
				
				//TODO: Why is this looping through the fields? Use getName directly? (PW)
                for (var i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].getName() == 'name') {
                        this.nameFieldIndex = i;
                    }
                }
                
                this.title = this.fields[this.nameFieldIndex].getTitle();
				
                this.edit = function(){
                    if (this.selectedVersion.length > 0){
                        var length = this._scope.model.getUiConfigRefs().length;
                        for(var i = length - 1; i > -1; i--){
                           this._scope.model.removeUiConfigRefs(i); 
                        }                        
                        
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
            templateUrl: 'appstudio/plugin/edit/bundle/bundleEdit.html'
        };
    },
    getDirective : function() {
        return '<bundle-edit-component></bundle-edit-component>';
    }
};

module.exports = BundleEdit;
