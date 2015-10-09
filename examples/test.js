/**
 * Created by evio on 15/9/14.
 */
require('./test.html');
require('./css/common.css');

var soyie = require('soyie');
var webview = require('../src/index');
var app = webview(soyie);

app.scope.home = {};
app.scope.list = {};
app.scope.shop = {};

app.use(function(req, res, next){
    this.home.a = 123;
    next();
});

app.use('/list', function(req, res, next){
    this.list.b = 456;
    next();
});

app.use('/shop', function(req, res, next){
    this.shop.c = 3333;
    next();
});

app.load(function(req, res){
    console.log('load');
});

app.active(function(req, res){
    console.log('active');
    res.title = '测试标题2';
    res.render('home');
});

app.active('/list', function(req, res){
    res.render('list');
});
app.active('/shop', function(req, res){
    res.render('shop');
});

app.refresh(function(req, res){
    console.log('refresh it');
    setTimeout(()=>{
        res.refresh = false;
    }, 2000);
});

soyie.ready(() => {
    soyie.bootstrap('envirs-cms', app.scope);
    app.listen();
});