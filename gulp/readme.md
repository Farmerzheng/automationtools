## 简介

gulp 是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

gulp 是基于 Nodejs 的 Nodejs 的自动任务运行器， 她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了 Unix 操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用 Gulp 来改变开发流程，从而使开发更加快速高效。

gulp 和 grunt 非常类似，但相比于 grunt 的频繁 IO 操作，gulp 的流操作，能更快地更便捷地完成构建工作。

## gulp-less 插件

### 1、安装 nodejs

1.1、说明：gulp 是基于 nodejs，理所当然需要安装 nodejs；

1.2、安装：打开[nodejs 官网](http://nodejs.org/)，点击硕大的绿色 Download 按钮，它会根据系统信息选择对应版本（.msi 文件）。然后像安装 QQ 一样安装它就可以了（安装路径随意）。

### 2、使用命令行

2.1、说明：什么是命令行？命令行在 OSX 是终端（Terminal），在 windows 是命令提示符（Command Prompt）；

2.2、注：之后操作都是在 windows 系统下；

2.3、gulp 在使用过程中常用命令

**node -v**查看安装的 nodejs 版本，出现版本号，说明刚刚已正确安装 nodejs。

**npm -v**查看 npm 的版本号，npm 是在安装 nodejs 时一同安装的 nodejs 包管理器

**cd**定位到目录，用法：cd + 路径 ；

**dir**列出文件列表；

**cls**清空命令提示符窗口内容。

![img](http://static.ydcss.com/uploads/2015/03/gulp-01.png)

### 3、npm 介绍

3.1、说明：npm（node package manager）nodejs 的包管理器，用于 node 插件管理（包括安装、卸载、管理依赖等）；

3.2、使用 npm 安装插件：命令提示符执行**npm install <name> [-g][--save-dev]**；

3.2.1、**<name>**：node 插件名称。例：**npm install gulp-less --save-dev**

3.2.2、**-g**：全局安装。将会安装在`C:\Users\Administrator\AppData\Roaming\npm`，并且写入系统环境变量； 非全局安装：将会安装在当前定位目录； 全局安装可以通过命令行在任何地方调用它，本地安装将安装在定位目录的 node_modules 文件夹下

3.2.3、**--save**：将保存配置信息至 package.json（package.json 是[nodejs 项目配置文件](http://www.ydcss.com/archives/18#lesson6)）；

3.2.4、**-dev**：保存至 package.json 的 devDependencies 节点，不指定-dev 将保存至 dependencies 节点；一般保存在 dependencies 的像模块像这些 express/ejs/body-parser 等等。

3.2.5、为什么要保存至 package.json？因为 node 插件包相对来说非常庞大，所以不加入版本管理，将配置信息写入 package.json 并将其加入版本管理，其他开发者对应下载即可（命令提示符执行**npm install**，则会根据 package.json 下载所有需要的包，`**npm install --production**`只下载 dependencies 节点的包）。

3.3、使用 npm 卸载插件：**npm uninstall <name> [-g][--save-dev]** PS：不要直接删除本地插件包

3.3.1、删除全部插件：**npm uninstall gulp-less gulp-uglify gulp-concat ……**???太麻烦

3.3.2、借助 rimraf：**npm install rimraf -g** 用法：**rimraf node_modules**

3.4、使用 npm 更新插件：**npm update <name> [-g][--save-dev]**

3.4.1、更新全部插件：**npm update [--save-dev]**

3.5、查看 npm 帮助：**npm help**

3.6、当前目录已安装插件：**npm list**

PS：npm 安装插件过程：从http://registry.npmjs.org下载对应的插件包（该网站服务器位于国外，所以经常下载缓慢或出现异常），解决办法往下看↓↓↓↓↓↓。

### 4、选装 cnpm

4.1、说明：因为 npm 安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果 npm 的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。32 个赞！来自官网：**“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10 分钟 一次以保证尽量与官方服务同步。”**；

4.2、官方网址：[http://npm.taobao.org](http://npm.taobao.org/)；

4.3、安装：命令提示符执行**npm install cnpm -g --registry=https://registry.npm.taobao.org**； 注意：安装完后最好查看其版本号**cnpm -v**或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；

注：cnpm 跟 npm 用法完全一致，只是在执行命令时将 npm 改为 cnpm（以下操作将以 cnpm 代替 npm）。

### 5、安装 gulp

5.1、安装：命令提示符执行**cnpm install gulp --save-dev**；

5.2、查看是否正确安装：命令提示符执行**gulp -v**，出现版本号即为正确安装。

### 6、新建 package.json 文件

6.1、说明：package.json 是基于 nodejs 项目必不可少的配置文件，它是存放在项目根目录的普通 json 文件；

6.2、它是这样一个 json 文件**（注意：json 文件内是不能写注释的，复制下列内容请删除注释）**：

```
{
  "name": "test",   //项目名称（必须）
  "version": "1.0.0",   //项目版本（必须）
  "description": "This is for study gulp project !",   //项目描述（必须）
  "homepage": "",   //项目主页
  "repository": {    //项目资源库
    "type": "git",
    "url": "https://git.oschina.net/xxxx"
  },
  "author": {    //项目作者信息
    "name": "surging",
    "email": "surging2@qq.com"
  },
  "license": "ISC",    //项目许可协议
  "devDependencies": {    //项目依赖的插件
    "gulp": "^3.8.11",
    "gulp-less": "^3.0.0"
  }
}
```

6.3、当然我们可以手动新建这个配置文件，但是作为一名有志青年，我们应该使用更为效率的方法：命令提示符执行**cnpm init**

![img](http://static.ydcss.com/uploads/2015/03/gulp-3.png)

6.4、查看 package.json 帮助文档，命令提示符执行**cnpm help package.json**

特别注意：package.json 是一个普通 json 文件，所以不能添加任何注释

### 7、本地安装 gulp-less 插件

7.1、本示例以 gulp-less 为例（编译 less 文件），

 命令提示符执行

> cnpm install gulp-less --save-dev
>
> cnpm install pump --save-dev



### 8、安装pump插件

> npm install pump --save-dev 

pump是一个小节点模块，将流连接在一起，如果其中一个关闭，则会将它们全部破坏。说白了就是pump可以使我们更容易找到代码出错位置.

### 9、新建 gulpfile.js 文件（重要）

8.1、说明：gulpfile.js 是 gulp 项目的配置文件，是位于项目根目录的普通 js 文件（其实将 gulpfile.js 放入其他文件夹下亦可）。

8.2、它大概是这样一个 js 文件（更多插件配置请[查看这里](http://www.ydcss.com/archives/tag/gulp)）：

```
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function() {
    pump([
        gulp.src('./src/less/bootstrap.less'),
        less(), //压缩操作
        gulp.dest('./src/css')
    ]);
});

gulp.task('default', ['testLess', 'jsmin']); //定义默认任务jsmin为其他任务

/*
gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
gulp.dest(path[, options]) 处理完后文件生成路径
*/
```

### 10、运行 gulp

9.1、编译 less：命令提示符执行**gulp testLess**；

9.2、当执行**gulp default**或**gulp**将会调用 default 任务里的所有任务[‘testLess’,’elseTask’]。

### 11、总结

11.1、安装 nodejs；

11.2、新建 package.json 文件；

11.3、本地安装 gulp、gulp-less；

11.4、新建 gulpfile.js 文件；

11.5、通过命令提示符运行 gulp 任务。

## 压缩js

使用 gulp-uglify 压缩 javascript 文件，减小文件大小。



### 1、本地安装 gulp-uglify

> cnpm install gulp-uglify --save-dev

### 2、配置 gulpfile.js

```
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function() {
    pump([
        gulp.src('./src/less/bootstrap.less'),
        less(), //压缩操作
        gulp.dest('./src/css')
    ]);
});

//使用gulp - uglify压缩javascript文件
gulp.task('jsmin', function() {
    pump([
        gulp.src('./src/js/*.js'),
        uglify(), //压缩操作
        gulp.dest('./dist/js')
    ]);
});

gulp.task('default', ['testLess', 'jsmin']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

/*
gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
gulp.dest(path[, options]) 处理完后文件生成路径
*/
```



### 3、执行任务

>  node_modules/.bin/gulp



##  ES6转ES5 

### 1、安装插件

> cnpm install gulp-babel babel-preset-env babel-core --save-dev

### 2、配置文件（gulpfile.js、.babelrc）

在项目根目录下创建  gulpfile.js  和 .babelrc  文件

```
/*gulpfile.js*/

const gulp = require('gulp'), 
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    babel = require('gulp-babel');

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
        gulp.src('./src/js/index.js'),
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

gulp.task('default', ['testLess', 'es6-es5', 'jsmin']); 
```

```
/*.babelrc*/
{
    "presets": [
        "es2015"
    ]
}
```

## browserify (模块依赖)

1. 安装browserify

   > cnpm install browserify --save-dev

2. 配置gulpfile.js

   ```
   
   ```

   







