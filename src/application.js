import request from './request';
import response from './response';
import layer from './layer';
import Scroller from './scroller';

var scope = require('./scope');

export default class {
    constructor(){
        this.stacks = [];
        this.req = new request();
        this.res = new response();
        this.req.res = this.res;
        this.res.req = this.req;
        this.webviews = {};
        this.res.app = this.req.app = this;
        this.map = {};
        this.scope = scope();
        this.refreshCount = 0;
        this.isRefreshing = false;
    }

    next(i){
        if ( i === undefined ) i = 0;
        let power = this.stacks[i];
        if ( !power ) return;

        if ( power.match(this.req.path) ){
            this.req.param = power.param;

            let type = power.type;
            let next = () => {
                if ( type === 'use' ){
                    setTimeout(() => {
                        this.next(++i);
                    }, 0);
                }
            };

            if ( !this.map[this.req.path] ){
                if ( ['use', 'load', 'active'].indexOf(type) > -1 ){
                    power.handle.call(this.scope, this.req, this.res, next);
                    if ( type !== 'use' ) this.map[this.req.path] = true;
                    if ( type === 'load' ){
                        this.next(++i);
                    }
                }else{
                    this.next(++i);
                }
            }else{
                if ( ['use', 'active'].indexOf(type) > -1 ){
                    power.handle.call(this.scope, this.req, this.res, next);
                }else{
                    this.next(++i);
                }
            }
        }else{
            this.next(++i);
        }
    }

    onRefresh(i){
        if ( i === undefined ) i = 0;
        let power = this.stacks[i];
        if ( !power ) return;

        if ( power.match(this.req.path) ){
            this.req.param = power.param;

            let type = power.type;
            let next = () => {
                if ( type === 'use' ){
                    setTimeout(() => {
                        this.onRefresh(++i);
                    }, 0);
                }
            };

            if ( ['use', 'refresh'].indexOf(type) > -1 ){
                type != 'use' && this.refreshCount++;
                power.handle.call(this.scope, this.req, this.res, next);
            }else{
                this.onRefresh(++i);
            }
        }else{
            this.onRefresh(++i);
        }
    }

    render(url, replaceit){
        replaceit
            ? history.replaceState({url:url}, document.title, '#' + url)
            : history.pushState({url:url}, document.title, '#' + url);

        setTimeout(() => {
            this.req.init();
            this.next();
        }, 0);
    }

    use(expression, foo){
        return this.dist(expression, foo, 'use');
    }

    load(expression, foo){
        return this.dist(expression, foo, 'load');
    }

    active(expression, foo){
        return this.dist(expression, foo, 'active');
    }

    refresh(expression, foo){
        return this.dist(expression, foo, 'refresh');
    }

    dist(expression, foo, type){
        if ( typeof expression === 'function' ){
            foo = expression;
            expression = '/';
        }
        this.stacks.push(new layer(expression, foo, type));
        return this;
    }

    scroller(){
        let webviews = this.webviews;
        for ( let i in webviews ){
            let webview = webviews[i].wraproot;
            webviews[i].scroller = new Scroller(webview, this);
        }
    }

    listen(name){
        this.soyie.bootstrap(name, this.scope);
        this.req.init();
        this.next();
        history.replaceState({ url: this.req.href }, document.title, '#' + this.req.href);
        window.addEventListener('popstate', object => {
            if ( object && object.state ){
                var url = object.state.url;
                url && this.render(url, true);
            }
        }, false);
        this.scroller();
    }
}