var gulp = require('gulp'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    install = require('gulp-install'),
    inquirer = require('inquirer'),
    print = require('gulp-print');

var exec = require('child_process').exec;

var emptyAsEmptyString = function(input) {
  if(input === "<empty>") {
    return "";
  } else {
    return input;
  }

};

gulp.task('default', function (done) {
  inquirer.prompt([
    {type: 'input', name: 'appname', message: 'Give your app a name', default: gulp.args.join('-')},
    {type: 'input', name: 'bowerlocation', message: 'Where to lay your vendor files installed by bower?', default: "vendor/javascripts"},
    {type: 'input', name: 'license', message: 'What\'s license should this app contain?', default: "MIT"},
    {type: 'confirm', name: 'moveon', message: 'Continue?'}
  ],
  function (answers) {
    if (!answers.moveon) {
      return done();
    }
    var appFolder = answers.appname = answers.appname.split(' ').join('-').toLowerCase();
    appFolder = './' + appFolder;

    gulp.src(__dirname + '/templates/**', { dot: true })  // Note use of __dirname to be relative to generator
      .pipe(template(answers))                 // Lodash template support
      .pipe(conflict(appFolder))                    // Confirms overwrites on file conflicts
      .pipe(gulp.dest(appFolder))                   // Without __dirname here = relative to cwd
      .pipe(print())
      .pipe(install(appFolder))
      .on('end', function () {
      });
  });
});
