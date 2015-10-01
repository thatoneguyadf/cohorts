var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    envfile = require('envfile'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    watch = require('gulp-watch'),
    gulpif = require('gulp-if');

gulp.task('js-deps', function () {
    gulp.src([
        './public/bower_components/jquery/dist/jquery.min.js',
        './public/bower_components/lodash/lodash.min.js',
        './public/bower_components/moment/min/moment.min.js',
        './public/bower_components/angular/angular.min.js',
        './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ])
        .pipe(concat('deps.js'))
        .pipe(gulp.dest('./build/js'));

    //move maps
    gulp.src([
        './public/bower_components/angular/angular.min.js.map'
    ])
        .pipe(gulp.dest('./build/js'))
});

gulp.task('partials', function () {
    gulp.src('./public/javascripts/**/*.html')
        .pipe(gulp.dest('./build/partials'));
});

gulp.task('css-deps', function () {
    gulp.src([
        "./public/bower_components/bootstrap/dist/css/bootstrap.min.css",
        "./public/bower_components/font-awesome/css/font-awesome.min.css"
    ])
        .pipe(concat('css-deps.css'))
        .pipe(gulp.dest('./build/css'));

    gulp.src('./public/bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('js', function () {
    var baseDir = __dirname + '/public/javascripts',
        outputDir = __dirname + '/build/js',
        outputFilename = 'app.js',
        env = envfile.parseFileSync('.env');

    gulp.src([
        baseDir + "/*module.js",
        baseDir + "/**/*module.js",
        baseDir + "/**/*.js"
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(gulpif(env.PRODUCTION === 'true', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir));
});

gulp.task('less', function () {
    gulp.src([
        './public/less/app.less'
    ])
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function () {
    var env = envfile.parseFileSync('.env');
    nodemon({
        script: './bin/www',
        ext: 'html ejs js',
        ignore: ['build/**/*.*', 'public/**/*.*'],
        tasks: [],
        env: env
    }).on('restart', function () {
        console.log('server restarted....');
    });
});

gulp.task('watch', function () {
    watch(['./public/javascripts/*.js', './public/javascripts/**/*.js'], function () {
        gulp.start('js');
    });

    watch('./public/less/*.less', function () {
        gulp.start('less');
    });

    watch(['./public/javascripts/*.html', './public/javascripts/**/*.html'], function () {
        gulp.start('partials');
    });
});

gulp.task('default', ['js-deps', 'partials', 'css-deps', 'js', 'less', 'watch', 'serve']);