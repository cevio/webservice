module.exports = function(browser){
    return {
        props: ['data'],
        events: {
            wrapTemplate: wrapComponent,
            scanDoms: init(browser)
        }
    }
};

function wrapComponent(temp){
    this.wrapname = this.virtualDom.getAttribute('name');
    return '<div class="webview"><section>' + temp + '</section></div>';
}

function init(browser){
    return function(){
        for ( let i = 0 ; i < this.element.childNodes.length ; i++ ){
            if (
                this.element.childNodes[i].nodeType === 1 &&
                this.element.childNodes[i].getAttribute('class') === 'webview'
            ){
                this.wraproot = this.element.childNodes[i];
                break;
            }
        }
        browser.views[this.wrapname] = this;
    }
}