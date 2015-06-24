FastClick.attach(document.body);

// particlesJS.load('particles-js', 'json/particles.json', function() {
//   console.log('callback - particles.js config loaded');
// });

(function($) {
	'use strict';
	// Pretty Menu with Toggle
	var $body = $('body');
	var $bodyHeight = $body.innerHeight();
	var $icon = $('#hamburgericon');
	var $appnav = $('#appnav');
	var $menu = $('#appnav > .menu');
	var $post = $('#main.post');
	var $header = $('#appheader');
	var $postContent = $('#main.post div.content');
	$('#appnav a, .menu-button, .overlay').on('click', function() {
		var headerHeight = $header.innerHeight();
		var postOffset = $postContent.offset();
		if ($body.hasClass('shift')) {
			$body.removeClass('shift');
			$icon.removeClass('open');
			$menu.css('z-index', '0');
			window.setTimeout(function() {
				$post.removeClass('cover');
				$postContent.removeAttr('style');
			}, 400);
		} else {
			$body.addClass('shift');
			$icon.addClass('open');
			$menu.css('z-index', '1');
			$post.addClass('cover');
			$postContent.css('top', headerHeight + "px");
		}
	});
})(jQuery);

(function($) {
	'use strict';
	// spingyCarousel
	var springyCarousel = $('#wrapper').springyCarousel({
		carouselTransitionComplete: function(spring, xTranslation) {}
	});

	$(window).resize(function() {
		springyCarousel.recalculateSize();
		springyCarousel.layoutCaptions();
	});
})(jQuery);

(function($) {
	'use strict';
	var $image = $('#slides li img');
	$image.attr('draggable', 'false');
	$image.attr('ondragstart', 'return false;');
})(jQuery);

// // smoothState
// (function($) {
//   var $body = $('html, body'),
//   content = $('#main').smoothState({
//     prefetch: true,
//     pageCacheSize: 4,
//     // blacklist anything you dont want targeted
//     blacklist : '.nss',
//     development : false,
//     // Runs when a link has been activated
//     onStart: {
//         duration: 300, // Duration of our animation
//         render: function (url, $container) {
//             // toggleAnimationClass() is a public method
//             // for restarting css animations with a class
//             content.toggleAnimationClass('is-exiting');
//             // Scroll user to the top
//             $body.animate({
//                 scrollTop: 0
//             });
//         }
//     },
//     onProgress : {
//         duration: 0, // Duration of the animations, if any.
//         render: function (url, $container) {
//           $body.css('cursor', 'wait');
//           $body.find('a').css('cursor', 'wait');
//         }
//     },
//     onEnd : {
//         duration: 0, // Duration of the animations, if any.
//         render: function (url, $container, $content) {
//             $body.css('cursor', 'auto');
//             $body.find('a').css('cursor', 'auto');
//             $container.html($content);
//             // Trigger document.ready and window.load
//             $(document).ready();
//             $(window).trigger('load');
//         }
//     },
//     onAfter : function(url, $container, $content) {
//     }
//   }).data('smoothState');
//   //.data('smoothState') makes public methods available
// })(jQuery);
