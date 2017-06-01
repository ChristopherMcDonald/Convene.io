var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/components/*/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function(file) {
            return file.base; 
    }));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('src/components/*/*.scss',['styles']);
});