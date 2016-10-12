module.exports = [
    {
        stateName: 'app.appStudio',
        url: '/appStudio',
        templateUrl: 'appstudio/view/page/appStudio/appStudio.html',
        controller: 'appStudioController',
        controllerAs: 'vm',
    },
    {
        stateName: 'app.appStudio.brandView',
        url: '/brands',
        templateUrl: 'appstudio/view/page/brandView/brandView.html',
        controller: 'brandViewController',
        controllerAs: 'vm',
    },
    {
        stateName: 'app.appStudio.mediaGalleryView',
        url: '/gallery?brandId',
        templateUrl: 'appstudio/view/page/mediaGalleryView/mediaGalleryView.html',
        controller: 'mediaGalleryViewController',
        controllerAs: 'vm',
        params: {
            'a': null,
            'brandId': null,
        }
    },
    {
        stateName: 'app.appStudio.appConfigurationView',
        url: '/app?brandId&appId',
        templateUrl: 'appstudio/view/page/appConfigurationView/appConfigurationView.html',
        controller: 'appConfigurationViewController',
        controllerAs: 'vm',
        params: {
            'a': null,
            'appId': null,
            'brandId': null,
        }
    },
    {
        stateName: 'app.appStudio.uiConfigurationView',
        url: '/version?brandId&appId&uiConfigId',
        templateUrl: 'appstudio/view/page/uiConfigurationView/uiConfigurationView.html',
        controller: 'uiConfigurationViewController',
        controllerAs: 'vm',
        params: {
            'a': null,
            'uiConfigId': null,
            'appId': null,
            'brandId': null,
        }
    },
];