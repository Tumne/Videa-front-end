var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var Purpose = require('core/plugin/Purpose');

var ThemeFontEdit = function (){

};

Implements(ThemeFontEdit, IView);

ThemeFontEdit.prototype = {
    getName: function(){
        return 'themeFontEditComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', 'modelOperation', function($scope, modelOperation){
                this._scope = $scope;

                this._scope = $scope;
                this.ready = false;
                this.purpose = Purpose;
                this.options = this._scope.options;
                this.options.prefer = 2;
                this.ignore = ['id', '_metadata', 'name', 'createdDate', 'modifiedDate'];
                this.hasOneAssociations = this._scope.model.getHasOneAssociations();

                modelOperation.populateHasOne(this._scope.model).then(function(){
                    this.ready = true;
                }.bind(this));
                
                this.retrieveHasOneModel = function(getter) {
                    // console.log('getter', getter);
                    return this._scope.model[getter]();
                };

            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/edit/theme/fonts/themeFont/themeFontEdit.html'
        };
    },
    getDirective : function() {
        return '<theme-font-edit-component></theme-font-edit-component>';
    }
};

module.exports = ThemeFontEdit;