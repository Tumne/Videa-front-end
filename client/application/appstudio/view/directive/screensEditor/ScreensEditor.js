var ScreensEditor = function() {
    return {
        controller: 'screensEditorController',
        replace: true,
        restrict: 'E',
        controllerAs: 'vm',
        bindToController: {
            'model': '=',
            'associationName': '=',
            'options': '='
        },
        scope: {},
        templateUrl: 'appstudio/view/directive/screensEditor/screensEditor.html'
    };
};

module.exports = ScreensEditor;