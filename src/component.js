module.exports = function(browser){
    return {
        props: ['data'],
        events: {
            wrapTemplate: wrapComponent,
            init: init(browser)
        }
    }
};

function wrapComponent(temp){
    this.wrapname = this.virtualDom.getAttribute('name');
    this.zoom = this.virtualDom.getAttribute('zoom');
    if ( this.zoom == undefined ){
        this.zoom = 0;
    }else{
        this.zoom = Number(this.zoom);
    }
    return '<div class="webview hide"><section>' + temp + '</section></div>';
}

function init(browser){
    return function(){
        for ( let i = 0 ; i < this.element.childNodes.length ; i++ ){
            if ( this.element.childNodes[i].nodeType === 1 ){
                this.wraproot = this.element.childNodes[i];
                break;
            }
        }
        browser.views[this.wrapname] = this;
    }
}