var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');

var FontsEdit = function (){

};

Implements(FontsEdit, IView);

FontsEdit.prototype = {
    getName: function(){
        return 'fontsEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;

                this._scope = $scope;
                this.ready = false;
                this.purpose = Purpose;
                this.options = this._scope.options;
                
                this.hasOneAssociations = this._scope.model.getHasOneAssociations();

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    this.ready = true;
                }.bind(this));
                
                this.retrieveHasOneModel = function(getter) {
                    return this._scope.model[getter]();
                };

                this.getHasOneFieldName = function(hasOneField) {
                    return this._scope.model.getAssociationTitle(hasOneField);
                };


            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/fonts/fontsEdit.html'
        };
    },
    getDirective : function() {
        return '<fonts-edit-component></fonts-edit-component>';
    }
};

module.exports = FontsEdit;