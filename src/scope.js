/**
 * Created by evio on 15/10/5.
 */
module.exports = function(){
    return {
        nav: {
            hide: false,
            title: 'new page',
            onLeftPress: function(){},
            onRightPress: function(){},
            leftHtml: '<i class="fa fa-angle-left"></i>',
            rightHtml: '<i class="fa fa-send"></i>',
            classes: function(){return this.hide ? 'navHide' : 'navShow';}
        }
    }
};