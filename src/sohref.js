module.exports = function(soyie, app){
    return function(attr, DOM, vm){
        var expression = soyie.util.formatExpression(attr.nodeValue);
        var object = new soyie.nodeStructor(DOM, expression);
        object.parent = vm;
        object.set = DomSetter;
        DOM.addEventListener('click', addListener(object), false);
        DOM.removeAttribute('so-href');
        return object;
    };

    function DomSetter(value){ ( this.value !== value ) && (this.value = value); }
    function addListener(object){
        return function(){
            app.response.redirect(object.value);
        }
    }
};