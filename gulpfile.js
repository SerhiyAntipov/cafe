// 1. gulp
// 2. gulp mod
// 3. gulp export

let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');
let cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
let concat = require('gulp-concat');


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
  gulp.src('app/scss/**/*.scss')
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
    }));
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
  del.sync('app/js/libs.js');
  gulp.src([
      'app/js/index.js',
      'app/js/**/*.js'
    ])
    .pipe(concat('libs.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
//=============================

// MODULES +++++++++++++++++++++
let modules = ['jquery', 'normalize-css', 'bootstrap', 'smooth-scroll', 'slick-carousel', 'magnific-popup', 'font-awesome', 'photoswipe']
// jquery
gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/modules/jquery/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
// normalize css
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
// bootstrap
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
// smooth-scroll
gulp.task('smooth-scroll', function () {
  gulp.src('node_modules/smooth-scroll/dist/smooth-scroll.min.js')
    .pipe(gulp.dest('app/modules/smooth-scroll/js'))
});
// slick carousel
gulp.task('slick-carousel', function () {
  gulp.src(['node_modules/slick-carousel/slick/slick-theme.css', 'node_modules/slick-carousel/slick/slick.css'])
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
    .pipe(gulp.dest('app/modules/slick/css'))
    .pipe(gulp.dest('app/css'));
  gulp.src('node_modules/slick-carousel/slick/fonts/*.*')
    .pipe(gulp.dest('app/modules/slick/css/fonts'))
    .pipe(gulp.dest('app/css/fonts'));
  gulp.src('node_modules/slick-carousel/slick/slick.min.js')
    .pipe(gulp.dest('app/modules/slick/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
// magnific-popup
gulp.task('magnific-popup', function () {
  gulp.src('node_modules/magnific-popup/dist/jquery.magnific-popup.min.js')
    .pipe(gulp.dest('app/modules/magnific-popup/js'));
  gulp.src('node_modules/magnific-popup/dist/magnific-popup.css')
    .pipe(gulp.dest('app/modules/magnific-popup/css'));
});
// font-awesome
gulp.task('font-awesome', function () {
  gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('app/modules/font-awesome/css'));
});
// photoswipe
gulp.task('photoswipe', function () {
  gulp.src('node_modules/photoswipe/dist/default-skin/*.*')
    .pipe(gulp.dest('app/modules/photoswipe/dist/default-skin'));
  gulp.src('node_modules/photoswipe/dist/default-skin/*.png')
    .pipe(gulp.dest('app/css'));
  gulp.src('node_modules/photoswipe/dist/default-skin/*.svg')
    .pipe(gulp.dest('app/css'));
  gulp.src('node_modules/photoswipe/dist/*.css')
    .pipe(gulp.dest('app/modules/photoswipe/dist'));
  gulp.src(['node_modules/photoswipe/dist/photoswipe-ui-default.min.js', 'node_modules/photoswipe/dist/photoswipe.min.js'])
    .pipe(gulp.dest('app/modules/photoswipe/dist'));
});
// END MODULES =============================

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
  gulp.watch(['app/js/*.js', '!app/js/modules.js'], gulp.parallel('js'));
});
//=============================

// default task +++++++++++++++++++++
gulp.task('default', gulp.parallel(modules, 'html', 'scss', 'json', 'js', 'browser-sync', 'watch'));
//=============================

// task export project to DIST folder +++++++++++++++++
gulp.task('mod', async function () {
  del.sync(['app/css/module.min.css', 'app/js/module.js']);
  gulp.src([
      'app/modules/normalize/css/normalize.min.css',
      'app/modules/bootstrap/css/bootstrap.min.css',
      'app/modules/slick/css/libs-slick-carousel.min.css',
      'app/modules/magnific-popup/css/magnific-popup.css',
      'app/modules/photoswipe/dist/default-skin/default-skin.css',
      'app/modules/photoswipe/dist/photoswipe.css',
      'app/modules/font-awesome/css/font-awesome.min.css',
      'app/modules/**/**/*.css'
    ])
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(concat('module.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
  gulp.src([
      'app/modules/jquery/js/jquery.min.js',
      'app/modules/**/**/*.js'
    ])
    .pipe(concat('module.js'))
    .pipe(gulp.dest('app/js'))
});
//=============================

// task export project to DIST folder +++++++++++++++++
gulp.task('export', async function () {
  del.sync('dist');
  gulp.src('app/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('app/css/**/*.*').pipe(gulp.dest('dist/css'));
  gulp.src(['app/js/module.js', 'app/js/libs.js']).pipe(gulp.dest('dist/js'));
  gulp.src('app/**/*.json').pipe(gulp.dest('dist'));
  gulp.src('app/fonts/**/*.*').pipe(gulp.dest('dist/fonts'));
  gulp.src('app/data/*.*').pipe(gulp.dest('dist/data'));
  gulp.src('app/img/**/*.*').pipe(gulp.dest('dist/img'));
  // gulp.src('app/modules/**/*.*').pipe(gulp.dest('dist/modules'));
});
//====================================================