var http = require('soyie-http-router');
var component = require('./component');
var browsers = require('./browser');
var render = require('./render');

var webview = module.exports = function(soyie){
    var browser = new browsers();
    var app = http.createServer();
    browser.http = app;
    app.namespace = 'webservice';
    app.defineFreeze('browser', browser);
    Object.defineProperty(app.request, '$data', webview.defineParse(app));
    webview.listen(soyie, app);
    render(app, browser);
    soyie.component('webview', component(browser));
    return app;
};

webview.listen = function(soyie, app){
    var listenner = app.listen.bind(app);
    app.listen = function(name){
        soyie.bootstrap(name, app.browser.data);
        setTimeout(listenner, 0);
    }
};

webview.defineParse = function(app){
    return {
        set: function(){ throw new Error('you can not set req.$data'); },
        get: function(){ return  app.browser.scope; }
    }
};