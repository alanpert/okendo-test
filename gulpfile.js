var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('public/assets/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('minify-css', function() {
  return gulp.src('public/assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('build:sass', function() {
  runSequence('sass', 'minify-css');
});

gulp.task('watch', function() {
  gulp.watch('public/assets/sass/**/*.scss', ['build:sass']);
});


/* DEFAULT TASK */
gulp.task('default', ['build:sass', 'watch', 'sync']);
