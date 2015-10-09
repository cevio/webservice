/**
 * Created by evio on 15/10/5.
 */
module.exports = function(){
    return {
        nav: {
            hide: false,
                title: '未命名标题',
                onLeftPress: function(){alert(1);},
            onRightPress: function(){alert(2);},
            leftHtml: '<i class="fa fa-angle-left"></i>',
                rightHtml: '<i class="fa fa-send"></i>',
                classes: function(){return this.hide ? 'navHide' : 'navShow';}
        }
    }
};