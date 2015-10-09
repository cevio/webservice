import component from './component';
import application from './application';

let webview = (soyie) => {
    const app = new application();
    soyie.component('webview', component(soyie, app));
    soyie.directive('so-href', (attr, DOM, vm) => {
        return webViewHref.call(this, attr, DOM, vm, soyie, app);
    });
    return app;
};

let webViewHref = (attr, DOM, vm, soyie, app) => {
    var expression = soyie.util.formatExpression(attr.nodeValue);
    var object = new soyie.nodeStructor(DOM, expression);
    object.parent = vm;
    object.value = null;
    object.binded = false;
    object.set = function(val){
        if ( val !== object.value ){
            object.value = val;
        }
    };
    object.get = function(){
        return object.value;
    };
    object.render = function(scope = this.scope, options = {}){
        this.scope = scope;
        this.set(soyie.util.get(this.expression, this.scope, options));
        if ( object.binded ) return;
        this.node.addEventListener('click', function(){
            app.render(object.get());
        }, false);
        object.binded = true;
    };

    DOM.removeAttribute('so-href');

    return object;
};

export default webview;
