const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');

gulp.task('clean:dist', function () {
  return del('dist/**/*');
});

gulp.task('copy:src', function () {
  return gulp.src(['src/**', '!src/less{,/**}']).pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
  return gulp
    .src(['src/less/**', '!src/less/global{,/**}'])
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch:less', function () {
  return gulp.watch('src/less/', gulp.series('build:css'));
});

gulp.task('start', gulp.series('clean:dist', 'copy:src', 'build:css'));

exports.default = gulp.series('start', 'watch:less');
