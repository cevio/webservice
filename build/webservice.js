!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.webService=t():e.webService=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(6),i=n(2),s=n(1),o=n(3),u=n(4),a=e.exports=function(e){var t=new s,n=r.createServer();return t.http=n,n.namespace="webservice",n.defineFreeze("browser",t),Object.defineProperty(n.request,"$data",a.defineParse(n)),a.listen(e,n),o(n,t),e.component("webview",i(t)),e.directive("so-href",u(e,n)),n};a.listen=function(e,t){var n=t.listen.bind(t);t.listen=function(r){e.bootstrap(r,t.browser.data),setTimeout(function(){t.browser.animate&&t.browser.animate(t.browser),n()},0)}},a.defineParse=function(e){return{set:function(){throw new Error("you can not set req.$data")},get:function(){return e.browser.scope}}}},function(e,t,n){"use strict";var r=n(5).EventEmitter,i=e.exports=function(){this.views={},this.data={global:{}},this.current=null,this.target=null,this.animate=null,Object.defineProperty(this,"scope",{set:function(e){this.data.global=e},get:function(){return this.data.global}}),Object.defineProperty(this,"engine",{get:function(){return this.animate},set:function(e){this.animate=e}})};i.prototype=r.prototype,i.prototype.dispatch=function(e,t){this.current=e,this.target=t},i.prototype.exchange=function(){this.current=this.target,this.target=null,this.http.history=null}},function(e,t){"use strict";function n(e){return this.wrapname=this.virtualDom.getAttribute("name"),'<div class="webview hide"><section>'+e+"</section></div>"}function r(e){return function(){for(var t=0;t<this.element.childNodes.length;t++)if(1===this.element.childNodes[t].nodeType){this.wraproot=this.element.childNodes[t];break}e.views[this.wrapname]=this}}e.exports=function(e){return{props:["data"],events:{wrapTemplate:n,init:r(e)}}}},function(e,t){"use strict";function n(e,t){return function(r){var i=t.views[r];if(!i)return t.emit("renderError",new Error("template of "+r+" is not exist"));var s=t.current;t.dispatch(s,i),t.engine?t.emit(e.history,t,e):n.engine(t,e)}}e.exports=function(e,t){e.response.defineFreeze("render",n(e,t))},n.engine=function(e,t){var n=e.current,r=e.target;n&&n.wraproot.setAttribute("class","webview hide"),r&&r.wraproot.setAttribute("class","webview"),e.emit(t.history,e),e.exchange()}},function(e,t){"use strict";e.exports=function(e,t){function n(e){this.value!==e&&(this.value=e)}function r(e){return function(){t.response.redirect(e.value)}}return function(t,i,s){var o=e.util.formatExpression(t.nodeValue),u=new e.nodeStructor(i,o);return u.parent=s,u.set=n,i.addEventListener("click",r(u),!1),i.removeAttribute("so-href"),u}}},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function i(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,i,u,a,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],o(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(i=arguments.length,u=new Array(i-1),a=1;i>a;a++)u[a-1]=arguments[a];n.apply(this,u)}else if(s(n)){for(i=arguments.length,u=new Array(i-1),a=1;i>a;a++)u[a-1]=arguments[a];for(c=n.slice(),i=c.length,a=0;i>a;a++)c[a].apply(this,u)}return!0},n.prototype.addListener=function(e,t){var i;if(!r(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned){var i;i=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,i,o,u;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(u=o;u-->0;)if(n[u]===t||n[u].listener&&n[u].listener===t){i=u;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?r(e._events[t])?1:e._events[t].length:0}},function(e,t,n){!function(t,n){e.exports=n()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e,t,n,r){return this.stacks.push(new c(e,t,n,r)),this}function i(e){function t(a){if(a&&"route"===a)return e();var c=u[n++];if(!c)return e(a);var h=c.match(s);if(h)if(r.params=c.params,"use"===c.method)a?c.handle_error(a,r,i,t):c.handle_request(r,i,t);else if(o===c.method)"load"===o?(o="active",a?c.handle_error(a,r,i,t):(c.handle_request(r,i),t())):a?c.handle_error(a,r,i,t):(c.handle_request(r,i),t("route"));else{if("active"===c.method&&"load"===o){var f=e;e=function(){a?c.handle_error(a,r,i,t):c.handle_request(r,i),f()}}t(a)}else t(a)}var n=0,r=this.request,i=this.response,s=r.path,o=r.method,u=this.stacks;return e||(e=function(){}),0===u.length?e():void t()}function s(){var e=this,t=this.namespace+"-history",n=this.request.session[t]||"[]",r=this.request.href;n=JSON.parse(n),this.history="goahead",history.replaceState({url:r},document.title,"#"+r),-1===n.indexOf(r)&&(n.push(r),this.response.session.set(t,n)),this.match(function(){e.emit("ready",e.request,e.response),o(e.response)})}function o(e){window.addEventListener("popstate",function(t){t.state&&e.redirect(t.state.url)},!1)}var u=n(5),a=n(6),c=n(4),h=n(1),f=n(8).EventEmitter,l=e.exports=function(){this.request=new u,this.response=new a,this.namespace="http",h.defineFreeze(this.request,"http",this),h.defineFreeze(this.response,"http",this),h.defineFreeze(this,"define",function(e,t){h.define(this,e,t)}),h.defineFreeze(this,"defineFreeze",function(e,t){h.defineFreeze(this,e,t)}),this.handle()};l.prototype=f.prototype,l.prototype.handle=function(){this.caseSensitive=!1,this.defineFreeze("stacks",[]),this.defineFreeze("push",r),this.defineFreeze("match",i),this.define("listen",s),this.defineFreeze("looser",{sensitive:this.caseSensitive,strict:!1,end:!1}),this.defineFreeze("strict",{sensitive:this.caseSensitive,strict:!0,end:!0})},l.prototype.use=function(e,t){return"function"==typeof e&&(t=e,e="/"),this.push("use",e,this.looser,t)},l.prototype.load=function(e,t){return"function"==typeof e&&(t=e,e="/"),this.push("load",e,this.strict,t)},l.prototype.active=function(e,t){return"function"==typeof e&&(t=e,e="/"),this.push("active",e,this.strict,t)},l.request=u,l.response=a,l.createServer=function(e){var t=new l;return"function"==typeof e&&e(t.request,t.response),t}},function(e,t){"use strict";t.define=function(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})},t.defineFreeze=function(e,t,n){Object.defineProperty(e,t,{value:n,enumerable:!1,writable:!1,configurable:!1})}},function(e,t,n){var r,i;!function(s){r=s,i="function"==typeof r?r.call(t,n,t,e):r,!(void 0!==i&&(e.exports=i))}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function t(n){function r(t,i,s){var o;if(arguments.length>1){if(s=e({path:"/"},r.defaults,s),"number"==typeof s.expires){var u=new Date;u.setMilliseconds(u.getMilliseconds()+864e5*s.expires),s.expires=u}try{o=JSON.stringify(i),/^[\{\[]/.test(o)&&(i=o)}catch(a){}return i=encodeURIComponent(String(i)),i=i.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",i,s.expires&&"; expires="+s.expires.toUTCString(),s.path&&"; path="+s.path,s.domain&&"; domain="+s.domain,s.secure?"; secure":""].join("")}t||(o={});for(var c=document.cookie?document.cookie.split("; "):[],h=/(%[0-9A-Z]{2})+/g,f=0;f<c.length;f++){var l=c[f].split("="),p=l[0].replace(h,decodeURIComponent),v=l.slice(1).join("=");'"'===v.charAt(0)&&(v=v.slice(1,-1));try{if(v=n&&n(v,p)||v.replace(h,decodeURIComponent),this.json)try{v=JSON.parse(v)}catch(a){}if(t===p){o=v;break}t||(o[p]=v)}catch(a){}}return o}return r.get=r.set=r,r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(t,n){r(t,"",e(n,{expires:-1}))},r.withConverter=t,r}return t()})},function(e,t,n){var r=n(12);t.format=function(e,t){if(e&&e.length){var n={};return e.split("&").forEach(function(e){var i,s,o=e.indexOf("=");o>-1?(i=e.substring(0,o),s=e.substring(o+1)):(i=e,s=""),t&&(s=decodeURIComponent(s)),void 0!==n[i]?r.type(n[i],"Array")?-1===n[i].indexOf(s)&&n[i].push(s):n[i]!==s&&(n[i]=[n[i]],n[i].push(s)):n[i]=s}),n}return{}},t.toString=function(e,t){var n=[];for(var r in e)n.push(r+"="+(t?encodeURIComponent(e[r]):e[r]));return n.join("&")}},function(e,t,n){"use strict";function r(e,t,n,i){if(!(this instanceof r))return new r(t,n,i);var o=n||{};this.handle=i,this.name=i.name||"<anonymous>",this.params=void 0,this.path=void 0,this.method=e,this.regexp=s(t,this.keys=[],o),"/"===t&&o.end===!1&&(this.regexp.fast_slash=!0)}function i(e){if("string"!=typeof e||0===e.length)return e;try{return decodeURIComponent(e)}catch(t){throw t instanceof URIError&&(t.message="Failed to decode param '"+e+"'",t.status=t.statusCode=400),t}}var s=n(10),o=Object.prototype.hasOwnProperty;e.exports=r,r.prototype.handle_error=function(e,t,n,r){var i=this.handle;if(4!==i.length)return r(e);try{i(e,t,n,r)}catch(s){r(s)}},r.prototype.handle_request=function(e,t,n){var r=this.handle;if(r.length>3)return n();try{r(e,t,n)}catch(i){n(i)}},r.prototype.match=function(e){if(null==e)return this.params=void 0,this.path=void 0,!1;if(this.regexp.fast_slash)return this.params={},this.path="",!0;var t=this.regexp.exec(e);if(!t)return this.params=void 0,this.path=void 0,!1;this.params={},this.path=t[0];for(var n=this.keys,r=this.params,s=1;s<t.length;s++){var u=n[s-1],a=u.name,c=i(t[s]);void 0===c&&o.call(r,a)||(r[a]=c)}return!0}},function(e,t,n){"use strict";function r(e){var t=window[e+"Storage"],n={};if(t)for(var r in t)n[r]=t.getItem(r);return n}var i=n(3),s=n(1),o=n(2),u=e.exports=function(){this.href=null,this.query=null,this.params=null,this.path=null,this.search=null,this.method=null,this.referer=null,s.defineFreeze(this,"define",function(e,t){s.define(this,e,t)}),s.defineFreeze(this,"defineFreeze",function(e,t){s.defineFreeze(this,e,t)}),this.defineFreeze("paths",[]),this.init(),this.store=r("local"),this.session=r("session"),this.cookie=o.get()||{}};u.prototype.init=function(){this.href=(window.location.hash||"").replace(/^#/,"")||"/";var e=this.href.indexOf("?");e>-1?(this.path=this.href.substring(0,e),this.search=this.href.substring(e+1)):(this.path=this.href,this.search=""),this.path=this.path||"/",this.search.length?this.query=i.format(this.search):this.query={},this.method="active",-1==this.paths.indexOf(this.path)&&(this.method="load",this.paths.push(this.path))}},function(e,t,n){"use strict";function r(e){var t=document.body;document.title=e;var n=document.createElement("iframe");n.src="/favicon.ico",n.onload=function(){setTimeout(function(){n.parentNode.removeChild(n)},0)},t.appendChild(n)}function i(){for(var e,t,n,r=arguments,i=0;i<r.length;i++)switch(Object.prototype.toString.call(r[i])){case"[object Function]":n=r[i];break;case"[object Object]":t=r[i];break;case"[object String]":e=r[i]}t||(t={});var s=e.indexOf("?"),u=void 0,h=void 0;if(s>-1?(u=e.substring(0,s),h=e.substring(s+1)):(u=e.replace(/\?$/,""),h=""),h){var f=a.format(h);for(var l in f)t[l]||(t[l]=f[l])}var p=a.toString(t);return e=p.length?u+"?"+p:u,"function"!=typeof n?new c(function(t){o(e,t)}):void o(e,n)}var s=n(2),o=n(9),u=n(1),a=n(3),c=n(7).Promise,h=function(e){return{set:function(t,n){n=JSON.stringify(n),window.localStorage.setItem(t,n),e.http.request.store[t]=n},remove:function(t){e.http.request.store[t]&&(window.localStorage.removeItem(t),delete e.http.request.store[t])}}},f=function(e){return{set:function(t,n){n=JSON.stringify(n),window.sessionStorage.setItem(t,n),e.http.request.session[t]=n},remove:function(t){e.http.request.session[t]&&(window.sessionStorage.removeItem(t),delete e.http.request.session[t])}}},l=function(e){return{set:function(t,n){s.set(t,n),e.http.request.cookie[t]=n},remove:function(t){e.http.request.cookie[t]&&(s.remove(t),delete e.http.request.cookie[t])}}},p=e.exports=function(){u.defineFreeze(this,"define",function(e,t){u.define(this,e,t)}),u.defineFreeze(this,"defineFreeze",function(e,t){u.defineFreeze(this,e,t)}),this.defineFreeze("title",r),this.defineFreeze("cookie",l(this)),this.defineFreeze("jsonp",i),this.defineFreeze("store",h(this)),this.defineFreeze("session",f(this))};p.prototype.redirect=function(e){var t=this.http,n=t.request,r=this,i=this.http.namespace+"-history",s=n.session[i]||"[]";s=JSON.parse(s);var o=n.referer?s.indexOf(n.referer):-1,u=s.indexOf(e);-1==o?t.history="goahead":-1==u?t.history="goahead":u>o?t.history="goahead":o>u?t.history="retreat":t.history="quiescence",history.pushState({url:e},document.title,"#"+e),-1===s.indexOf(e)&&(s.push(e),this.session.set(i,s)),setTimeout(function(){n.init(),t.match(function(){n.referer=e,t.emit("redirected",n,r)})},0)}},function(e,t,n){var r;(function(e,i,s){/*!
		 * @overview es6-promise - a tiny implementation of Promises/A+.
		 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
		 * @license   Licensed under MIT license
		 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
		 * @version   3.0.2
		 */
(function(){"use strict";function o(e){return"function"==typeof e||"object"==typeof e&&null!==e}function u(e){return"function"==typeof e}function a(e){return"object"==typeof e&&null!==e}function c(e){V=e}function h(e){H=e}function f(){return function(){e.nextTick(m)}}function l(){return function(){K(m)}}function p(){var e=0,t=new ee(m),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function v(){var e=new MessageChannel;return e.port1.onmessage=m,function(){e.port2.postMessage(0)}}function d(){return function(){setTimeout(m,1)}}function m(){for(var e=0;G>e;e+=2){var t=re[e],n=re[e+1];t(n),re[e]=void 0,re[e+1]=void 0}G=0}function g(){try{var e=n(16);return K=e.runOnLoop||e.runOnContext,l()}catch(t){return d()}}function y(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function w(){return new TypeError("A promises callback cannot return that same promise.")}function b(e){try{return e.then}catch(t){return ue.error=t,ue}}function x(e,t,n,r){try{e.call(t,n,r)}catch(i){return i}}function E(e,t,n){H(function(e){var r=!1,i=x(n,t,function(n){r||(r=!0,t!==n?A(e,n):T(e,n))},function(t){r||(r=!0,k(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&i&&(r=!0,k(e,i))},e)}function L(e,t){t._state===se?T(e,t._result):t._state===oe?k(e,t._result):F(t,void 0,function(t){A(e,t)},function(t){k(e,t)})}function S(e,t){if(t.constructor===e.constructor)L(e,t);else{var n=b(t);n===ue?k(e,ue.error):void 0===n?T(e,t):u(n)?E(e,t,n):T(e,t)}}function A(e,t){e===t?k(e,_()):o(t)?S(e,t):T(e,t)}function j(e){e._onerror&&e._onerror(e._result),O(e)}function T(e,t){e._state===ie&&(e._result=t,e._state=se,0!==e._subscribers.length&&H(O,e))}function k(e,t){e._state===ie&&(e._state=oe,e._result=t,H(j,e))}function F(e,t,n,r){var i=e._subscribers,s=i.length;e._onerror=null,i[s]=t,i[s+se]=n,i[s+oe]=r,0===s&&e._state&&H(O,e)}function O(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,i,s=e._result,o=0;o<t.length;o+=3)r=t[o],i=t[o+n],r?z(n,r,i,s):i(s);e._subscribers.length=0}}function q(){this.error=null}function C(e,t){try{return e(t)}catch(n){return ae.error=n,ae}}function z(e,t,n,r){var i,s,o,a,c=u(n);if(c){if(i=C(n,r),i===ae?(a=!0,s=i.error,i=null):o=!0,t===i)return void k(t,w())}else i=r,o=!0;t._state!==ie||(c&&o?A(t,i):a?k(t,s):e===se?T(t,i):e===oe&&k(t,i))}function I(e,t){try{t(function(t){A(e,t)},function(t){k(e,t)})}catch(n){k(e,n)}}function M(e,t){var n=this;n._instanceConstructor=e,n.promise=new e(y),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?T(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&T(n.promise,n._result))):k(n.promise,n._validationError())}function N(e){return new ce(this,e).promise}function P(e){function t(e){A(i,e)}function n(e){k(i,e)}var r=this,i=new r(y);if(!Z(e))return k(i,new TypeError("You must pass an array to race.")),i;for(var s=e.length,o=0;i._state===ie&&s>o;o++)F(r.resolve(e[o]),void 0,t,n);return i}function R(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(y);return A(n,e),n}function U(e){var t=this,n=new t(y);return k(n,e),n}function $(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function B(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(e){this._id=ve++,this._state=void 0,this._result=void 0,this._subscribers=[],y!==e&&(u(e)||$(),this instanceof D||B(),I(this,e))}function J(){var e;if("undefined"!=typeof i)e=i;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(e.Promise=de)}var Y;Y=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var K,V,W,Z=Y,G=0,H=({}.toString,function(e,t){re[G]=e,re[G+1]=t,G+=2,2===G&&(V?V(m):W())}),Q="undefined"!=typeof window?window:void 0,X=Q||{},ee=X.MutationObserver||X.WebKitMutationObserver,te="undefined"!=typeof e&&"[object process]"==={}.toString.call(e),ne="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,re=new Array(1e3);W=te?f():ee?p():ne?v():void 0===Q?g():d();var ie=void 0,se=1,oe=2,ue=new q,ae=new q;M.prototype._validateInput=function(e){return Z(e)},M.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},M.prototype._init=function(){this._result=new Array(this.length)};var ce=M;M.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,i=0;n._state===ie&&t>i;i++)e._eachEntry(r[i],i)},M.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor;a(e)?e.constructor===r&&e._state!==ie?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},M.prototype._settledAt=function(e,t,n){var r=this,i=r.promise;i._state===ie&&(r._remaining--,e===oe?k(i,n):r._result[t]=n),0===r._remaining&&T(i,r._result)},M.prototype._willSettleAt=function(e,t){var n=this;F(e,void 0,function(e){n._settledAt(se,t,e)},function(e){n._settledAt(oe,t,e)})};var he=N,fe=P,le=R,pe=U,ve=0,de=D;D.all=he,D.race=fe,D.resolve=le,D.reject=pe,D._setScheduler=c,D._setAsap=h,D._asap=H,D.prototype={constructor:D,then:function(e,t){var n=this,r=n._state;if(r===se&&!e||r===oe&&!t)return this;var i=new this.constructor(y),s=n._result;if(r){var o=arguments[r-1];H(function(){z(r,i,o,s)})}else F(n,i,e,t);return i},"catch":function(e){return this.then(null,e)}};var me=J,ge={Promise:de,polyfill:me};n(13).amd?(r=function(){return ge}.call(t,n,t,s),!(void 0!==r&&(s.exports=r))):"undefined"!=typeof s&&s.exports?s.exports=ge:"undefined"!=typeof this&&(this.ES6Promise=ge),me()}).call(this)}).call(t,n(15),function(){return this}(),n(14)(e))},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function i(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,i,u,a,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],o(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(i=arguments.length,u=new Array(i-1),a=1;i>a;a++)u[a-1]=arguments[a];n.apply(this,u)}else if(s(n)){for(i=arguments.length,u=new Array(i-1),a=1;i>a;a++)u[a-1]=arguments[a];for(c=n.slice(),i=c.length,a=0;i>a;a++)c[a].apply(this,u)}return!0},n.prototype.addListener=function(e,t){var i;if(!r(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned){var i;i=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,i,o,u;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(u=o;u-->0;)if(n[u]===t||n[u].listener&&n[u].listener===t){i=u;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?r(e._events[t])?1:e._events[t].length:0}},function(e,t){function n(e){for(var t="",n=0;e>n;n++){var i=Math.ceil(35*Math.random());t+=r[i]}return t}var r=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],i=e.exports=function(e,t,r){r||(r="callback");var s=e.indexOf("?"),o="",u="",a="jsonp_"+(new Date).getTime()+"_"+n(10),c=null;s>-1?(u=e.substring(s),o=e.substring(0,s),e="?"===u?o+"?"+r+"="+a:o+u+"&"+r+"="+a):e=e+"?"+r+"="+a,window[a]=function(e){c=e},i.script(e,function(){setTimeout(function(){"function"==typeof t&&t(c)},0)})};i.script=function(e,t){var n=document.createElement("script"),r=window.document,i=r.head||r.getElementsByTagName("head")[0]||r.documentElement,s=i.getElementsByTagName("base")[0];n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n.onreadystatechange=null,"function"==typeof t&&t.call(this))},n.async=!0,n.src=e,s?i.insertBefore(n,s):i.appendChild(n)}},function(e,t,n){function r(e){for(var t,n=[],r=0,i=0,s="";null!=(t=m.exec(e));){var o=t[0],a=t[1],c=t.index;if(s+=e.slice(i,c),i=c+o.length,a)s+=a[1];else{s&&(n.push(s),s="");var h=t[2],f=t[3],l=t[4],p=t[5],v=t[6],d=t[7],g="+"===v||"*"===v,y="?"===v||"*"===v,_=h||"/",w=l||p||(d?".*":"[^"+_+"]+?");n.push({name:f||r++,prefix:h||"",delimiter:_,optional:y,repeat:g,pattern:u(w)})}}return i<e.length&&(s+=e.substr(i)),s&&n.push(s),n}function i(e){return s(r(e))}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^"+e[n].pattern+"$"));return function(n){for(var r="",i=n||{},s=0;s<e.length;s++){var o=e[s];if("string"!=typeof o){var u,a=i[o.name];if(null==a){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to be defined')}if(d(a)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but received "'+a+'"');if(0===a.length){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var c=0;c<a.length;c++){if(u=encodeURIComponent(a[c]),!t[s].test(u))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'", but received "'+u+'"');r+=(0===c?o.prefix:o.delimiter)+u}}else{if(u=encodeURIComponent(a),!t[s].test(u))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but received "'+u+'"');r+=o.prefix+u}}else r+=o}return r}}function o(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function a(e,t){return e.keys=t,e}function c(e){return e.sensitive?"":"i"}function h(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return a(e,t)}function f(e,t,n){for(var r=[],i=0;i<e.length;i++)r.push(v(e[i],t,n).source);var s=new RegExp("(?:"+r.join("|")+")",c(n));return a(s,t)}function l(e,t,n){for(var i=r(e),s=p(i,n),o=0;o<i.length;o++)"string"!=typeof i[o]&&t.push(i[o]);return a(s,t)}function p(e,t){t=t||{};for(var n=t.strict,r=t.end!==!1,i="",s=e[e.length-1],u="string"==typeof s&&/\/$/.test(s),a=0;a<e.length;a++){var h=e[a];if("string"==typeof h)i+=o(h);else{var f=o(h.prefix),l=h.pattern;h.repeat&&(l+="(?:"+f+l+")*"),l=h.optional?f?"(?:"+f+"("+l+"))?":"("+l+")?":f+"("+l+")",i+=l}}return n||(i=(u?i.slice(0,-2):i)+"(?:\\/(?=$))?"),i+=r?"$":n&&u?"":"(?=\\/|$)",new RegExp("^"+i,c(t))}function v(e,t,n){return t=t||[],d(t)?n||(n={}):(n=t,t=[]),e instanceof RegExp?h(e,t,n):d(e)?f(e,t,n):l(e,t,n)}var d=n(11);e.exports=v,e.exports.parse=r,e.exports.compile=i,e.exports.tokensToFunction=s,e.exports.tokensToRegExp=p;var m=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},function(e,t){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},function(e,t){t.type=function(e,t){var n=Object.prototype.toString.call(e).split(" ")[1].replace(/\]$/,"");return t?n==t:n},t.mixin=function(e,t,n){for(var r in t)e[r]?n&&(e[r]=t[r]):e[r]=t[r];return e}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){function n(){c=!1,o.length?a=o.concat(a):h=-1,a.length&&r()}function r(){if(!c){var e=setTimeout(n);c=!0;for(var t=a.length;t;){for(o=a,a=[];++h<t;)o&&o[h].run();h=-1,t=a.length}o=null,c=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function s(){}var o,u=e.exports={},a=[],c=!1,h=-1;u.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new i(e,t)),1!==a.length||c||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=s,u.addListener=s,u.once=s,u.off=s,u.removeListener=s,u.removeAllListeners=s,u.emit=s,u.binding=function(e){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(e){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(e,t){}])})}])});