var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var cssminify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var include = require('gulp-html-tag-include');
var plumber = require('gulp-plumber');

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
//react task
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
					config.app + '/scripts/*.js',
					config.app + '/fonts/*.*',
					config.app + '/images/{*,*/}*.*'
				], { base: config.app })
			   .pipe(gulp.dest(config.dest));
});

gulp.task('dist:uglify', function(){
	return gulp.src([
		config.dest + config.jsfolder + '/*.js'
	], { base: config.dest })
	.pipe(uglify())
	.pipe(gulp.dest(config.dest));
});

//clean task
gulp.task('clean', function(cb){
    return del(['tmp', 'dest'], {force: true, read: false}, cb);
});

gulp.task('server', ['browserSync'], function(){
	gulp.start(['clean', 'react-build', 'sass', 'copy', 'html-include']);
});

gulp.task('build', ['dist:html-include', 'dist:copy', 'dist:uglify', 'dist:css']);
