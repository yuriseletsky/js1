'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return gulp.src('./style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./style/'));
};

function defaultTask() {
    gulp.watch('./style/**/*.scss', buildStyles);
}

exports.buildStyles = buildStyles;
exports.default = defaultTask