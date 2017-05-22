"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    pug  = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    bsync = require('browser-sync');

gulp.task('sass', function () {
  return gulp.src('app/assets/sass/**/*')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix('last 2 versions', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/assets/css/'))
    .pipe(bsync.stream());
});

gulp.task('pug', function () {
  return gulp.src('app/*.pug')
    .pipe(plumber())
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
