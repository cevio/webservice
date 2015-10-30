module.exports = function(browser){
    return {
        props: ['menu'],
        template: '<div class="webview-header {{menu.page}} {{menu.hide?\'hide\':\'\'}}">' +
        '<div class="webview-header-outer">' +
        '<div class="webview-header-inner">' +
        '<div class="clearfix">' +
        '<div class="left-btn pull-left" so-html="{{menu.leftHTML}}" so-on="click:menu.leftClick(this)"></div>' +
        '<div class="right-btn pull-right" so-html="{{menu.rightHTML}}" so-on="click:menu.rightClick(this)"></div>' +
        '<div class="webtitle">{{menu.title}}</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
        events: {
            init: function(){
                this.wraproot = this.element.childNodes[0];
                this.wrapinner = this.wraproot.querySelector('.webview-header-outer');
                browser._headbar = this;
            }
        }
    }
};