const gulp = require('gulp');
const webserver = require('gulp-webserver');
const react = require('gulp-react');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const cucumber = require('gulp-cucumber');
const mochaPhantomJS = require('gulp-mocha-phantomjs');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('test', function () {
    return gulp
    .src('test/runner.html')
    .pipe(mochaPhantomJS({reporter: 'spec', phantomjs: {useColors:true}}));
});

gulp.task('scripts', function() {
  return gulp.src(['./src/config/app.js', './src/controllers/**/*.js', './compiled/**/*.js', './src/config/routes.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('react', function () {
    return gulp.src('./src/views/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./compiled/react'));
});

gulp.task('server', function() {
  return gulp.src('./public').pipe(webserver({
      livereload: true,
      directoryListing: false
  }));
});

gulp.task('watch', function () {
    // Endless stream mode
    gulp.watch('./src/views/**/*.jsx', ['react']);
    gulp.watch(['./src/**/*.js', './compiled/**/*.js'], ['scripts']);
    gulp.watch(['./tests/*.js', './src/**/*.js'], ['test']);
});

gulp.task('default', ['server', 'react', 'scripts', 'watch', 'test']);
