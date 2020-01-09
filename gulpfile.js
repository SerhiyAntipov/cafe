let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');
let cssmin = require('gulp-cssmin');
// let uglify = require('gulp-uglify');
// let concat = require('gulp-concat');

gulp.task('normalize-css', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('bootstrap-css', function () {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

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

gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('script', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('bootstrap-js', function () {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('libs-js', function () {
//   return gulp.src([
//       'node_modules/jquery/dist/jquery.min.js',
//       'node_modules/bootstrap/dist/js/bootstrap.min.js'
//     ])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// });

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('bootstrap-css', 'normalize-css', 'scss', 'jquery', 'bootstrap-js', 'script', 'browser-sync', 'watch'));


//EXPOTR PROJECT to "dist" folder ###################
gulp.task('export', async function () {
  del.sync('dist');
  gulp.src('app/**/*.html').pipe(gulp.dest('dist'));
  gulp.src('app/css/**/*.css').pipe(gulp.dest('dist/css'));
  gulp.src('app/js/**/*.js').pipe(gulp.dest('dist/js'));
  gulp.src('app/fonts/**/*.*').pipe(gulp.dest('dist/fonts'));
  gulp.src('app/img/**/*.*').pipe(gulp.dest('dist/img'));
});
// ##################################################