/**
 Gulpfile for springboot-gulp-webpack
 created by haichen
 */

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    livereload = require('gulp-livereload'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    connect = require('gulp-connect');

var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
        os.platform() === 'darwin' ? 'Google chrome' : (
                os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/static/images/**/*']).pipe(gulp.dest('dist/static/images')).on('end', done);
});

//将字体拷贝到目标目录
gulp.task('copy:fonts', function (done) {
    gulp.src(['src/static/fonts/**/*']).pipe(gulp.dest('dist/static/fonts')).on('end', done);
});

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('lessmin', function (done) {
    gulp.src(['src/static/css/main.less', 'src/static/css/*.css'])
        .pipe(less())
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/static/css/'))
        .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/static/js/*.js')
        .pipe(md5(10, 'dist/templates/*.html'))
        .pipe(gulp.dest('dist/static/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/static/css/*.css')
        .pipe(md5(10, 'dist/templates/*.html'))
        .pipe(gulp.dest('dist/static/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/templates/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/templates'))
        .on('end', done);
    // .pipe(connect.reload())
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'lessmin'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/static/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/static/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../static/images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/static/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

// gulp.task('watch', function (done) {
//     gulp.watch('src/**/*', ['lessmin', 'build-js', 'fileinclude'])
//         .on('end', done);
// });
//haichen重写该watch task
gulp.task('watch', function () {

    //看守所有样式文档
    gulp.watch('src/static/css/*', ['sprite']);

    //看守所有.js档  haichen注：此处还有问题不可打开
    // gulp.watch('src/static/js/**', ['build-js']);

    // 看守所有图片档
    gulp.watch('src/static/images/**/*', ['copy:images']);

    //看守html
    gulp.watch('src/templates/**/*', ['fileinclude']);

    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);

});


gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            templates: browser,
            uri: 'http://localhost:3000/templates'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function (callback) {
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'copy:fonts', 'md5:css', 'md5:js', 'open']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'copy:fonts', 'fileinclude', 'lessmin', 'build-js', 'watch', 'open']);