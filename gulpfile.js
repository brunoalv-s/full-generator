"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    pug  = require('gulp-pug'),
    bsync = require('browser-sync');

gulp.task('sass', function () {
  return gulp.src('app/assets/sass/**/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/assets/css/'))
    .pipe(bsync.stream());
});

gulp.task('pug', function () {
  return gulp.src('app/*.pug')
    .pipe(sourcemaps.init())
    .pipe(pug())
    .pipe(sourcemaps.write('assets/maps'))
    .pipe(gulp.dest('build/'))
    .pipe(bsync.stream());
});

gulp.task('dev', ['pug', 'sass'], function () {
  bsync.init({
    server: './build/'
  });

  gulp.watch('app/assets/sass/**/*.sass', ['sass']);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('build/**/*.{html,css,js}').on('change', bsync.reload);
});

gulp.task('default', ['dev']);
