import * as utils from './utils';
import animationEnd from 'animationend';
import cookie from './cookie';

export default class {
    constructor(){
        this.current = null;
        Object.defineProperty(this, 'refresh', {
            set: function(val){
                let refresher = document.getElementById('webview-refresh');
                let dist = document.querySelector('.webview-active section');
                if ( val ){
                    if ( !refresher ){
                        refresher = document.createElement('div');
                        refresher.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 正在刷新数据,请稍后!';
                        refresher.id = 'webview-refresh';
                    }
                    dist.insertBefore(refresher, dist.firstChild);
                }else{
                    if ( refresher ){
                        refresher.innerHTML = '数据更新完毕!';
                        setTimeout(() => {
                            refresher.parentNode.removeChild(refresher);
                        }, 500);
                    }
                }
            }
        });
        Object.defineProperty(this, 'title', {
            set: function(val){ this.setTitle(val);},
            get: function(){ return document.title; }
        })
    }
    go(webview){
        let target = webview.wraproot;
        let source = this.current ? this.current.wraproot : null;
        target && target.setAttribute('class', 'webview animated bounceInRight webview-active');
        source && source.setAttribute('class', 'webview animated bounceOutLeft webview-unactive');
        this.current = webview;
        animationEnd(target, function(){
            Array.prototype.slice.call(document.querySelectorAll('.webview:not(.webview-active)'), 0)
                .forEach(function(element){
                    element.setAttribute('class', 'webview');
                });
            setTimeout(()=>{
                let ob = document.querySelector('.webview-active').iScroll;
                ob.refresh();
            }, 100)
        });
    }
    back(webview){
        let target = webview.wraproot;
        let source = this.current ? this.current.wraproot : null;
        target && target.setAttribute('class', 'webview animated bounceInLeft webview-active');
        source && source.setAttribute('class', 'webview animated bounceOutRight webview-unactive');
        this.current = webview;
        animationEnd(target, function(){
            var unActives = Array.prototype.slice.call(document.querySelectorAll('.webview:not(.webview-active)'), 0);
            unActives.forEach(function(element){
                element.setAttribute('class', 'webview');
            });
            setTimeout(()=>{
                let ob = document.querySelector('.webview-active').iScroll;
                ob.refresh();
            }, 100)
        });
    }
    store(name, value){
        window.localStorage.setItem(name, JSON.stringify(value));
    }
    cookie(...args){
        cookie.set.apply(cookie, args);
    }
    setTitle(title){
        var $body = document.body;
        document.title = title;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = document.createElement('iframe');
        $iframe.src = '/favicon.ico';
        $iframe.onload = function(){
            setTimeout(function() {
                $iframe.parentNode.removeChild($iframe);
            }, 0);
        };
        $body.appendChild($iframe);
    }
    render(name){
        if ( /^\//.test(name) ){
            this.app.render(name);
        }else{
            let app = this.app;
            let webview = app.webviews[name];
            if ( webview == this.current ) return;
            if ( webview ){
                if ( this.current === null ){
                    this.go(webview);
                }else{
                    if ( webview.zoom < this.current.zoom ){
                        this.back(webview);
                    }else{
                        this.go(webview);
                    }
                }
            }
        }
    }
}