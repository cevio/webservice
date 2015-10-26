# webservice

webservice 是一套单页面级的路由框架，包含了`soyie` `soyie-http-router`等框架或组件，能够实现复杂路由功能，类似于nodejs的`express`框架。它的优点在于我们可以处理复杂逻辑的页面路由，通过自定义路由回调，轻松实现页面逻辑。

# install

> nap install --save webservicer

# usage

``` javascript
var soyie = require('soyie');
var webservice = require('webservicer');
var app = webview(soyie);
app.active(function(req, res){
	res.render('home');
});
soyie.ready(function(){
	app.listen('envirs-cms');
});
```

# app

app 是一个webservice初始化的实例对象，可以认为是一个HTTP服务引擎。

## app api

