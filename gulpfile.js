let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');
let cssmin = require('gulp-cssmin');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

// jquery +++++++++++++++++++++
gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/modules/jquery/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// normalize css ++++++++++++++
gulp.task('normalize-css', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/modules/normalize/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// bootstrap +++++++++++++++++++
gulp.task('bootstrap', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/modules/bootstrap/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('app/modules/bootstrap/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// smooth-scroll +++++++++++++++++++
gulp.task('smooth-scroll', function () {
  gulp.src('node_modules/smooth-scroll/dist/smooth-scroll.min.js')
    .pipe(gulp.dest('app/modules/smooth-scroll/js'))
});
//=============================

// slick carousel ++++++++++++++
gulp.task('slick-carousel', function () {
  gulp.src(['node_modules/slick-carousel/slick/slick.css', 'node_modules/slick-carousel/slick/slick-theme.css'])
    .pipe(concat('libs-slick-carousel.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/modules/slick/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
  gulp.src('node_modules/slick-carousel/slick/ajax-loader.gif')
    .pipe(gulp.dest('app/modules/slick/css'));
  gulp.src('node_modules/slick-carousel/slick/fonts/slick.ttf')
    .pipe(gulp.dest('app/modules/slick/css/fonts'));
  gulp.src('node_modules/slick-carousel/slick/fonts/slick.woff')
    .pipe(gulp.dest('app/modules/slick/css/fonts'));
  gulp.src('node_modules/slick-carousel/slick/slick.min.js')
    .pipe(gulp.dest('app/modules/slick/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// html +++++++++++++++++++++++
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// scss +++++++++++++++++++++++
gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// json +++++++++++++++++++++
gulp.task('json', function () {
  return gulp.src('app/**/*.json')
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// script +++++++++++++++++++++
gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});
//=============================

// browser-sync +++++++++++++++++++++
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});
//=============================

// watch +++++++++++++++++++++
gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/**/*.json', gulp.parallel('json'));
  gulp.watch('app/js/*.js', gulp.parallel('js'))
});
//=============================

// default task +++++++++++++++++++++
gulp.task('default', gulp.parallel('jquery', 'normalize-css', 'bootstrap', 'smooth-scroll', 'slick-carousel', 'html', 'scss', 'json', 'js', 'browser-sync', 'watch'));
//=============================

// task export project to DIST folder +++++++++++++++++
gulp.task('export', async function () {
  del.sync('dist');
  gulp.src('app/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('app/css/**/*.css').pipe(gulp.dest('dist/css'));
  gulp.src('app/js/*.js').pipe(gulp.dest('dist/js'));
  gulp.src('app/**/*.json').pipe(gulp.dest('dist'));
  gulp.src('app/fonts/**/*.*').pipe(gulp.dest('dist/fonts'));
  gulp.src('app/data/*.*').pipe(gulp.dest('dist/data'));
  gulp.src('app/img/**/*.*').pipe(gulp.dest('dist/img'));
  gulp.src('app/modules/**/*.*').pipe(gulp.dest('dist/modules'));
});
//====================================================