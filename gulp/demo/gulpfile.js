//导入工具包 require('node_modules里对应模块')
const gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    babel = require('gulp-babel'),
    browserify = require("browserify");

gulp.task('browserify', function() {
    pump([
        gulp.src('./src/less/bootstrap.less'),
        less(),
        gulp.dest('./src/css')
    ]);
});

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function() {
    pump([
        gulp.src('./src/less/bootstrap.less'),
        less(),
        gulp.dest('./src/css')
    ]);
});


//ES6转换成ES5
gulp.task('es6-es5', function() {
    pump([
        gulp.src('./src/js/*.js'),
        babel(),
        gulp.dest('./src/js/ES5')
    ]);
});

//使用gulp - uglify压缩javascript文件
gulp.task('jsmin', function() {
    pump([
        gulp.src('./src/js/ES5/index.js'),
        uglify(), //压缩操作
        gulp.dest('./dist/js')
    ]);
});

gulp.task('default', ['testLess', 'es6-es5', 'jsmin']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

/*
gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
gulp.dest(path[, options]) 处理完后文件生成路径
*/