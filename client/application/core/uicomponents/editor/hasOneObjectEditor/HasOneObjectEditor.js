var Purpose = require('core/plugin/Purpose');
var HasOneObjectEditor = function() {
    return {
        controller: ['$scope', 'modelOperation', 'viewRegistry', 
            function ($scope, modelOperation, viewRegistry) {
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
            '<div class="has-one-object-editor">',
            '    <object-editor  object="vm.object" ignore="vm.ignore"></object-editor>',
            '    <div class="has-one-component" ng-repeat="hasOneField in vm.object.getHasOneAssociations()" ng-if="vm.ready && !vm.object.isOneOf(hasOneField.getName())">',
            '       <div class="has-one-title">{{vm.object.getAssociationTitle(hasOneField)}}</div>',
			'                 <plugin-component ',
			'                               model="vm.retrieveHasOneModel(hasOneField._getterName)" ',
			'                               purpose="vm.purpose.EDIT"',
			'								options="vm.options">',
			'                 </plugin-component>',                                                 
            '    </div>',
            '</div>'            
        ].join(' ')
    };
};

module.exports = HasOneObjectEditor;