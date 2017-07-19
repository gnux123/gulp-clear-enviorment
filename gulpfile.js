var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var cssminify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var include = require('gulp-html-tag-include');
var plumber = require('gulp-plumber');

//es6 minify
var uglifyjs = require('uglify-es');
var composer = require('gulp-uglify/composer');
var pump = require('pump');
var minify = composer(uglifyjs, console);

//react build use
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var named = require('vinyl-named');
var webpackConfig = require("./webpack.config.js");

//server load
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//config
var config = {
	app: "app",
	temp: "tmp",
	dest: "dest",
	jsfolder: "/scripts"
};

//server task
gulp.task('browserSync', ['clean'], function() {
    browserSync.init({
        server: {
            baseDir: "./tmp"
        }
    });

	return gulp.watch([
				config.app + '/{,*/}*.html',
				config.app + '/scripts/*.js',
				config.app + '/jsx/*.jsx',
				config.app + '/scss/{*,*/,*/*/,*/*/*/}*.scss'
			], ['react-build', 'html-include', 'sass', 'copy']).on("change", reload);
});


//jsx task
gulp.task('react-build', function(){
	return gulp.src([config.app + '/jsx/*.jsx', config.app + '/jsx/libraries/*.jsx'])
				.pipe(named())
				.pipe(plumber())
				.pipe(webpackStream(webpackConfig, webpack))
    			.pipe(gulp.dest(config.temp + config.jsfolder));
});

//sass task
gulp.task('sass', function(){
	return gulp.src(config.app + '/scss/{*,*/,*/*/,*/*/*/}*.scss')
			   .pipe(sass({
	                    includePaths: [
							'./node_modules/font-awesome',
							'./node_modules/compass-mixins/lib',
							'./node_modules/susy/sass',
							'./node_modules/animatewithsass/'
						],
						outputStyle: 'expanded',
						precision: 10,
						errLogToConsole: true
	                }).on('error', sass.logError)
				)
			   .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			   .pipe(gulp.dest(config.temp + '/css'));
});

//html template include task
gulp.task('html-include', function() {
	return gulp.src(config.app+'/*.html', {base: config.app})
		.pipe(include())
		.pipe(gulp.dest(config.temp));
});

//copy task
gulp.task('copy', function(){
	return gulp.src([
					config.app + '/scripts/*.js',
					config.app + '/fonts/*.*',
					config.app + '/images/{*,*/}*.*',
					config.app + '/Themes/{*,*/,*/*/,*/*/*/}*.*'
				], { base: config.app })
			   .pipe(gulp.dest(config.temp));
});


//dist tasks
gulp.task('dist:html-include', function() {
	return gulp.src(config.app+'/*.html', {base: config.app})
		.pipe(include())
		.pipe(gulp.dest(config.dest));
});

gulp.task('dist:css', function(){
	return gulp.src(config.temp + '/css/*.css', { base: config.temp })
			   .pipe(cssminify())
			   .pipe(gulp.dest(config.dest));
});

gulp.task('dist:copy', function(){
	return gulp.src([
					config.temp + '/scripts/*.js',
					config.temp + '/fonts/*.*',
					config.temp + '/images/{*,*/}*.*'
				], { base: config.temp })
			   .pipe(gulp.dest(config.dest));
});

gulp.task('dist:uglify', function(cb){
	pump([
		gulp.src([
			config.dest + '/scripts/*.js'
		], { base: config.dest }),
		minify({
			//do something settings
			//example: https://gist.github.com/gnux123/7ae8d479b47c7c9bb7b5ac533e197915
		}),
		gulp.dest(config.dest)
	],
	cb)
});

//clean task
gulp.task('clean', function(cb){
    return del(['tmp', 'dest'], {force: true, read: false}, cb);
});

//develop environment
gulp.task('server', ['clean', 'browserSync'], function(){
	gulp.start(['react-build', 'sass', 'copy', 'html-include']);
});

//production environment
gulp.task('build', ['dist:copy'], function(){
	gulp.start(['dist:css', 'dist:uglify', 'dist:html-include']);
});
