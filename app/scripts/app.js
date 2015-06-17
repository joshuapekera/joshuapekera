$(document).ready(function(){
	initPage();
});

// ------------------------------------ //
// Variables
// -------------------------------------//

var site = {};
site.transitionSpeed = 200;
site.mobileBreakPoint = 535;
var windowHeight = $(window).height();
var windowWidth = $(window).width();

// ------------------------------------ //
// Functions
// -------------------------------------//

// ------------------------------------ //
// Initialize Page
// -------------------------------------//

var initPage = function(){
	toggleHelpGrid();
	toggleNavigation();
	initBindings();
	// navigationControl();
	// initFLoatingMenu();
	loadSocialLinks();
}

// ------------------------------------ //
// Load Social Links
// -------------------------------------//

var loadSocialLinks = function(){
	if(typeof twttr !== 'undefined'){
		twttr.widgets.load();
	}
	if(typeof FB !== 'undefined'){
		FB.XFBML.parse();
	}
	if(typeof gapi !== 'undefined'){
		gapi.plusone.render('googleplus', {"size": "medium", "annotation": "none"});
	}
};

// ------------------------------------ //
// Toggle Help Grid
// -------------------------------------//

var toggleHelpGrid = function(){

	$(document).off('click', '.toggle-help-grid'); // UNBIND ALL EVENTS
	$(document).on('click', '.toggle-help-grid', function(e){
		var helpGrid = $('body').attr('data-helpgrid');
		if(!helpGrid || helpGrid == 'hide'){
			$('body').attr('data-helpgrid', 'show');
		}else{
			$('body').attr('data-helpgrid', 'hide');
		}
	});

};

// ------------------------------------ //
// Toggle Navigation
// -------------------------------------//
var toggleNavigation = function(){

	$(document).off('click', '.toggle-navigation'); // UNBIND ALL EVENTS
	$(document).on('click', '.toggle-navigation', function(e){
		e.preventDefault();
		var showNavigation = !$('body').hasClass('navigation-true');
		$navigation = $('.navigation.navigation--primary');
		$items = $('.navigation.navigation--primary li');
		if(showNavigation){
			$('body').addClass('navigation-true');
			TweenMax.to([$navigation], 0.2, {autoAlpha: 1});
			TweenMax.staggerFrom('.navigation--primary li.menu-item', 0.5, {opacity: 0, y: 20, delay: .1, ease:Back.easeInOut}, 0.1);
		}else{
			$('body').removeClass('navigation-true');
			TweenMax.to([$navigation], 0.3, {autoAlpha: 0});
		}

	});

};

// ------------------------------------ //
// Navigation Control
// -------------------------------------//

var navigationBar = function($element){
	var $body = $('body');
	var $navigation = $('.navigation--primary');
	var $active_bar = $('.active_bar');
	if(!$active_bar.length){
			$('body').append('<div class="active_bar">');
			$active_bar = $('.active_bar');
	}

	// check if not element provided
	if(!$element){
		var $element = $('.navigation--primary .current-menu-item a');
		if(!$element.length){
			return;
		}
	}

	var bar_width = $element.outerWidth(true);
	var left_pos = $element.offset().left;
	// console.log('bar_width: ' + bar_width);
	// console.log('left_pos: ' + left_pos);
	$active_bar.css('left', left_pos);
	$active_bar.css('width', bar_width);
}

var navigationControl = function(){
	navigationBar();

	$(document).off('mouseenter', '.navigation--primary .menu-item a'); // UNBIND ALL EVENTS
	$(document).on('mouseenter', '.navigation--primary .menu-item a', function(e){
		e.preventDefault();
		navigationBar($(this));
	});
	$(document).off('mouseleave', '.navigation--primary .menu-item a'); // UNBIND ALL EVENTS
	$(document).on('mouseleave', '.navigation--primary .menu-item a', function(e){
		e.preventDefault();
		navigationBar();
	});
}

// ------------------------------------ //
// The one and only floating/modal menu on every page.
// -------------------------------------//

var initFLoatingMenu = function(){

(function($) {
  'use strict';

  var $header = $('.header'),
	  $body = $('body'),
	  didScroll = false,
	  isFloating = true,
	  oldY = 0,
	  CSS_ANIMATE_IN_CLASS = 'header--animate-in',
	  CSS_ANIMATE_OUT_CLASS = 'header--animate-out';

  function scrollY() {
	return $(window).scrollTop();
  }

  // function onTransitionEnd($el, callback, fallbackDuration) {
  //  if ($.support.transition && $.support.transition.end) {
  //    $el.one($.support.transition.end, callback).emulateTransitionEnd(fallbackDuration);
  //  }
  //  else {
  //    setTimeout(callback, fallbackDuration);
  //  }
  // }

  function scrollPage() {
	var sy = scrollY(),
		atBottom = sy + 100 + $(window).outerHeight() >= $(document).outerHeight();

	if (isFloating && sy > 0 && sy > oldY && !atBottom) {  // scrolling down - hide floating header
	  $header.removeClass(CSS_ANIMATE_IN_CLASS);
	  $header.addClass(CSS_ANIMATE_OUT_CLASS);
	  $body.removeClass('navigation--primary-show');
	  isFloating = false;
	}
	else if (!isFloating && (sy < oldY || sy < 0 || atBottom)) { // scroll up - show floating header if below first section

	  $header.removeClass(CSS_ANIMATE_OUT_CLASS);
	  $header.addClass(CSS_ANIMATE_IN_CLASS);
	  $body.addClass('navigation--primary-show');
	  isFloating = true;
	}

	console.log(isFloating);
	if(sy > 100){
		$('body').addClass('scroll-passed');
	}else{
		$('body').removeClass('scroll-passed');
	}

	oldY = sy;
	didScroll = false;
  }

  function initFloatingHeader() {
	oldY = scrollY();
	$(window).on('scroll', function() {
	  if(!didScroll) {
		didScroll = true;
		setTimeout(scrollPage, 250);
	  }
	});
	scrollPage();
  }

  function init() {
	initFloatingHeader();
  }

  init();

})(jQuery);
}


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

// ------------------------------------ //
// Bindings
// -------------------------------------//

var initBindings = function(){

	var $container = $(".main .container"),
		count = 2,
		pages = $('.load_more_wrapper').data('pages');

	$(document).off('click', '.load_more_button a'); // UNBIND ALL EVENTS
	$(document).on('click', '.load_more_button a', function(e){
		e.preventDefault();
		if (pages >= count ) {
			$.ajax({
			  url: ajaxUrl,
			  type: "POST",
			  data: "action=infinite_scroll&page=" + count++ + "&template=content-loop",
			}).success(function(posts, b, c, d) {
			  $container.append(posts);
			}).complete(function() {
				// Complete
			});
		}else{
			$('body').addClass('reached_infinity');
			console.log('no more posts');
		}

	});

};
