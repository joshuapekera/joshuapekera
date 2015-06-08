;(function($) {
    //'use strict';
    $.fn.layoutCaptions = function(options) {
        // Establish our default settings
        var settings = $.extend({
            imageWidth: 0,
            imageHeight: 0,
            // Distance between the center of the image and its optical right edge in
            // the coordinate system of the native image resolution
            rightEdge: 0,
            bottomEdge: 0,
            // Padding added to the bottom in the coordinate system of the slide divs
            applyBottomPadding: false,
            slideItems: $('#slides li'),
            captionItem: $('.caption')
        }, options);
        this.each(function() {
            // Get Background Image Dimensions
            getImage(function(callback) {
                //if (typeof callback !== 'function') return;
                var regexp = /url\((.+)\)/i,
                    regexp2 = /["']/gi,
                    res = regexp.exec($(this).css('background-image')),
                    img_src = res[1].replace(regexp2, ''),
                    $tempImg = $('<img />');
                $tempImg.hide();
                $tempImg.bind('load', function(e) {
                    callback.call(this, e);
                    $tempImg.width() return imageWidth;
                    $tempImg.height() return imageHeight;
                    $tempImg.remove();
                });
                $('body').append($tempImg);
                $tempImg.attr('src', img_src);
            });
            // Determine the scale factor
            calculateScale(function() {
                var contentWidth = imageWidth;
                var contentHeight = imageHeight;
                var scale = ((viewportWidth / viewportHeight) > (contentWidth / contentHeight)) ? (viewportHeight / contentHeight) : (viewportWidth / contentWidth);
                return scale;
            });
            layoutOut(function() {
                var scale = calculateScale();
                var x = (viewportWidth / 2.0) + rightEdge * scale;
                var y = ((viewportHeight / 2.0) - (bottomEdge * scale)) * -1;
                var leftPadding = parseInt($(val).css('padding-left'), 10);
                if (applyBottomPadding) {
                    y -= leftPadding;
                }
                x = Math.round(x);
                y = Math.round(y);
                val.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
                val.style.MozTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
                captionItem.style.visibility = 'visible';
            });
        });
    }(jQuery));
