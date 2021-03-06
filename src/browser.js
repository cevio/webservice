var EventEmitter = require('events').EventEmitter;
var browser = module.exports = function(){
    this.views = {};
    this.data = { global: {}, header: {
        leftHTML: '',
        rightHTML: '',
        title: '',
        leftClick: function(){},
        rightClick: function(){},
        hide: true,
        page: ''
    } };
    this.current = null;
    this.target = null;
    this.animate = null;
    Object.defineProperty(this, 'scope', {
        set: function(val){ this.data.global = val; },
        get: function(){ return this.data.global; }
    });
    Object.defineProperty(this, 'headbar', {
        set: function(val){ this.data.header = val; },
        get: function(){ return this.data.header; }
    });
    Object.defineProperty(this, 'engine', {
        get: function(){ return this.animate; },
        set: function(engine){ this.animate = engine; }
    });
};

browser.prototype = EventEmitter.prototype;
browser.prototype.dispatch = function(current, target){
    this.current = current;
    this.target = target;
};
browser.prototype.exchange = function(){
    this.current = this.target;
    this.target = null;
    this.http.history = null;
};