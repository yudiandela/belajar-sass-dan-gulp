var gulp = require('gulp');
var rename = require('gulp-rename');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');

// Minify CSS File no Concat
gulp.task('minify-css', function () {
    gulp.src('./dist/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

// Minify CSS File on Concat Bundle
gulp.task('minify-css-all', function () {
    gulp.src('./dist/css/*.css')
        .pipe(gulpMinifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulpConcat('all.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

// Minify JS File no Concat
gulp.task('minify-js', function () {
    gulp.src('./dist/js/*.js')
        .pipe(gulpUglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'));
});

// Minify JS File on Concat Bundle
gulp.task('minify-js-all', function () {
    gulp.src('./dist/js/*.js')
        .pipe(gulpConcat('all.js'))
        .pipe(gulpUglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'));
});

// Minify HTML File
gulp.task('minify-html', function () {
    gulp.src('*.html')
        .pipe(gulpHtmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});

// Clean the minify
gulp.task('clean', function () {
    return gulp.src(['dist/css', 'dist/js'], {
            read: false
        })
        .pipe(clean());
});

// // Clean and Build
// gulp.task('build', gulpSequence('clean', 'minify-css', 'minify-js', 'minify-html'));