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
	FastClick.attach(document.body);
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
		transitionStart = 'webkitTransitionStart otransitionstart oTransitionStart msTransitionStart transitionstart',
		transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		fadeInUp = 'animated fadeInUp';
		
		shiftIt.on('click', function() {
			body.toggleClass('shift');
			navIcon.toggleClass('open');
			
			// function(){
      //     $(this).removeClass(fadeInUp).css({});
      // });
			
			content.one(transitionStart, function() {
				body.addClass('shifting');
			});
			
			content.one(transitionEnd, function() {
				body.removeClass('shifting');
			})
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
		//springyCarousel.resetCurrentPage();
	
		$(window).resize(function() {
			springyCarousel.recalculateSize();
			springyCarousel.layoutCaptions();
		});
	}
	
// 	var springyCarousel = $('#wrapper').springyCarousel({
// 		carouselTransitionComplete: function(spring, xTranslation) {}
// 	});
//
// 	$(window).resize(function() {
// 		springyCarousel.recalculateSize();
// 		springyCarousel.layoutCaptions();
// 	});
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
	var $body = $('html, body'),
		content = $('#main').smoothState({
			prefetch: true,
			pageCacheSize: 8,
			loadingClass: 'loading',
			// blacklist anything you dont want targeted
			blacklist: '.nss',
			development: false,
			/** Run before a page load has been activated */
			onBefore: function($currentTarget, $container) {

			},

			/** Run when a page load has been activated */
			onStart: {
				duration: 600,
				render: function($container) {
					// toggleAnimationClass() is a public method
					// for restarting css animations with a class
					//$container.addClass('is-existing');
					//smoothState.restartCSSAnimations();
					// Scroll user to the top
					// $body.animate({
					// 	scrollTop: 0
					// });
				}
			},

			/** Run if the page request is still pending and onStart has finished animating */
			onProgress: {
				duration: 0,
				render: function($container) {}
			},

			/** Run when requested content is ready to be injected into the page  */
			onReady: {
				duration: 0,
				render: function($container, $newContent) {
					$body.css('cursor', 'auto');
					$body.find('a').css('cursor', 'auto');
					// Remove your CSS animation reversing class
					//$container.removeClass('is-exiting');
					$container.html($newContent);
					// Trigger document.ready and window.load
					$(document).ready();
					//$(window).trigger('load');
				}
			},

			/** Run when content has been injected and all animations are complete  */
			onAfter: function($container, $newContent) {
				initPage();
			}

		}).data('smoothState');
	//.data('smoothState') makes public methods available
})(jQuery);
