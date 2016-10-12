var Purpose = require('core/plugin/Purpose');
var complexModelEditor = function() {
    return {
        controller: ['$scope', 'modelOperation', 'viewRegistry', function ($scope, modelOperation, viewRegistry) {
            this._scope = $scope;
            this.purpose = Purpose;
            this.ready = false;
            this.modelOperation = modelOperation;
            this._viewRegistry = viewRegistry;
            this.options = (this.options)?this.options:{};
            this.ignore = (this.ignore)?this.ignore:['_metadata', 'id', 'createdDate', 'name','modifiedDate'];
            var self = this;

            this.initialize = function(){
                this._metadata = this.object.getFieldValue('_metadata');
                this._ignoreList = (this.ignore)?this.ignore:[];
                this.hasOneAssociations = this.object.getHasOneAssociations();
                var hasUndefinedHasOne = false;

                if (!this.hasOneAssociations) {
                    hasUndefinedHasOne = true;
                } else {
                    for(var i = 0; i < this.hasOneAssociations.length; i++){
                        if (this.retrieveHasOneModel(this.hasOneAssociations[i]._getterName) == undefined){
                            hasUndefinedHasOne = true;
                        }
                    }
                }
                if (!hasUndefinedHasOne){
                    this.ready = true;
                } else {
                    this.modelOperation.populateHasOne(this.object).then(function(){
                        self.ready = true;
                    });
                }
            };
            
            this.retrieveHasOneModel = function(getter) {
                return this.object[getter]();
            };

            this.hasHasOneRelationship = function (getter) {
                var model = this.object[getter]();
                
                if (model.getHasOneAssociations().length > 0) {
                    return true;
                }
                return false;
            };            
                        
            this.hasHasManyRelationship = function (getter) {
                var model = this.object[getter]();
                if (model.getHasManyAssociations().length > 0) {
                    return true;
                }
                return false;
            };            
            
            this.hasPlugin = function(getter) {
                var model = this.object[getter]();
                if(this._viewRegistry.getPlugin(model.getFieldValue('_metadata'), 
                                                this.purpose.EDIT)){    
                    return true;       
                }  
                return false;
            };
            
            this._scope.$watch(function () {
                return this._metadata;
            }.bind(this), function (newObject, oldObject) {
                if (newObject && (newObject != oldObject)) {
                    this.initialize();
                }
            }.bind(this), true); 
            
            this.initialize();
        }],
        replace: true,
        controllerAs: 'vm',
        bindToController: {
            'object': '=',
            'ignore': '=',
            'options': '='
        },
        scope: {},
        template: [
            '<div class="complex-model-editor">',
            '    <object-editor  object="vm.object" ignore="vm.ignore"></object-editor>',
            '    <div class="has-one-component" ng-repeat="hasOneField in vm.object.getHasOneAssociations()" ng-if="vm.ready && !vm.object.isOneOf(hasOneField.getName())">',
            '       <div class="has-one-title">{{vm.object.getAssociationTitle(hasOneField)}}</div>',
			'                 <plugin-component ng-if="vm.hasPlugin(hasOneField._getterName)"',
			'                               model="vm.retrieveHasOneModel(hasOneField._getterName)" ',
			'                               purpose="vm.purpose.EDIT"',
			'								options="vm.options">',
			'                 </plugin-component>',               
            '                 <div ng-if="!vm.hasPlugin(hasOneField._getterName)">',
            '                   <object-editor  object="vm.retrieveHasOneModel(hasOneField._getterName)" ignore="vm.ignore"></object-editor>',
			'                   <plugin-component  ng-if="vm.hasHasOneRelationship(hasOneField._getterName)"',
			'                               model="vm.retrieveHasOneModel(hasOneField._getterName)" ',
			'                               purpose="vm.purpose.EDIT"',
			'								options="vm.options">',
			'                   </plugin-component>',  
            '                 </div>',                                    
            '    </div>',
            '    <div ng-repeat="hasManyField in vm.object.getHasManyAssociations()">',
            '       <div ng-if="vm.object.getAssociationModelType(hasManyField.getName()) == \'string\'">',
            '           <has-many-string-editor object="vm.object" association-name="hasManyField.getName()" association-title="hasManyField.getItemTitle()" ignore="vm.ignore" options="vm.options"></has-many-string-editor>',
            '       </div>',
            '       <div ng-if="vm.object.getAssociationModelType(hasManyField.getName()) != \'string\'">',
            '           <has-many-object-editor object="vm.object" association-name="hasManyField.getName()" association-title="hasManyField.getItemTitle()" ignore="vm.ignore" options="vm.options"></has-many-object-editor>',
            '       </div>',            
            '    </div>',
            '</div>'            
        ].join(' ')
    };
};

module.exports = complexModelEditor;