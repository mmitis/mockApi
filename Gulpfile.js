const gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint');

gulp.task('babel', function() {
    return gulp.src('server/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['add-module-exports']
        }))
        .pipe(gulp.dest('dist/server'));
});

gulp.task('lint', function () {
    return gulp.src(['server/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
