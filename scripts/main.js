!function(a,b,c,d){var e={},f={},g={},h={},i=new rebound.SpringSystem,j={navigation:{nav:null,navItems:[],navOffsets:[],navItemWidths:[],navItemWidthsRunningSum:[],downIndex:0},carousel:{currentPage:0},dragging:{isDragging:!1},viewport:{viewportWidth:0,viewportHeight:0},captions:{captionItems:[]},imageSize:{imageWidth:[1080,1080,2400],imageHeight:[1920,1920,1536],rightEdge:[400,400,812],bottomEdge:[641,641,545],bottomPadding:[!1,!1,!1]},springs:{mainSpring:i.createSpring(),navigationSpring:i.createSpring()}};jQuery.fn.springyCarousel=function(b){var d={carouselWrapperSelector:"#wrapper",slidesSelector:"#slides li",navigationSlider:"#nav",captionSelector:".caption",captions:{show:!0},navigation:{keys:!1,drag:!0},frictionAndTension:{navigation:{friction:5.5,tension:100},carousel:{friction:5.7,tension:4.5}},carouselTransitionComplete:null},i=a.extend({},d,b),k=null;j.viewport.viewportWidth=a(i.carouselWrapperSelector).innerWidth(),j.viewport.viewportHeight=a(i.slidesSelector).innerHeight(),j.navigation.nav=c.getElementById(i.navigationSlider.replace("#","")),k=a(i.navigationSlider).children("li");var l=f.calculateNavWidth(k);a(i.navigationSlider).width(l),k.each(function(a,b){j.navigation.navOffsets[a]=f.navOffsetForIndex(a),j.navigation.navItems[a]=b});var m=a(i.captionSelector);return m.each(function(a,b){j.captions.captionItems[a]=b}),h.setupMainSpring(i.frictionAndTension.carousel.friction,i.frictionAndTension.carousel.tension,function(b,c,d){j.navigation.nav.style.webkitTransform="translate3d("+b+"px, 0, 0)",j.navigation.nav.style.MozTransform="translate3d("+b+"px, 0, 0)",a(i.slidesSelector).each(function(a,e){var f=1-Math.abs(c-a);if(f>0){var k=a*j.viewport.viewportWidth-c*j.viewport.viewportWidth,l=h.transitionForProgressInRange(f,.6,1);if(e.style.webkitTransform="translate3d("+k+"px, 0, 0) scale("+l+")",e.style.MozTransform="translate3d("+k+"px, 0, 0) scale("+l+")",a<m.length){var n=h.transitionForProgressInRange(f,-8,1);m[a].style.opacity=n}}e.style.opacity=f>0?1:0;var o=h.transitionForProgressInRange(g.clampedProgress(f),.2,1,0);j.navigation.navItems[a].style.opacity=o,1===c.toString().split(".").length&&i.carouselTransitionComplete&&i.carouselTransitionComplete(d,b)})}),h.setupNavigationSpring(i.frictionAndTension.navigation.friction,i.frictionAndTension.navigation.tension),a(i.slidesSelector).each(function(a,b){b.style.webkitTransform="translate3d("+j.viewport.viewportWidth*a+"px, 0, 0)",b.style.MozTransform="translate3d("+j.viewport.viewportWidth*a+"px, 0, 0)",slides[a]=b}),f.selectTabIndex(0,!1),i.navigation.keys&&e.addArrowKeySupport(),i.navigation.drag&&e.addDragSupport(a(i.slidesSelector).parent()[0]),a(i.navigationSlider).children("li").each(function(b,c){a(c).click(function(){f.selectTabIndex(b,!0)}),a(c).mousedown(function(){j.navigation.downIndex=a(this).index(),j.springs.navigationSpring.setEndValue(1)}),a(c).mouseup(function(){j.springs.navigationSpring.setEndValue(0)})}),a(i.captionSelector).each(function(a){i.captions.show&&f.layoutCaptions(a,!0)}),this.layoutCaptions=f.layoutCaptions,this.recalculateSize=f.recalculateSize,this.goToPage=f.selectTabIndex,this.resetCurrentPage=f.resetCurrentPage,this},g.clampedProgress=function(a){return 0>a?a=0:a>1&&(a=1),a},f.recalculateSize=function(){j.viewport.viewportWidth=a("#wrapper").innerWidth(),j.viewport.viewportHeight=a("#slides li").innerHeight()},f.calculateNavWidth=function(b){var c=0;return b.each(function(b,d){j.navigation.navItemWidths[b]=a(d).innerWidth(),j.navigation.navItemWidthsRunningSum[b]=j.navigation.navItemWidths[b],b>0&&(j.navigation.navItemWidthsRunningSum[b]=j.navigation.navItemWidthsRunningSum[b]+j.navigation.navItemWidthsRunningSum[b-1]),c+=j.navigation.navItemWidths[b]}),c},f.navOffsetForIndex=function(a){var b=0;return b=a>0?-1*(j.navigation.navItemWidthsRunningSum[a-1]+j.navigation.navItemWidths[a]/2):j.navigation.navItemWidths[a]/2*-1},f.selectTabIndex=function(b,c){0>b?b=0:b>j.navigation.navItems.length-1&&(b=j.navigation.navItems.length-1),c?(j.viewport.viewportWidth=a("#wrapper").innerWidth(),j.carousel.currentPage=b,j.springs.mainSpring.setEndValue(b)):j.springs.mainSpring.setCurrentValue(b)},f.resetCurrentPage=function(){j.carousel.currentPage=0},f.layoutCaptions=function(){var b=j.imageSize.rightEdge,c=j.imageSize.bottomEdge,d=j.imageSize.bottomPadding,e=j.captions.captionItems,g=d,h=a("#slides li"),i=h.innerWidth(),k=h.innerHeight();a(".caption").each(function(d,h){e[d]=h;var j=f.calculateContentScaleForIndex(d),l=i/2+b[d]*j,m=-1*(k/2-c[d]*j),n=parseInt(a(h).css("padding-left"),10);g[d]&&(m-=n),l=Math.round(l),m=Math.round(m),h.style.webkitTransform="translate3d("+l+"px, "+m+"px, 0)",h.style.MozTransform="translate3d("+l+"px, "+m+"px, 0)",e[d].style.visibility="visible"})},f.calculateContentScaleForIndex=function(a){var b=j.imageSize.imageWidth[a],c=j.imageSize.imageHeight[a],d=j.viewport.viewportWidth,e=j.viewport.viewportHeight,f=d/e>b/c?e/c:d/b;return f},e.addArrowKeySupport=function(){var b=!0,d=!1;a(c).keydown(function(a){var c=j.carousel.currentPage,e=.001,g=.03,h=0;37===a.keyCode?(h=j.springs.mainSpring.getCurrentValue()<e,h&&b?(d=!0,j.springs.mainSpring.setEndValue(j.springs.mainSpring.getCurrentValue()-g)):h||(d=!1,f.selectTabIndex(c-1,!0))):39===a.keyCode&&(h=j.springs.mainSpring.getCurrentValue()>j.navigation.navItems.length-1-e,h&&b?(d=!0,j.springs.mainSpring.setEndValue(j.springs.mainSpring.getCurrentValue()+g)):h||(d=!1,f.selectTabIndex(c+1,!0))),b=!1}),a(c).keyup(function(a){var c=j.carousel.currentPage;37===a.keyCode&&d?f.selectTabIndex(c-1,!0):39===a.keyCode&&d&&f.selectTabIndex(c+1,!0),isRubberBanding=!1,b=!0})},e.addDragSupport=function(a){a.addEventListener("touchstart",function(a){var b=a.touches[0];startDragging(b.pageX)},!1),a.addEventListener("touchmove",function(a){a.preventDefault();var b=a.touches[0];continueDragging(b.pageX)},!1),a.addEventListener("touchend",function(a){endDragging()},!1),a.addEventListener("touchcancel",function(a){endDragging()},!1),a.addEventListener("mousedown",function(a){startDragging(a.clientX)},!1),a.addEventListener("mousemove",function(a){j.dragging.isDragging&&continueDragging(a.clientX)},!1),a.addEventListener("mouseup",function(a){endDragging()},!1),a.addEventListener("mouseleave",function(a){j.dragging.isDragging&&endDragging()},!1)},startDragging=function(b){lastX=b,j.dragging.isDragging=!0,j.viewport.viewportWidth=a("#wrapper").innerWidth(),j.springs.mainSpring.setAtRest(),a("#slides").addClass("dragging")},continueDragging=function(a){panVelocity=a-lastX,lastX=a;var b=h.progressForValueInRange(panVelocity,0,-j.viewport.viewportWidth),c=j.springs.mainSpring.getCurrentValue();(0>c+b||c+b>j.navigation.navItems.length-1)&&(b*=.5),j.springs.mainSpring.setCurrentValue(c+b),j.springs.mainSpring.setAtRest()},endDragging=function(){var b=j.springs.mainSpring.getCurrentValue(),c=j.carousel.currentPage,d=Math.abs(panVelocity)>3,e=Math.abs(b-c)>.3,g=e||d,i=0>=panVelocity;if(g){var k=i?c+1:c-1;f.selectTabIndex(k,!0)}else f.selectTabIndex(c,!0);var l=h.progressForValueInRange(panVelocity,0,-j.viewport.viewportWidth);j.springs.mainSpring.setVelocity(30*l),panVelocity=0,j.dragging.isDragging=!1,a("#slides").removeClass("dragging")},h.setupMainSpring=function(a,c,d){j.springs.mainSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(c,a)),j.springs.mainSpring.addListener({onSpringUpdate:function(a){var c=a.getCurrentValue(),e=h.transitionForProgressInSteps(c,j.navigation.navOffsets);Math.abs(a.getVelocity())<.05&&b.devicePixelRatio<1.1&&(e=Math.floor(e)),d(e,c,a)}})},h.setupNavigationSpring=function(a,b){j.springs.navigationSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(b,a)),j.springs.navigationSpring.addListener({onSpringUpdate:function(a){var b=a.getCurrentValue(),c=h.transitionForProgressInRange(b,1,.92);j.navigation.navItems[j.navigation.downIndex].style.webkitTransform="scale("+c+")",j.navigation.navItems[j.navigation.downIndex].style.MozTransform="scale("+c+")"}})},h.transitionForProgressInSteps=function(a,b){var c=-1;return b.length<2?c:(0>a?c=h.transitionForProgressInRange(a,b[0],b[1]):a>b.length-1?(normalizedProgress=h.progressForValueInRange(a,Math.floor(a),Math.floor(a)+1),normalizedProgress+=1,c=h.transitionForProgressInRange(normalizedProgress,b[b.length-2],b[b.length-1])):a===b.length-1||0===a?c=b[a]:(normalizedProgress=h.progressForValueInRange(a,Math.floor(a),Math.floor(a)+1),c=h.transitionForProgressInRange(normalizedProgress,b[Math.floor(a)],b[Math.floor(a)+1])),c)},h.transitionForProgressInRange=function(a,b,c){return b+a*(c-b)},h.progressForValueInRange=function(a,b,c){return(a-b)/(c-b)}}(jQuery,window,document),$(document).ready(function(){initPage()});var site={},panVelocity=0,initPage=function(){toggleNavigation(),reboundSlider(),dragImage()},toggleNavigation=function(){var a=$("body"),b=$("#appcontainer"),c=$("#hamburgericon"),d=$("#appnav a, .menu-button, .overlay"),e="webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";d.on("click",function(){a.toggleClass("shift"),c.toggleClass("open"),a.addClass("shifting")}),b.on(e,function(){a.removeClass("shifting")})},reboundSlider=function(){if($("#wrapper").length>0){var a=$("#wrapper").springyCarousel({carouselTransitionComplete:function(a,b){}});$(window).resize(function(){a.recalculateSize(),a.layoutCaptions()})}},dragImage=function(){var a=$("#slides li img");a.attr("draggable","false"),a.attr("ondragstart","return false;")};$(function(){"use strict";var a={prefetch:!0,cacheLength:2,loadingClass:"is-loading",blacklist:".nss",development:!1,onBefore:function(a,b){},onStart:{duration:600,render:function(a){a.addClass("is-exiting"),b.restartCSSAnimations()}},onProgress:{duration:0,render:function(a){}},onReady:{duration:0,render:function(a,b){a.removeClass("is-exiting"),a.html(b)}},onAfter:function(a,b){initPage()}},b=$("#main").smoothState(a).data("smoothState")});