var EventEmitter = require('events').EventEmitter;
var browser = module.exports = function(){
    this.views = {};
    this.data = { global: {} };
    this.current = null;
    this.target = null;
    this.animate = null;
    Object.defineProperty(this, 'scope', {
        set: function(val){ this.data.global = val; },
        get: function(){ return this.data.global; }
    });
    Object.defineProperty(this, 'engine', {
        get: function(){ return this.animate; },
        set: function(engine){
            this.animate = engine;
            this.animate(this);
        }
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