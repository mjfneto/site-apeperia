const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

function clean() {
  return del('./dist/**');
}

function copySrc() {
  return gulp.src(['./src/**', '!./src/less{,/**}']).pipe(gulp.dest('dist'));
}

function buildHTML() {
  return gulp.src('./src/**/*.html').pipe(gulp.dest('./dist'));
}

function buildCSS() {
  return gulp
    .src(['./src/less/**', '!./src/less/global{,/**}'])
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    open: false,
  });

  gulp
    .watch('./src/**/*.html')
    .on('change', gulp.series(['buildHTML', reload]));
  gulp.watch('./src/less/**/*.less', gulp.series(['buildCSS']));
}

exports.default = gulp.series(clean, copySrc, buildCSS, serve);

exports.clean = clean;
exports.copySrc = copySrc;
exports.buildHTML = buildHTML;
exports.buildCSS = buildCSS;
exports.serve = serve;
