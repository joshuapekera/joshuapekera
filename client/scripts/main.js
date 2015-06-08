(function($) {
    FastClick.attach(document.body);
})(jQuery);

(function ($) {
    'use strict';
    // spingyCarousel
/*
    var springyCarousel = $('#wrapper').springyCarousel({
		    carouselTransitionComplete: function(spring,xTranslation){}
	  });

    $(window).resize(function(){
		  springyCarousel.recalculateSize();
		});
*/

		// Layout Captions
		//var layoutCaptions = $('.captions').layoutCaptions();


    // Pretty Menu with Toggle
    var $content = $('body');
    var $icon = $('#hamburgericon');
    var $menu = $('#appnav > .menu');
    $('.menu-button, .overlay').on('click', function() {
        if ($content.hasClass('shift')) {
            $content.removeClass('shift');
            $icon.removeClass('open');
            $menu.css('z-index','-1');
        } else {
            $content.addClass('shift');
            $icon.addClass('open');
            $menu.css('z-index', '1');
        }
    });
})(jQuery);

(function ($) {
	'use strict';
  var $image = $('#slides li img');
	$image.attr('draggable','false');
	$image.attr('ondragstart','return false;');
})(jQuery);

// smoothState
(function ($) {
  'use strict';
  var $body    = $('html, body'),
      content  = $('#appcontent').smoothState({
        prefetch: true,
        development: true,
        pageCacheSize: 4,
        onStart: {
            duration: 250,
            render: function (url, $container) {
              content.toggleAnimationClass('is-exiting');
              $body.animate({
                  scrollTop: 0
              });
            }
        },
        onProgress : {
            duration: 0, // Duration of the animations, if any.
            render: function (url, $container) {
              $body.css('cursor', 'wait');
              $body.find('a').css('cursor', 'wait');
            }
        },
        onEnd : {
            duration: 0, // Duration of the animations, if any.
            render: function (url, $container, $content) {
              $body.css('cursor', 'auto');
              $body.find('a').css('cursor', 'auto');
              $container.html($content);
            }
        },
        callback : function(url, $container, $content) {
          $.readyFn.execute();
        }

    }).data('smoothState');
})(jQuery);

