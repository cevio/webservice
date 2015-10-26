window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

var animEndEventNames = {
	'WebkitAnimation' : 'webkitAnimationEnd',
	'OAnimation' : 'oAnimationEnd',
	'msAnimation' : 'MSAnimationEnd',
	'animation' : 'animationend'
},
// animation end event name
animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation')],
curAnimIndex = -1,
endCurrPage = false,
endNextPage = false,
isAnimating = false;
var animArr = [
	"pt-page-moveToLeft,pt-page-moveFromRight",
	"pt-page-moveToRight,pt-page-moveFromLeft",
	"pt-page-moveToTop,pt-page-moveFromBottom",
	"pt-page-moveToBottom,pt-page-moveFromTop",
	"pt-page-fade,pt-page-moveFromRight pt-page-ontop",
	"pt-page-fade,pt-page-moveFromLeft pt-page-ontop",
	"pt-page-fade,pt-page-moveFromBottom pt-page-ontop",
	"pt-page-fade,pt-page-moveFromTop pt-page-ontop",
	"pt-page-moveToLeftFade,pt-page-moveFromRightFade",
	"pt-page-moveToRightFade,pt-page-moveFromLeftFade",
	"pt-page-moveToTopFade,pt-page-moveFromBottomFade",
	"pt-page-moveToBottomFade,pt-page-moveFromTopFade",
	"pt-page-moveToLeftEasing pt-page-ontop,pt-page-moveFromRight",
	"pt-page-moveToRightEasing pt-page-ontop,pt-page-moveFromLeft",
	"pt-page-moveToTopEasing pt-page-ontop,pt-page-moveFromBottom",
	"pt-page-moveToBottomEasing pt-page-ontop,pt-page-moveFromTop",
	"pt-page-scaleDown,pt-page-moveFromRight pt-page-ontop",
	"pt-page-scaleDown,pt-page-moveFromLeft pt-page-ontop",
	"pt-page-scaleDown,pt-page-moveFromBottom pt-page-ontop",
	"pt-page-scaleDown,pt-page-moveFromTop pt-page-ontop",
	"pt-page-scaleDown,pt-page-scaleUpDown pt-page-delay300",
	"pt-page-scaleDownUp,pt-page-scaleUp pt-page-delay300",
	"pt-page-moveToLeft pt-page-ontop,pt-page-scaleUp",
	"pt-page-moveToRight pt-page-ontop,pt-page-scaleUp",
	"pt-page-moveToTop pt-page-ontop,pt-page-scaleUp",
	"pt-page-moveToBottom pt-page-ontop,pt-page-scaleUp",
	"pt-page-scaleDownCenter,pt-page-scaleUpCenter pt-page-delay400",
	"pt-page-rotateRightSideFirst,pt-page-moveFromRight pt-page-delay200 pt-page-ontop",
	"pt-page-rotateLeftSideFirst,pt-page-moveFromLeft pt-page-delay200 pt-page-ontop",
	"pt-page-rotateTopSideFirst,pt-page-moveFromTop pt-page-delay200 pt-page-ontop",
	"pt-page-rotateBottomSideFirst,pt-page-moveFromBottom pt-page-delay200 pt-page-ontop",
	"pt-page-flipOutRight,pt-page-flipInLeft pt-page-delay500",
	"pt-page-flipOutLeft,pt-page-flipInRight pt-page-delay500",
	"pt-page-flipOutTop,pt-page-flipInBottom pt-page-delay500",
	"pt-page-flipOutBottom,pt-page-flipInTop pt-page-delay500",
	"pt-page-rotateFall pt-page-ontop,pt-page-scaleUp",
	"pt-page-rotateOutNewspaper,pt-page-rotateInNewspaper pt-page-delay500",
	"pt-page-rotatePushLeft,pt-page-moveFromRight",
	"pt-page-rotatePushRight,pt-page-moveFromLeft",
	"pt-page-rotatePushTop,pt-page-moveFromBottom",
	"pt-page-rotatePushBottom,pt-page-moveFromTop",
	"pt-page-rotatePushLeft,pt-page-rotatePullRight pt-page-delay180",
	"pt-page-rotatePushRight,pt-page-rotatePullLeft pt-page-delay180",
	"pt-page-rotatePushTop,pt-page-rotatePullBottom pt-page-delay180",
	"pt-page-rotatePushBottom,pt-page-rotatePullTop pt-page-delay180",
	"pt-page-rotateFoldLeft,pt-page-moveFromRightFade",
	"pt-page-rotateFoldRight,pt-page-moveFromLeftFade",
	"pt-page-rotateFoldTop,pt-page-moveFromBottomFade",
	"pt-page-rotateFoldBottom,pt-page-moveFromTopFade",
	"pt-page-moveToRightFade,pt-page-rotateUnfoldLeft",
	"pt-page-moveToLeftFade,pt-page-rotateUnfoldRight",
	"pt-page-moveToBottomFade,pt-page-rotateUnfoldTop",
	"pt-page-moveToTopFade,pt-page-rotateUnfoldBottom",
	"pt-page-rotateRoomLeftOut pt-page-ontop,pt-page-rotateRoomLeftIn",
	"pt-page-rotateRoomRightOut pt-page-ontop,pt-page-rotateRoomRightIn",
	"pt-page-rotateRoomTopOut pt-page-ontop,pt-page-rotateRoomTopIn",
	"pt-page-rotateRoomBottomOut pt-page-ontop,pt-page-rotateRoomBottomIn",
	"pt-page-rotateCubeLeftOut pt-page-ontop,pt-page-rotateCubeLeftIn",
	"pt-page-rotateCubeRightOut pt-page-ontop,pt-page-rotateCubeRightIn",
	"pt-page-rotateCubeTopOut pt-page-ontop,pt-page-rotateCubeTopIn",
	"pt-page-rotateCubeBottomOut pt-page-ontop,pt-page-rotateCubeBottomIn",
	"pt-page-rotateCarouselLeftOut pt-page-ontop,pt-page-rotateCarouselLeftIn",
	"pt-page-rotateCarouselRightOut pt-page-ontop,pt-page-rotateCarouselRightIn",
	"pt-page-rotateCarouselTopOut pt-page-ontop,pt-page-rotateCarouselTopIn",
	"pt-page-rotateCarouselBottomOut pt-page-ontop,pt-page-rotateCarouselBottomIn",
	"pt-page-rotateSidesOut,pt-page-rotateSidesIn pt-page-delay200",
	"pt-page-rotateSlideOut,pt-page-rotateSlideIn"
]
var animObj = {};
!function (){
	var obj = {other:[]};
	var arr = 'left,right,top,bottom'.split(',');
	for(var k in animArr){
		var row = animArr[k];
		var ismat = false;
		arr.forEach(function(side,i){
			if(ismat) return;
			var regtxt = 'to'+side+'|'+side+'in|fold'+side+'|push'+side+'|out'+side+'|'+side+'out';
			var reg = new RegExp(regtxt,'i');
			var anim = row.match(/pt-page-(\w*)/)[1];
			if(anim.match(reg)){
				if(!obj[side]) obj[side] = [];
				obj[side].push(row);
				ismat = true;
			}
		})
		if(!ismat) obj.other.push(row);
	}
	animObj = obj;
}();

var $curPage,$nextPage;
function showPage(anim,cb){
	if(isAnimating) return;
	isAnimating = true;
	var anim = anim.split(',');
	var curClass = 'pt-page-current';
	function reset(){
		if(!(endCurrPage&&endNextPage)) return;
		isAnimating = false;
		endCurrPage = false;
		endNextPage = false;
		$curPage.removeClass('page-show'+' '+anim[0]);
		$nextPage.removeClass(anim[1]).addClass(curClass);
		if(cb) cb();
	}
	$curPage = $('#pt-main .'+curClass).removeClass(curClass);
	$nextPage = $curPage.siblings('.pt-page').addClass(curClass);
	$curPage.addClass(anim[0]+' page-show').on(animEndEventName,function(){
		$curPage.off( animEndEventName );
		endCurrPage = true;
		reset();
	})
	$nextPage.addClass(anim[1]).on(animEndEventName,function(){
		$nextPage.off( animEndEventName );
		endNextPage = true;
		reset();
	});
}

module.exports = showPage;









