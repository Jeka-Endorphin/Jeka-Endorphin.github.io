'use strict';

var gulp 			= require('gulp'),
	concat 			= require('gulp-concat'),
	sass 			= require('gulp-ruby-sass'),
	autoPrefixer 	= require('gulp-autoprefixer'),
	cleanCSS 		= require('gulp-clean-css'),
	uglify   	    = require('gulp-uglify'),
	rename 			= require('gulp-rename'),
	sourceMaps 		= require('gulp-sourcemaps'),
	server 			= require('gulp-server-livereload'),
	imageMin 		= require('gulp-imagemin'),
	cache 			= require('gulp-cache');  

gulp.task('sass', function() {
return sass('src/components/main.scss', { sourcemap: true, style: 'compact' })
        .on('error', sass.logError)
        .pipe(sourceMaps.init({loadMaps: true}))
            .pipe(autoPrefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
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
    return gulp.src('src/theme/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images/'))
});

gulp.task('js', function() {
    return gulp.src('src/theme/js/*.js')
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'src/theme/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'src/theme/libs/slick-carousel/slick/slick.min.js',
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/libs'));
    gulp.src('src/theme/js/*.js')
        .pipe(gulp.dest('dist'));
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
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'sass', 'images', 'fonts', 'scripts', 'js', 'webserver');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/components/**/*.scss', ['sass']);
});