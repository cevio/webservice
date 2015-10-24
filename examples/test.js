/**
 * Created by evio on 15/9/14.
 */
require('./test.html');
require('./css/common.css');

var soyie = require('soyie');
var webview = require('../src/index');
var app = webview(soyie);

app.browser.on('goahead', function(){
    console.log('goahead', app.browser);
});

app.browser.on('retreat', function(){
    console.log('retreat', app.browser);
});

app.browser.on('quiescence', function(){
    console.log('quiescence', app.browser);
});

app.browser.scope = {
    a:1
};

app.load(function(req, res){
    req.$data.home = {
        list: [1,2,3],
        a: 111
    };
});

app.active(function(req, res){
    res.render('list');
    setTimeout(function(){
        req.$data.home.a = 222;
        req.$data.home.list = [7,8,2,4,5,6];
        console.log(req.cookie)
    }, 1000);
});

soyie.ready(function(){app.listen('envirs-cms')});