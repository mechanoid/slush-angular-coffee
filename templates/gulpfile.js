var gulp = require('gulp'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify');

var appPath = "./app",
    // base directory for the apps js files
    jsPath = appPath + "/javascripts",
    // uncompiled coffeescript files
    jsSrcPath = jsPath + "/src",
    // compiled js files
    jsCompilePath = jsPath + "/compiled",
    // browserified production files
    jsDistPath = jsPath + "/dist",

    // base directory for the apps css files
    cssPath = appPath + "/stylesheets",
    // uncompiled sass files
    cssSrcPath = cssPath + "/src",
    // compiled production files
    cssDistPath = cssPath + "/dist";

gulp.task('defaukt', ['browserify'], function(){});

gulp.task('browserify', ['coffee'], function(){
  gulp.src(jsCompilePath + '/app.js')
  .pipe(browserify({
    insertGlobals : true
  }))
  .pipe(gulp.dest('jsDistPath'));
});

gulp.task('coffee', function(){
  gulp.src(jsSrcPath + '/*.coffee')
  .pipe(print())
  .pipe(coffee().on('error', gutil.log).on('success', gutil.log))
  .pipe(gulp.dest(jsCompilePath + '/.'));
});

gulp.task('watch', function() {
  gulp.watch('./javascripts/src/*.coffee', ['browserify']);
});
