/**
 * Created by evio on 15/9/14.
 */
require('./test.html');
require('./css/common.css');

var soyie = require('soyie');
var webview = require('../src/index');
var app = webview(soyie);

app.use(function(req, res, next){
    if ( !this.tree ){
        this.tree = [
            {
                title: '测试数据一',
                icon: 'fa-windows',
                menus: [
                    { name: '测试页面一', href: '/test1' },
                    { name: '测试页面二', href: '/test2' }
                ]
            }
        ];
    }
    next();
});

app.use('/test1', function(req, res, next){
    if ( !this.test1 ){
        this.test1 = {
            a: 'test',
            b: function(){
                console.log('b');
            }
        }
    }
    next();
});

app.active('/test1', function(req, res){
    console.log(req.getScroller('test1'));
    console.log(req.$data);
    this.nav.title = 'Soyie WebService Test 1';
    this.nav.leftHtml = '<i class="fa fa-angle-left"></i>';
    this.nav.rightHtml = '';
    this.nav.onLeftPress = () => res.render('/');
    res.title = this.nav.title;
    res.render('test1');
});

app.refresh('/test1', function(req, res){
    console.log('refresh');
    setTimeout(function(){
        res.endFresh();
    }, 3000);
});

app.active(function(req, res){
    this.nav.title = 'Soyie WebService Guide';
    this.nav.leftHtml = '<i class="fa fa-reorder"></i>';
    this.nav.rightHtml = '<i class="fa fa-cogs"></i>';
    this.nav.onLeftPress = function(){};
    res.title = this.nav.title;
    res.render('home');
});

soyie.ready(() => {
    app.listen('envirs-cms');
});