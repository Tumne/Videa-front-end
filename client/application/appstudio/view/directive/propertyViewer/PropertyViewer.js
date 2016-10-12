


var PropertyViewer = function() {
    return {
        controller: 'propertyViewerController',
        replace: true,
        restrict: 'E',
        controllerAs: 'vm',
        bindToController: {
            'model': '=',
            'ignore': '=',
            'config': '=',
            'account': '=',
            'app': '=',
            'brand': '='
        },
        scope: {},
        templateUrl: 'appstudio/view/directive/propertyViewer/propertyViewer.html'
    };
};

module.exports = PropertyViewer;