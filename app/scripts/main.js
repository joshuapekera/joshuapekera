$(document).ready(function(){
	//'use strict';
	initPage();
});
// ------------------------------------ //
// Variables
// -------------------------------------//

var site = {};
var panVelocity = 0;
var shiftDelay = 500;
var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
		'MozTransition': 'transitionend', // only for FF < 15
		'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
	},
	transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

// ------------------------------------ //
// Functions
// -------------------------------------//

// Kick off the animation class on first load since smoothstate is not yet available
//$('#main').addClass('transition-start');
	
// Back button
function goBack() {
    window.history.back();
}

// WOW config
// var wow = new WOW(
// 	{
// 		boxClass:     'wow',      // animated element css class (default is wow)
// 		animateClass: 'animated', // animation css class (default is animated)
// 		offset:       0,          // distance to the element when triggering the animation (default is 0)
// 		mobile:       true,       // trigger animations on mobile devices (default is true)
// 		live:         true,       // act on asynchronously loaded content (default is true)
// 		callback:     function(box) {
// 			// the callback is fired every time an animation is started
// 			// the argument that is passed in is the DOM node being animated
// 		}
// 	}
// );
// wow.init();
// ------------------------------------ //
// Initialize Page
// -------------------------------------//

var initPage = function(){
	//FastClick.attach(document.body);
	//lazyConfig();
	headroomInit();
	toggleNavigation();
	toggleDelay();
	reboundSlider();
	//createHamburger();
	dragImage();
};

// ------------------------------------ //
// Headroom
// -------------------------------------//
var headroomInit = function() {
	var header = $('#appheader');
	var headerHeight = header.innerHeight();
	header.headroom({
		// vertical offset in px before element is first unpinned
  	offset : headerHeight,
  	// scroll tolerance in px before state changes
  	tolerance : 0,
  	// or scroll tolerance per direction
  	tolerance : {
    	down : 0,
    	up : 0
  	},
		//scroller: $('#appcontent'),
		// css classes to apple
		"classes": {
			// when element is initialised
			"initial": "animated",
			// when scrolling up
			//"pinned": "appheader--pinned",
			"pinned": "slideInDown",
			// when scrolling down
			//"unpinned": "appheader--unpinned",
			"unpinned": "slideOutUp",
			// when above offset
      top : "appheader--top",
      // when below offset
      notTop : "appheader--not-top"
		}
	});
	// to destroy
	$("#header").headroom("destroy");
};

// ------------------------------------ //
// LazySizes
// -------------------------------------//

// var lazyConfig = function() {
// 	window.lazySizesConfig = window.lazySizesConfig || {};
//
// 	lazySizesConfig.loadMode = 1;
//
// 	lazySizesConfig.throttle = 600;
// 	window.addEventListener('load', function(){
// 	    lazySizesConfig.throttle = 150;
// 	});
// };

// ------------------------------------ //
// Nav Transition End
// -------------------------------------//
var navTransEnd = function() {
	var body = $('body');
	var nav = $('#appnav');
	nav.on(transEndEventName, function() {
		body.removeClass('shifting');
	});
};

// ------------------------------------ //
// Toggle Nav
// -------------------------------------//
var toggleNavigation = function() {
	var body = $('body');
	var nav = $('#appnav');
	var navLink = $('#brand, #menu a');
	var navIcon = $('#hamburgericon');
	var container = $('#appcontainer');
	var toggleNav = $('#hamburgericon');
	var brand = $('#brand');
	
	toggleNav.on('click', function() {
		body.toggleClass('shift');
		body.toggleClass('delay');
		if (body.hasClass('shift')) {
			body.addClass('delay');
		};
		body.addClass('shifting');
		nav.on(transEndEventName, function() {
			body.removeClass('shifting');
		});
	});
	
	// nav.on(transEndEventName, function() {
	// 	body.removeClass('shifting');
	// 	if (body.hasClass('delay')) {
	// 		setTimeout(function () {
	// 			body.removeClass('delay');
	// 		}, 500);
	// 	}
	// });
	
	// shiftIt.on('click', function() {
	// 	body.addClass('shifting');
	// 	setTimeout(function () {
	// 		body.toggleClass('shift');
	// 		navIcon.toggleClass('open');
	// 	}, 16);
	// 	// body.toggleClass('shift');
	// 	// navIcon.toggleClass('open');
	// 	// body.addClass('shifting');
	// });
	// container.on(transEndEventName, function() {
	// 	setTimeout(function () {
	// 		body.removeClass('shifting');
	// 	}, 500);
	// });
};

// ------------------------------------ //
// Toggle Delay
// -------------------------------------//
var toggleDelay = function() {
	var body = $('body');
	var nav = $('#appnav');
	var navLink = $('#brand, #menu a');
	
	navLink.on('click', function() {
		if (body.hasClass('shift delay')) {
			body.removeClass('shift');
			body.addClass('shifting');
			nav.on(transEndEventName, function() {
				body.removeClass('shifting');
				setTimeout(function () {
					body.removeClass('delay');
				}, 2000);
			});
		};
	});
};

// ------------------------------------ //
// Rebound Slider
// -------------------------------------//
var reboundSlider = function () {
	if ($('#wrapper').length > 0) {
		var springyCarousel = $('#wrapper').springyCarousel({
			carouselTransitionComplete: function(spring, xTranslation) {}
		});
	
		$(window).resize(function() {
			springyCarousel.recalculateSize();
			springyCarousel.layoutCaptions();
		});
	}
};

// ------------------------------------ //
// Drag Slider Images
// -------------------------------------//
var dragImage = function () {
	var slideImage = $('#slides li img');
	slideImage.attr('draggable', 'false');
	slideImage.attr('ondragstart', 'return false;');
};

// ------------------------------------ //
// Initialize smoothState
// -------------------------------------//
$(function() {
	'use strict';
	var $body = $('html, body');
	var body = $('body');
	var nav = $('#appnav');
	var loader = $('#loader');
	var header = $('#appheader');
	var navLink = $('#brand, #menu a');
	var options = {
		prefetch: true,
		prefetchOn: 'mouseover',
		cacheLength: 0,
		loadingClass: 'is-loading',
		blacklist: '.nss',
		development: false,
		// Runs before a page load has been started
		onBefore: function($currentTarget, $container) {
			
		},
		// Runs once a page load has been activated
		onStart: {
			duration: 2500, // Duration of animation
			render: function($container) {
				//$('.myinfo').addClass('fadeOut');
				// Scroll page back up
        $body.animate({scrollTop: '0px'}, 0);
				// Display loader
				setTimeout(function () {
					loader.css('display', 'block');
				}, shiftDelay + 300);
				// Add CSS animation reversing class
				$container.addClass('is-exiting');
				// Restart animation
				smoothState.restartCSSAnimations();
				// Started loader animation
				loader.css({
					'transition': 'all 400ms linear',
					'opacity': '1',
					'visibility': 'visible',
				});
			}
		},
		// Runs if the page request is still pending and the onStart animations have finished
		onProgress: {
    	duration: 0,
    	render: function ($container) {
			}
  	},
		// Run once the requested content is ready to be injected into the page and the previous animations have finished
		onReady: {
			duration: 0,
			render: function($container, $newContent) {
				// Remove CSS animation reversing class
				$container.removeClass('is-exiting');
				// End loader animation
				loader.css({
					'transition': 'all 0ms linear',
					'opacity': '0',
					'visibility': 'hidden',
				});

				// Inject the new content
				$container.html($newContent);

			}
		},
		// Runs after the new content has been injected into the page and all animations are complete
		onAfter: function($container, $newContent) {
			initPage();
			// hide loader
			loader.css('display', 'none');
		}
	},
	smoothState = $('#main').smoothState(options).data('smoothState');
});
