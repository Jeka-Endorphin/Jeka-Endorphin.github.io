const gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-ruby-sass'),
    autoPrefixer  = require('gulp-autoprefixer'),
    cleanCSS      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    sourceMaps    = require('gulp-sourcemaps'),
    server        = require('gulp-server-livereload'),
    imageMin      = require('gulp-imagemin'),
    cache         = require('gulp-cache');

gulp.task('sass', function() {
  return sass('src/components/main.scss')
	.pipe(autoPrefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(rename('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pages', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('requirejs', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: {
        enable: true
      },
      directoryListing: false,
      open: true,
      log: 'info',
      defaultFile: 'index.html'
    })
  );
});

gulp.task('default', function() {
  gulp.start('pages', 'sass', 'requirejs', 'webserver');
  gulp.watch('src/*.html', ['pages']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/components/**/*.scss', ['sass']);
});
