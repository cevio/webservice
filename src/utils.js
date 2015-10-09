exports.addClass = addClass;
exports.removeClass = removeClass;
exports.removeClassAll = removeClassAll;

function addClass(dom, cls){
    if ( !dom.hasAttribute('class') ){
        dom.setAttribute('class', cls);
    }else{
        var attrs = dom.getAttribute('class');
        attrs = attrs.replace(/\s+/g, ' ').split(' ');
        if ( attrs.indexOf(cls) === -1 ){
            attrs.push(cls);
        }
        dom.setAttribute('class', attrs.join(' '));
    }
}

function removeClass(dom, cls){
    if ( dom.hasAttribute('class') ){
        var attrs = dom.getAttribute('class');
        attrs = attrs.replace(/\s+/g, ' ').split(' ');
        var index = attrs.indexOf(cls);
        if ( index > -1 ){
            attrs.splice(index, 1);
            dom.setAttribute('class', attrs.join(' '));
        }
    }
}

function removeClassAll(){
    for ( var i = 0 ; i < arguments.length ; i++ ){
        var node = arguments[i];
        if ( !node ) continue;
        removeClass(node, 'ghost-go-current-move');
        removeClass(node, 'ghost-go-target-move');
        removeClass(node, 'ghost-back-current-move');
        removeClass(node, 'ghost-back-target-move');
    }
}