/**
 * Created by evio on 15/9/14.
 */
require('./test.html');

var soyie = require('soyie');
var webview = require('../src/index');
var app = webview(soyie);

app.on('redirected', function(){
    console.log(1)
})

app.browser.engine = require('webservice-animate')(16,17);

//app.use(function(req,res, next){
//    req.$head.hide = true;
//    next();
//});

app.load(function(req,res){
    req.$data.home = {
        list: [
            {
                icon: 'fa-windows',
                text: 'microsoft company use angent',
                href: '/'
            },
            {
                icon: 'fa-github',
                text: 'github responsives',
                href: '/'
            },
            {
                icon: 'fa-connectdevelop',
                text: 'connectdevelop use packages',
                href: '/'
            },
            {
                icon: 'fa-chrome',
                text: 'download chrome software',
                href: '/'
            },
            {
                icon: 'fa-forumbee',
                text: 'bee building last manager',
                href: '/about'
            }
        ]
    }
});

app.active(function(req, res){
    req.$head.title = 'Webservice';
    req.$head.leftHTML = '';
    req.$head.rightHTML = '<i class="fa fa-navicon"></i>';
    req.$head.leftClick = function(){};

    res.render('home');
});

app.active('/about', function(req, res){
    req.$head.title = 'About webservice';
    req.$head.leftHTML = '<i class="fa fa-angle-left"></i>';
    req.$head.rightHTML = '';
    req.$head.leftClick = function(){
        history.go(-1);
    };
    res.render('about');
});

soyie.ready(function(){app.listen('envirs-cms')});