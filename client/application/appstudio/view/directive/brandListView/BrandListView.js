

var BrandListView = function () {
    return {
        restrict: 'E',
        templateUrl: 'appstudio/view/directive/brandListView/brandListView.html',
        scope: {},
        bindToController: {
            'url' : '=',
            'hasurl': '=',
            'title': '=',
            'updatebuttons': '=',
            'buttons' : '=',
            'model': '=',
            'savetitle': '='

        },
        controller: [function(){
            var vm = this;

            this.saveTitle = function(brandName){
                vm.model.setName(brandName);
                vm.savetitle.save(vm.model);
            };
            this.editTitle = this.title;
        }],
        controllerAs: 'vm',
        transclude: true
    };
};

module.exports = BrandListView;