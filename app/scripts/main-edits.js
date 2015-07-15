(document).ready(function(){
	initPage();
});

// ------------------------------------ //
// Variables
// -------------------------------------//

var site = {};
//site.transitionSpeed = 200;
//site.mobileBreakPoint = 535;
//var windowHeight = $(window).height();
//var windowWidth = $(window).width();

// ------------------------------------ //
// Functions
// -------------------------------------//

// ------------------------------------ //
// Initialize Page
// -------------------------------------//

var initPage = function(){
	FastClick.attach(document.body);
	toggleNavigation();
	reboundSlider();
	dragImage();
}

// ------------------------------------ //
// Off Canvas Nav
// -------------------------------------//
var toggleNavigation = function() {
	var body = $('body');
	var navIcon = $('#hamburgericon');
	var shiftIt = $('#appnav a, .menu-button, .overlay');
	shiftIt.on('click', function() {
		if (body.hasClass('shift')) {
			body.removeClass('shift');
			navIcon.removeClass('open');
		} else {
			body.addClass('shift');
			navIcon.addClass('open');
		}
	})
};

// ------------------------------------ //
// Rebound Slider
// -------------------------------------//
var reboundSlider = function () {
	
	$('#wrapper').springyCarousel({
		carouselTransitionComplete: function(spring, xTranslation) {}
	});
	
	$(window).resize(function() {
		springyCarousel.recalculateSize();
		springyCarousel.layoutCaptions();
	});
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

;(function($) {
	'use strict';

	var $body = $('html, body'),
		animationDuration = 600,
			content = $('#main').smoothState({
				prefetch: true,
				blacklist : ".no-smoothstate, .no-smoothstate a, [target]",
				pageCacheSize: 0,
				development: false,
				// Runs when a link has been clicked
				onClick: function(event){
				  var $anchor = $(event.currentTarget);
				  // 1. Check if link has a explicit page transition value (data-pt)
				  var pageTransition = $anchor.data('pt');
				  if(pageTransition){
					// Update data-pt to body
					$('body').attr('data-pt', pageTransition);
				  }
				},
				// Runs when a link has been activated
				onStart: {
					duration: 600,
					render: function (url, $container) {

						// for restarting css animations with a class
						content.toggleAnimationClass('is-exiting');
						// Scroll user to the top
						$body.animate({
							scrollTop: 0
						});
					}
				},
				/** Run when requested content is ready to be injected into the page  */
				onEnd : {
					duration: 0,
					render: function (url, $container, $content) {
						$body.css('cursor', 'auto');
						$body.find('a').css('cursor', 'auto');
						$container.html($content);
						$('#main').removeClass('is-exiting');

						initPage();
					}
				}

			}).data('smoothState');
			//.data('smoothState') makes public methods available
})(jQuery);
