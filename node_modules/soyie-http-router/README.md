# webservice #
soyie webservice

# Install #

``` javascript
npm install --save webservicer
```
# How to use #

use this template to install webservice

``` javascript
var soyie = require('soyie');
var webview = require('webservicer');
var app = webview(soyie);

/**
 * local code here.
 * use app to render webview
 */
app.use(function(req, res, next){
	this.home.a = 123;
	next();
});

app.load(function(req, res){
    res.cookie('a', req.cookie('a') + 'test');
});

app.active(function(req, res){
    res.title = 'new page';
    res.render('home');
});

app.refresh(function(req, res){
    res.fetch('https://www.u51.com/51rp/rpd-advert/news.htm', {
        page_no:1,
        page_size: 6
    },function(data){
        res.store('user', data);
        res.refresh = false;
    });
});

/**
 * when dom ready
 * you can setup soyie by bootstrap method
 * then you can listen app
 */
soyie.ready(() => {
    soyie.bootstrap('envirs-cms', app.scope);
    app.listen();
});
```

# Middleware #

`app.use` make middleware.

  * `req` request.
  * `res` response.
  * `next` next router
  
# Page status #

make status on app.

## app.load ##

when webview is loaded, emmit it. And then route next.

## app.active ##

when webview is actived, emit it.

## app.refresh ##

when use touch refresh, emit it.