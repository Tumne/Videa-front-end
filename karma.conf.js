// Karma configuration

module.exports = function(config) {
	
    config.set({
		autoWatch: true,
        basePath: '../frontend/',
        frameworks: [ 'browserify', 'mocha', 'chai', 'sinon'],
        files: [
			'client/js/vendor.js',
			'client/js/bundle.js',
			'client/js/cms.js',
			'client/js/templates.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'client/test/unit-tests/index.js',
			'client/test/unit-tests/**/*.spec.js',
			{pattern: 'client/images/**/*', watched: false, included: false, served: true}
        ],
        preprocessors: {
			'test/unit-tests/*.js': [ 'browserify' ],
            'test/unit-tests/**/*.spec.js': [ 'browserify' ]
            //'app/**/*.html': ['ng-html2js']
        },
        //coverageReporter: {
			//type: 'text-summary',
			//dir: 'coverage/'
        //},
        browserify: {
            debug: true
        },
		//config.LOG_DEBUG, LOG_ERROR
		logLevel: config.LOG_ERROR,
        browsers: ['PhantomJS']
    });
};

//node_modules/protractor/bin/webdriver-manager update
//node_modules/protractor/bin/webdriver-manager start
