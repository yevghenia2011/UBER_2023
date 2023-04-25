var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass')(require('sass')); 
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'styles', 'server'));

//For CHROME

/* gulp.task('brow', function() {
    brow.init({
      server: {
        baseDir: 'app'
      },
      browser: 'google chrome',
      notify: false
    });
  });
 */