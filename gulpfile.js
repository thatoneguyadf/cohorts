var gulp = require('gulp'),
    nodemon = require('nodemon'),
    envfile = require('envfile'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    gulpif = require('gulp-if');

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
        ext: 'html js ejs',
        ignore: ['./build/**/*.*', './public/**/*.*'],
        tasks: [],
        env: env

    }).on('restart', function () {

        console.log('server restarted...');

    });

});

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

        .pipe(gulp.dest('./build/js'));

});

gulp.task('css-deps', function () {

    gulp.src([

        './public/bower_components/bootstrap/dist/css/bootstrap.min.css',
        './public/bower_components/font-awesome/css/font-awesome.min.css'

    ])
        .pipe(concat('css-deps.css'))
        .pipe(gulp.dest('./build/css'));

    gulp.src('./public/bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/fonts'));

});

gulp.task('partials', function () {

    gulp.src('./public/javascripts/**/*.html')
        .pipe(gulp.dest('./build/partials'));

});

gulp.task('js', function () {
    var baseDir = __dirname + '/public/javascripts',
        outputDir = __dirname + '/build/js',
        outputFilename = 'app.js',
        env = envfile.parseFileSync('.env');

    gulp.src([

        baseDir + '/*module.js',
        baseDir + '/**/*module.js',
        baseDir + '/**/*.js'

    ])

        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(gulpif(env.PRODUCTION === 'true', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir))
        .pipe(notify({

            title: 'ngAnnotate',
            subtitle: 'Angular Compiled!',
            message: 'Angular Compiled!'

        }));
});

gulp.task('watch', function () {

    gulp.watch([
        './public/javascripts/*.js',
        './public/javascripts/**/*.js'
    ], ['js']);
    gulp.watch(['./public/less/*.less'], ['less']);
    gulp.watch(['./public/javascripts/**/*.html'], ['partials']);

});

gulp.task('default', ['js-deps', 'partials', 'css-deps', 'js', 'less', 'watch', 'serve']);