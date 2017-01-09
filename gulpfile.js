'use strict';


//////////////////////////////
// Gulp Required Setup
//////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');





//////////////////////////////
// Scripts
//////////////////////////////

gulp.task('scripts', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
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
        .pipe(gulp.dest('build/css'))
        .pipe(reload({ stream:true }));
});





//////////////////////////////
// HTML task
//////////////////////////////

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream:true }));
});





//////////////////////////////
// Fonts task
//////////////////////////////

gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(reload({ stream:true }));
});






//////////////////////////////
// Image task
//////////////////////////////

gulp.task('img', function() {
gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
    .pipe(reload({ stream:true }));
    }
);


//////////////////////////////
// Browser-sync
//////////////////////////////

gulp.task('browser-sync', function () {
    browsersync({
        server:{
            baseDir: './build/'
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
    gulp.watch('src/images/*', ['img']);
    gulp.watch('src/fonts/**/*', ['fonts']);

});



//////////////////////////////
// Default Task
//////////////////////////////

gulp.task('default', ['scripts', 'sass','html','img','fonts' ,'browser-sync', 'watch']);



// That's all. Code in Dev Mode :B
