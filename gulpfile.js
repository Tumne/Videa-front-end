var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var vinylSource = require('vinyl-source-stream');
var ngAnnotate = require('browserify-ngannotate');
var ngAnnotateAngular = require('gulp-ng-annotate');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gls = require('gulp-live-server');
var bump = require('gulp-bump');
var fs = require("fs");
var jeditor = require("gulp-json-editor");
var shell = require('gulp-shell');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var protractor = require("gulp-protractor").protractor;
var print = require('gulp-print');
var Server = require('karma').Server;

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;

}

Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
    return yyyy + MM + dd+  hh + mm + ss;
};
var paths = {
    clientTest: ['app/public/test/**/*.test.js'],
    jsSrc: ['./client/application/**/*.js'],
    entry: ['./client/application/entry.js'],
	testEntry: ['./client/test/unit-tests/index.js'],
    bundleSrc: 'bundle.js',
	testBundleSrc: 'testBundle.js',
    vendorSrc: 'vendor.js',
    vendorProdSrc: 'vendor.min.js',
    vendorCSSProdSrc: 'vendor.min.css',
    bundleDest: './client/js',
	testBundleDest: './client/test/unit-tests',
    bundleProdSrc: 'prodBundle.js',
    prodDest: './production',
    templateSrc: 'client/application/**/*.html',
    cssDest: './client/css',
    fontDest: './client/fonts',
    sassSrc: './client/sass/main.scss',
	sassWatchSrc: './client/sass/**/*.scss',
    sassDest: './client/css',
    bowerSrc: './bower.json',
    browserifyAliasPath: 'client/application',
	browserifyTestAliasPath: 'client/application',
	mochaTestPath: 'client/test/unit-tests/**/*.test.js',
    sassProdDest: './production/css',
    jsProdDest: './production/js',
    fontProdDest: './production/fonts'
};

gulp.task('test:client:karma', function () {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	},function(){
		//Do stuff on complete
	}).start();
});

gulp.task('test:client:mocha', function () {
	gutil.log(gutil.colors.bgCyan('Running Mocha Tests'));
	
	return gulp.src(paths.mochaTestPath, {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('sass', function(done) {
  gulp.src(paths.sassSrc)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(paths.sassDest))
    .on('end', done);
});

gulp.task('sass:dev', function(done) {
	gulp.src(paths.sassSrc)
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest(paths.sassDest))
		.on('end', done);
});

gulp.task('sass:prod', function(done) {
  gulp.src(paths.sassSrc)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.sassProdDest))
    .on('end', done);
});

gulp.task('template:dev', function () {
  return gulp.src(paths.templateSrc)
    .pipe(templateCache({
        standalone: true,
        module: 'videa.templates'
    }))
    .pipe(gulp.dest(paths.bundleDest));
});

gulp.task('template:prod', function(){
    return gulp.src(paths.templateSrc)
    .pipe(templateCache({
        standalone: true,
        module: 'videa.templates'
    }))
    .pipe(gulp.dest(paths.jsProdDest));
});

gulp.task('package-bower-js:dev', function(){
	
	//Package Vendor JS Files
	gulp.src(mainBowerFiles({
		overrides: {
			jquery: {
				ignore: true
			},
			bootstrap: {
				ignore: true
			}
		}
		}))
		.pipe(filter(['**/*.js','*.js']))
		//.pipe(print())
		.pipe(concat('vendor.js'))
		//.pipe(plugins.uglify())
		.pipe(gulp.dest(paths.bundleDest));
});

gulp.task('package-bower-css:dev', function(){
	
	//Package Vendor CSS Files
	gulp.src(mainBowerFiles({
			overrides: {
				bootstrap: {
					main: [
						'./dist/css/bootstrap.min.css'
					]
				}
			}
		}))
		.pipe(filter(['*.css', '*.scss','**/*.css']))
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest(paths.cssDest));
});

gulp.task('package-bower-fonts:dev', function(){
	
	//Package Vendor Font Files
	gulp.src(mainBowerFiles({
			overrides: {
				bootstrap: {
					main: [
						'./fonts/*'
					]
				}
			}
		}))

		.pipe(filter(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2',
			'./*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
		.pipe(gulp.dest(paths.fontDest));
});

gulp.task('package-bower-js:prod', function(){

	//Package Vendor JS Files
	gulp.src(mainBowerFiles({
			overrides: {
				jquery: {
					ignore: true
				},
				bootstrap: {
					ignore: true
				}
			}
	}))
		.pipe(filter(['**/*.js','*.js']))
		.pipe(concat(paths.vendorProdSrc))
        .pipe(ngAnnotateAngular())
		.pipe(streamify(uglify({
            output: {
                    comments: false
            },
            mangle: true
        })))
		.pipe(gulp.dest(paths.jsProdDest));
});

gulp.task('package-bower-css:prod', function(){

	//Package Vendor CSS Files
	gulp.src(mainBowerFiles({
			overrides: {
				bootstrap: {
					main: [
						'./dist/css/bootstrap.min.css'
					]
				}
			}
		}))
		.pipe(filter(['*.css', '*.scss','**/*.css']))
		// .pipe(print())
		.pipe(concat(paths.vendorCSSProdSrc))
		.pipe(minify())
		.pipe(gulp.dest(paths.sassProdDest));
});

gulp.task('package-bower-fonts:prod', function(){

	//Package Vendor Font Files
	gulp.src(mainBowerFiles({
			overrides: {
				bootstrap: {
					main: [
						'./fonts/*'
					]
				}
			}
		}))

		.pipe(filter(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2',
			'./*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
		.pipe(gulp.dest(paths.fontProdDest));
});

gulp.task('browserify:dev', function() {
  return browserify(paths.entry, {
    transform: [ngAnnotate],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true,
    paths: [paths.browserifyAliasPath]
    })
    .bundle()
    .on('error', function(message){
        console.log(message);
    })
    .pipe(vinylSource(paths.bundleSrc))
    .pipe(gulp.dest(paths.bundleDest));
});

////Used to bundle all the unit tests
//gulp.task('browserify:tests', function() {
//	return browserify(paths.testEntry, {
//		transform: [ngAnnotate],
//		debug: true,
//		cache: {}, packageCache: {}, fullPaths: true,
//		paths: [paths.browserifyTestAliasPath]
//	})
//		.bundle()
//		.on('error', function(message){
//			console.log(message)
//		})
//		.pipe(vinylSource(paths.testBundleSrc))
//		.pipe(gulp.dest(paths.testBundleDest));
//});

gulp.task('browserify:prod', function () {
    var bundleStream = browserify(paths.entry, {
        transform: [ngAnnotate],
        paths: [paths.browserifyAliasPath],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
        })
        .bundle();

    bundleStream
        .pipe(vinylSource(paths.bundleSrc))
        .pipe(streamify(uglify({
            output: {
                    comments: false
            },
            mangle: false
        })))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(paths.jsProdDest));
});

// gulp.task('server', function() {
//     var server = gls('bin/www', {env: {NODE_ENV: 'development'}}, false);
//     server.start();
// });

gulp.task('server', shell.task([
    'node main.js'
]));

gulp.task('version:patch', function(){
  gulp.src(['bower.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('version:minor', function(){
  gulp.src(['bower.json'])
  .pipe(bump({type:'minor'})) .pipe(gulp.dest('./'));
});

gulp.task('version:major', function(){
  gulp.src(['bower.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
	gulp.watch(paths.templateSrc, ['template:dev']);
	gulp.watch(paths.sassWatchSrc, ['sass']);
	gulp.watch(paths.jsSrc, ['browserify:dev']);
	gulp.watch(paths.bowerSrc, ['vendor:dev']);
});

gulp.task('e2e', shell.task([
    'protractor e2e.conf.js'
]));


gulp.task('vendor:dev', ['package-bower-js:dev', 'package-bower-css:dev', 'package-bower-fonts:dev']);

gulp.task('vendor:prod', ['package-bower-js:prod', 'package-bower-css:prod', 'package-bower-fonts:prod']);

gulp.task('dev', ['sass', 'template:dev', 'browserify:dev']);

gulp.task('backend:dev', ['typescript:backend']);

gulp.task('compile', ['dev', 'watch']);

gulp.task('start:server', ['server']);
gulp.task('prod', ['sass:prod', 'vendor:prod', 'template:prod', 'browserify:prod', 'assets:prod']);

gulp.task('pull', shell.task([
    'rm -rf bower_components',
    'bower install',
    'sudo npm install',
    'gulp vendor:dev',
    'gulp dev'
]));

gulp.task('assets:prod', shell.task([
    'rm -rf production/images',
    'rm -rf production/fonts',
    'cp -rf client/images production',
    'cp -rf client/fonts production'
]));

gulp.task('test:client',['test:client:karma','test:client:mocha'], function () {
	
});
