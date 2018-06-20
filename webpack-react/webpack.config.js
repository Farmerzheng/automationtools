module.exports={
	entry:"./entry.js",//项目的入口文件
    output:{
    	path:__dirname,//输出的文件与此文件在同一目录下
    	filename:"bundle.js"//输出文件的名字

    },
    devtool:"source-map", 
    module:{//依赖的模块
    	loaders:[
    	   {test:/\.js$/,exclude:/node_modules/,loader:"react-hot!babel"},
           {test:/\.css$/,loader:"style!css"}
    	]
    }
}