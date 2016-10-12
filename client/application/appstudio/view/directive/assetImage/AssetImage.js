var AssetImage = function () {
    return {
        controller: function ($scope) {

        },
        replace: true,
        controllerAs: 'vm',
        bindToController: {
            imageUrl: "@"
        },
        scope: {},
        template: "<div class='gallery-image'></div>",
        link: function (scope, element, attrs, controller, transcludeFn) {
            var vm = scope.vm;

            scope.$watch("vm.imageUrl", function(){
                element[0].style.backgroundImage = "url(" + vm.imageUrl + ")";
            });
        }
    };
};

module.exports = AssetImage;