var SERVER_CONNECTION = 'web@materia.localhorst.io';
var SERVER_DEST = '~/index';

// Load Gulp and your plugins
var gulp = require('gulp');
var autoprefixer = require('autoprefixer-stylus');
var $ = require('gulp-load-plugins')();
var path = require('path');



var paths = {
    styles: 'styl/*.styl',
    mainStyl: 'styl/main.styl',
    dist: 'dist',
    distCSS: '/css'
};

gulp.task('upload', function() {
  gulp.src(paths.dist)
    .pipe($.rsync({
        root: paths.dist,
        recursive: true,
        compress: true,
        progress: true,
        hostname: SERVER_CONNECTION,
        destination: SERVER_DEST
    }));
});

gulp.task('stylus', function () {
    gulp.src(paths.mainStyl)
      .pipe($.plumber())
        .pipe($.stylus({
            use: autoprefixer({browsers: ['Firefox > 5%', 'Explorer 9', 'Chrome > 5%', 'Safari > 5%']}),
            compress: true,
            'include css': true
        }))
        .pipe(gulp.dest(path.join(paths.dist, paths.distCSS)))
});

// Watch task
gulp.task('watch', function () {
    gulp.watch(paths.styles, ['stylus']);
});

//default task
gulp.task('default', ['stylus','watch']);

gulp.task('deploy', ['stylus','upload']);
