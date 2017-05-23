"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var bsync = require('browser-sync');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
  return gulp.src('app/assets/sass/**/*')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix('last 2 versions', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('build/assets/css/'))
    .pipe(bsync.stream());
});

gulp.task('pug', function() {
  return gulp.src('app/*.pug')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(pug())
    .pipe(sourcemaps.write('assets/maps'))
    .pipe(gulp.dest('build/'))
    .pipe(bsync.stream());
});

gulp.task('img', function() {
  gulp.src('app/assets/img/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('build/assets/img'))
    .pipe(bsync.stream());
});

gulp.task('dev', ['pug', 'sass'], function() {
  bsync.init({
    server: './build/'
  });

  gulp.watch('app/assets/sass/**/*.sass', ['sass']);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/assets/img/**/*', ['img']);
  gulp.watch('build/assets/img/**/*').on('change', bsync.reload);
  gulp.watch('build/**/*.{html,css,js}').on('change', bsync.reload);
});

gulp.task('default', ['dev']);
