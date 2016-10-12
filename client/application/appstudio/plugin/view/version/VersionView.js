
var IView = require('core/plugin/IView');
var Implements = require('core/plugin/Implements');
var VersionView = function (){

};

Implements(VersionView, IView);

VersionView.prototype = {
    getName: function(){
        return 'versionViewComponent';
    },
    getDefinition: function(){
        return {
            controller: ['$scope', function($scope){
                var self = this;
                this.scope = $scope;
                this.versionName = this.scope.model.getFieldValue('name');
				this.modifiedDate = this.scope.model.getFieldValue('modifiedDate');
                
                this.edit = function () { this.scope.options.edit(this.scope.model);};
                this.publish = function () {this.scope.options.publish(this.scope.model);};
                this.duplicate = function () {this.scope.options.duplicate(this.scope.model);};
                this.delete = function () {this.scope.options.delete(this.scope.model);};
                
                this.editName = function(title){
                    var currentTitle = self.scope.model.getFieldValue('name');
                    
                    if( currentTitle != title && title.length > 0){
                        self.scope.model.setFieldValue('name', title);
                        self.scope.options.editUiConfigName(self.scope.model);
                    } else {
                        self.bundleName = currentTitle;
                    }
                };
            }],
            controllerAs: 'vm',
            replace: true,
            scope: false,
            templateUrl: 'appstudio/plugin/view/version/version.html'
        };        
    },
    getDirective : function() {
        return '<version-view-component></version-view-component>';
    }
};

module.exports = VersionView;
