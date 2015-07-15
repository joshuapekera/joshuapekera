$(document).ready(function(){
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

// ------------------------------------ //
// Initialize Page
// -------------------------------------//

var initPage = function(){
	//FastClick.attach(document.body);
	toggleNavigation();
	reboundSlider();
	dragImage();
}

// ------------------------------------ //
// Off Canvas Nav
// -------------------------------------//
var toggleNavigation = function() {
	var body = $('body'),
		content = $('#appcontainer'),
		navIcon = $('#hamburgericon'),
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
		cacheLength: 2,
		loadingClass: 'is-loading',
		blacklist: '.nss',
		//loadingClass: 'loading',
		development: false,
		onBefore: function($currentTarget, $container) {
			
		},
		onStart: {
			duration: 600, // Duration of animation
			render: function($container) {
				// Add CSS animation reversing class
				$container.addClass('is-exiting');
				// Restart animation
				smoothState.restartCSSAnimations();
			}
		},
		onProgress: {
    	duration: 0,
    	render: function ($container) {
				
			}
  	},
		onReady: {
			duration: 0,
			render: function($container, $newContent) {
				// Remove CSS animation reversing class
				$container.removeClass('is-exiting');

				// Inject the new content
				$container.html($newContent);

			}
		},
		onAfter: function($container, $newContent) {
			initPage();
		}
	},
	smoothState = $('#main').smoothState(options).data('smoothState');
});
