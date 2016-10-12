var VersionsViewDirective = function () {
    return {
        restrict: 'E',
        templateUrl: 'appstudio/view/directive/versionsView/versionsView.html',
        scope: {},
        controller: 'versionsViewController',
        controllerAs: 'vm',
        bindToController: {
            brandId: '=',
            appModel: '=',
            accountId: '=',
            goBack: '&',
            appId: '=',
            activeConfig: '='
        }
    };
};
module.exports = VersionsViewDirective;
