'use strict';


//////////////////////////////
// Gulp Required Setup
//////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');





//////////////////////////////
// Scripts
//////////////////////////////

gulp.task('scripts', function () {
    gulp.src(['src/js/**/*.js','!src/js/**/*.min.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(reload({ stream:true }));
});




//////////////////////////////
// Sass
//////////////////////////////

gulp.task('sass', function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(reload({ stream:true }));
});





//////////////////////////////
// HTML task
//////////////////////////////

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(reload({ stream:true }));
});





//////////////////////////////
// Browser-sync
//////////////////////////////

gulp.task('browser-sync', function () {
    browsersync({
        server:{
            baseDir: './src/'
        }
    })
});




//////////////////////////////
// Watch task
//////////////////////////////

gulp.task('watch', function () {
   gulp.watch('src/js/**/*.js', ['scripts']);
   gulp.watch('src/sass/**/*.scss', ['sass']);
   gulp.watch('src/**/*.html', ['html']);
});



//////////////////////////////
// Default Task
//////////////////////////////

gulp.task('default', ['scripts', 'sass','html' ,'browser-sync', 'watch']);



// That's all. Code in Dev Mode :B
