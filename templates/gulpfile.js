var gulp = require('gulp'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    http = require('http'),
    ecstatic = require('ecstatic');

var appPath = "./app",
    // base directory for the apps js files
    jsPath = appPath + "/javascripts",
    // uncompiled coffeescript files
    jsSrcPath = jsPath + "/src",
    // compiled js files
    jsCompilePath = jsPath + "/compiled/.",
    // browserified production files
    jsDistPath = jsPath + "/dist/.",

    // base directory for the apps css files
    cssPath = appPath + "/stylesheets",
    // uncompiled sass files
    cssSrcPath = cssPath + "/src",
    // compiled production files
    cssDistPath = cssPath + "/dist";

gulp.task('default', ['browserify'], function(){});

gulp.task('browserify', ['coffee'], function(){
  gulp.src(jsCompilePath + '/app.js')
  .pipe(browserify())
  .pipe(gulp.dest(jsDistPath + ''));
});

gulp.task('coffee', function(){
  gulp.src(jsSrcPath + '/**/*.coffee')
  .pipe(print())
  .pipe(coffee().on('error', gutil.log).on('success', gutil.log))
  .pipe(gulp.dest(jsCompilePath));
});

gulp.task('watch', function() {
  gulp.watch(jsSrcPath + '/**/*.coffee', ['browserify']);
});

gulp.task('createServer', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(8080);
});

gulp.task('server', ['browserify', 'watch', 'createServer']);
