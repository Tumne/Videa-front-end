var ObjectEditor = function() {
    return {
        controller: ['$scope', function ($scope) {
            this._scope = $scope;
            this.initialize = function(){
                this._metadata = this.object.getFieldValue('_metadata');

                this.fields = this.object.getFields();
                
                this._ignoreList = (this.ignore)?this.ignore:[];
                
            };
            
            this.showField = function(field) {
                for(var i = 0; i<this._ignoreList.length; i++) {
                    if (field.getName() === this._ignoreList[i]){
                        return false;
                    }
                }
                return true;    
            };
            
            this._scope.$watch(function () {
                try {
                    return this.object.getFieldValue('_metadata');
                } catch(e) {
                    return this.object;
                }
            }.bind(this), function (newObject, oldObject) {
                if ((newObject != oldObject) && newObject) {
                    this.initialize();
                }
            }.bind(this), true); 
            
            this.updateComboBoxValue = function (value, field){
                this.object.setFieldValue(field.getName(), value);
            };
            
            
            this.initialize();
        }],
        replace: true,
        controllerAs: 'vm',
        bindToController: {
            'object': '=',
            'ignore': '='
        },
        scope: {},
        templateUrl: 'core/uicomponents/editor/objectEditor/objectEditor.html'
    };
};

module.exports = ObjectEditor;