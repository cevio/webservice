/**
 * Created by evio on 15/9/14.
 */
require('./test.html');

var soyie = require('soyie');
var webview = require('../src/index');
var app = webview(soyie);

app.browser.engine = require('webservice-animate')(0,1);

//app.use(function(req,res, next){
//    req.$head.hide = true;
//    next();
//});

app.load(function(req,res){
    req.$data.home = {
        name: 'evio'
    }
});

app.active(function(req, res){
    req.$head.title = 'Home';
    req.$head.leftHTML = '';

    res.render('home');
});

app.load('/shop/:id', function(req, res){
    var j = 30, a = [];
    for ( var i = 0 ; i < j ; i++ ){
        a.push(i + 1);
    }
    req.$data.shop = {
        list: a
    }
});

app.active('/shop/:id', function(req, res){
    req.$head.title = 'shop';
    req.$head.leftHTML = '&lt;';
    res.render('shop');
});

soyie.ready(function(){app.listen('envirs-cms')});