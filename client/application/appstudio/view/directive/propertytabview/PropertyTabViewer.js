var PropertyTabViewer = function() {
    return {
        controller: 'propertyTabViewerController',
        replace: true,
        restrict: 'E',
        controllerAs: 'vm',
        bindToController: {
            'model': '=',
            'openTab': '=',
            'ignore': '=',
            'config': '=',
            'account': '=',
            'app': '=',
            'brand': '='
        },
        scope: {},
        templateUrl: 'appstudio/view/directive/propertytabview/propertyTabViewer.html'
    };
};

module.exports = PropertyTabViewer;