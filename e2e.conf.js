exports.config = {
    framework: 'jasmine2',
    seleniumServerJar: 'selenium-server-standalone-2.52.0.jar',
    chromeDriver: 'chromedriver',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    // specs: ['client/test/e2e/**/*.spec.js'],
    specs: ['client/test/e2e/appConfiguration/analyticsView/*.spec.js'],
    // specs: ['client/test/e2e/uiConfiguration/themeView/*.spec.js'],
    capabilities: {
         'browserName': 'chrome'
        // 'browserName': 'phantomjs'
    },

    baseUrl: 'http://localhost:3000'

    // jasmineNodeOpts: {
    //     defaultTimeoutInterval: 10000
    // }
};
