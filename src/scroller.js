import IScroll from 'iscroll';
import * as utils from './utils';
var iScrollClick = iScrollClick();

export default class {
    constructor(webview, app){
        this.element = webview;
        this.section = this.element.querySelector('section');
        this.app = app;
        this.object = new IScroll(this.element, {
            click: iScrollClick,
            probeType: 3,
            wheelAction: 'zoom',
            preventDefault: false
        });
        this.init();
        this.refresher = null;
        this.doRefresh = false;
        this.timer = 0;
        this.status = {
            confirmed: utils.refresh.percent.confirmed,
            ready: utils.refresh.percent.ready,
            start: 50
        };

    }
    init(){
        var that = this;
        this.object.on('scrollStart', function(){
            if ( that.doRefresh ) return;
            that.dragger = true;
            that.timer = new Date().getTime();
        });
        this.object.on('scroll', function(){
            if ( that.doRefresh ) return;
            if ( that.dragger ){
                let y = this.y;
                if ( y > that.status.start ){
                    that.start();
                }else if ( y > that.status.ready ){
                    that.ready();
                }else if ( y > that.status.confirmed ){
                    that.confirmed();
                }else if ( y === 0 && (new Date().getTime() - that.timer > 350) ){
                    that.start();
                }
                that.round(y);
            }
        });
        this.object.on('scrollEnd', function(){
            that.dragger = false;
            if ( that.doRefresh ){
                that.refreshicon.setAttribute('class', utils.refresh.icon.doing);
                that.text(utils.refresh.text.step4);
                that.app.res.endFresh = that.destory.bind(that);
                that.app.onRefresh();
                setTimeout(function(){
                    if ( that.app.refreshCount == 0 ){
                        that.destory();
                    }
                }, 0);
            }else{
                that.destory();
            }
        });
    }
    makeFresher(html){
        this.refresher = document.createElement('div');
        this.refresher.innerHTML = html || '<i class="' + utils.refresh.icon.defaults + '"></i> <span></span>';
        this.refresher.className = 'webview-refresher';
        this.section.insertBefore(this.refresher, this.section.firstChild);
        this.refreshicon = this.refresher.querySelector('i');
        this.refreshtext = this.refresher.querySelector('span');
    }

    round(y){
        if (!this.refreshicon) return;
        let p = ((y-this.status.confirmed)/(this.status.start - this.status.confirmed));
        let deg = p * 180;
        let scale = p * 0.5 + 1;
        if ( deg > 180 ) deg = 180;
        this.refreshicon.style.cssText = '-webkit-transform:scale(' + scale + ') rotate(' + deg + 'deg)';
    }

    text(text){
        if ( !this.refreshtext ) return;
        this.refreshtext.innerHTML = text;
    }

    pushbar(){
        if ( !this.refresher ){
            let refreshers = this.section.querySelectorAll('.webview-refresher');
            this.refresher = refreshers && refreshers.length ? refreshers[0] : null;
            !this.refresher && this.makeFresher();
        }
    }

    confirmed(){
        this.pushbar();
        this.text(utils.refresh.text.step1);
    }

    ready(){
        this.pushbar();
        this.text(utils.refresh.text.step2);
    }

    start(){
        this.pushbar();
        this.text(utils.refresh.text.step3);
        this.doRefresh = true;
    }

    destory(){
        if ( this.refresher ){
            this.refresher.parentNode.removeChild(this.refresher);
            this.refreshtext = null;
            this.refreshicon = null;
            this.refresher = null;
        }
        this.doRefresh = false;
        this.app.refreshCount = 0;
    }
}

function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
        return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}