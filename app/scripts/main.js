$(document).ready(function(){
	//'use strict';
	initPage();
});
// ------------------------------------ //
// Variables
// -------------------------------------//

var site = {};
var panVelocity = 0;

// ------------------------------------ //
// Functions
// -------------------------------------//
// WOW config
var wow = new WOW(
	{
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
			// the callback is fired every time an animation is started
			// the argument that is passed in is the DOM node being animated
		}
	}
);
wow.init();
// ------------------------------------ //
// Initialize Page
// -------------------------------------//

var initPage = function(){
	//FastClick.attach(document.body);
	//lazyConfig();
	toggleNavigation();
	reboundSlider();
	dragImage();
};


// ------------------------------------ //
// Animate Elements
// -------------------------------------//
var animateItems = function() {
	
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
// Toggle Nav
// -------------------------------------//
var toggleNavigation = function() {
	var body = $('body'),
		content = $('#appcontainer'),
		navIcon = $('#hamburgericon'),
		footer = $('#page-footer'),
		shiftIt = $('#appnav a, .menu-button, .overlay'),
		transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
		
	shiftIt.on('click', function() {
		body.toggleClass('shift');
		navIcon.toggleClass('open');
		body.addClass('shifting');
	});
	content.on(transitionEnd, function() {
		body.removeClass('shifting');
	})
};

// ------------------------------------ //
// Close Nav
// -------------------------------------//
var closeNav = function () {
	var body = $('body');
	var navLink = $('#appnav a');
	navLink.on('click', function(){
		if (body.hasClass('shift')) {
			removeClass('shift');
		}
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
	var options = {
		prefetch: true,
		cacheLength: 0,
		loadingClass: 'is-loading',
		blacklist: '.nss',
		development: false,
		// Runs before a page load has been started
		onBefore: function($currentTarget, $container) {
			// Unhide Loader
			$('#loader').css('display', 'block');
		},
		// Runs once a page load has been activated
		onStart: {
			duration: 2000, // Duration of animation
			render: function($container) {
				//$('.myinfo').addClass('fadeOut');
				// Add CSS animation reversing class
				$container.addClass('is-exiting');
				// Restart animation
				smoothState.restartCSSAnimations();
				// Started loader animation
				//$('#loader').css('display', 'block');
				$('#loader').css({
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
				$('#loader').css({
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
			$('#loader').css('display', 'none');
		}
	},
	smoothState = $('#main').smoothState(options).data('smoothState');
});
