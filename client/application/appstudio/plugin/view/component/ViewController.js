module.exports = function($scope){
    this.selected = function(){
            $scope.options.selected($scope.model.getFieldValue('_metadata'));
    };
};