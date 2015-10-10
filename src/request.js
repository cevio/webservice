import * as querystring from 'soyie-querystring';
import cookie from './cookie';

export default class {
    constructor(){
        this.query = {};
        this.path = '/';
    }
    init(){
        this.href = (window.location.hash || '').replace(/^#/, '') || '/';
        let index = this.href.indexOf('?');
        let query, path;
        if ( index > -1 ){
            path = this.href.substring(0, index);
            query = this.href.substring(index + 1);
        }else{
            path = this.href;
            query = '';
        }

        this.path = path || '/';
        if ( query.length ){
            this.query = querystring.format(query);
        }else{
            this.query = {};
        }
    }
    store(name){
        let value = window.localStorage.getItem(name);
        if ( !value || value === 'undefined' || value === 'null' ){
            value = {};
        }else{
            value = JSON.parse(value);
        }
        return value;
    }
    cookie(name){
        return cookie.get(name);
    }
    getScroller(name){
        let object = this.app.webviews[name];
        if ( object ){
            return object.scroller.object;
        }
    }
}