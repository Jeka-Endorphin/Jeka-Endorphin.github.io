const gulp          = require('gulp'),
      concat        = require('gulp-concat'),
      sass          = require('gulp-ruby-sass'),
      autoPrefixer  = require('gulp-autoprefixer'),
      cleanCSS      = require('gulp-clean-css'),
      // uglify        = require('gulp-uglify'),
      rename        = require('gulp-rename'),
      sourceMaps    = require('gulp-sourcemaps'),
      server        = require('gulp-server-livereload'),
      imageMin      = require('gulp-imagemin'),
      cache         = require('gulp-cache'),
      babel         = require('gulp-babel');  

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 15',
  'chrome >= 25',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', function() {
    return sass('src/components/main.scss', { sourcemap: true, style: 'compact' })
        .on('error', sass.logError)
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(autoPrefixer({
            browsers: AUTOPREFIXER_BROWSERS,
            cascade: false
        }))
        .pipe(rename('app.css'))
        .pipe(cleanCSS())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('pages', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('fonts', function(){
  return gulp.src('src/theme/fonts/*')
    .pipe(gulp.dest('dist/css/fonts'))
});

gulp.task('images', function(){
  return gulp.src('src/theme/img/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('js', function() {
  return gulp.src('src/js/*')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('json', function() {
  return gulp.src('src/js/data.json')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('scripts', function() {
return gulp.src([ 
    'src/theme/libs/jquery/dist/jquery.min.js',
    // 'src/theme/libs/lodash/dist/lodash.min.js',
    'src/theme/libs/tmplResig.js',
    'src/theme/libs/slick-carousel/slick/slick.min.js',
    'src/theme/libs/imagesloaded/imagesloaded.pkgd.min.js',
    'src/theme/libs/masonry/dist/masonry.pkgd.min.js'
  ])
  .pipe(concat('libs.min.js')) 
  // .pipe(uglify())
  .pipe(gulp.dest('dist/libs'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          cb( !(/.DS_Store/.test(filePath)) );
        }
      },
      directoryListing: false,
      open: true,
      log: 'info',
      defaultFile: 'index.html'
    })
  );
});

gulp.task('default', function() {
  gulp.start('pages', 'sass', 'scripts', 'js', 'json', 'images', 'fonts', 'webserver');
  gulp.watch('src/*.html', ['pages']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/components/**/*.scss', ['sass']);
  gulp.watch('src/theme/images/**/*.*', ['images']);
});
