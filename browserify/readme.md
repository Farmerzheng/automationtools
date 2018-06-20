# Browserify

[Browserify](http://browserify.org/)是一个供浏览器环境使用的模块打包工具，

像在node环境一样，也是通过`require(‘modules‘)`来组织模块之间的引用和依赖，

既可以引用npm中的模块，也可以引用自己写的模块，

然后打包成js文件，再在页面中通过`<script>`标签加载。

# 使用示例

## 1.新建项目文件demo

## 2. 创建项目文件

项目目录如下

# ![1529473236546](C:\Users\王争\AppData\Local\Temp\1529473236546.png)

module1.js： 

```
module.exports = 'It works from module.js'
```

 module2.js： 

```
module.exports = 'It works from module2.js.'
```

entry.js： 

```
var m = require('./module1.js');
var m2 = require('./module2.js');
console.log(m, m2);
```

index.html

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <script src='js/bundle.js'></script>
</body>

</html>
```

## 3. 初始化项目

> npm init

## 4.安装 browserify

> npm install --save-dev browserify

## 5.打包文件

> node_modules/.bin/browserify  src/js/entry.js > dist/js/bundle.js