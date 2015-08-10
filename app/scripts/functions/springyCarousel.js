/*!
 * A jQuery plugin that impliments a rebound.js slider.
 * Original author: @joshuapekera
 * Contributor: @bwalkin
 * Inspired by Brandon Walkin's implimention of rebound.js on brandonwalkin.com
 * Licensed under the MIT license
 */
 
;(function($, window, document, undefined) {
	//'use strict';
	var inputEvents = {},
		funcs = {},
		utils = {},
		springs = {},
		springSystem = new rebound.SpringSystem();
	//general globals
	var springyCarouselGlobals = {
		navigation: {
			nav: null,
			navItems: [],
			navOffsets: [],
			navItemWidths: [],
			navItemWidthsRunningSum: [],
			downIndex: 0
		},
		carousel: {
			currentPage: 0
		},
		dragging: {
			isDragging: false
		},
		viewport: {
			viewportWidth: 0,
			viewportHeight: 0
		},
		captions: {
			captionItems: []
		},
		imageSize: {
			imageWidth: [1080, 1080, 1200, 1080, 2400],
			imageHeight: [1920, 1920, 1800, 1920, 1536],
			rightEdge: [400, 400, 490, 400, 812],
			bottomEdge: [641, 641, 480, 641, 545],
			bottomPadding: [false, false, false, false, false],
		},
		springs: {
			mainSpring: springSystem.createSpring(),
			navigationSpring: springSystem.createSpring()
		}
	};
  
	jQuery.fn.springyCarousel = function(options) {
		var defaults = {
			carouselWrapperSelector: '#wrapper',
			slidesSelector: '#slides li',
			navigationSlider: '#nav',
			captionSelector: '.caption',
			captions: {
				show: true
			},
			navigation: {
				keys: false,
				drag: true
			},
			frictionAndTension: {
				navigation: {
					friction: 5.5,
					tension: 100
				},
				carousel: {
					friction: 5.7,
					tension: 4.5
				}
			},
			carouselTransitionComplete: null
		};
		var settings = $.extend({}, defaults, options);
		var $navigationItems = null;
		springyCarouselGlobals.viewport.viewportWidth = $(settings.carouselWrapperSelector).innerWidth();
		springyCarouselGlobals.viewport.viewportHeight = $(settings.slidesSelector).innerHeight();
		springyCarouselGlobals.navigation.nav = document.getElementById(settings.navigationSlider.replace('#', ''));
		
    //set width for slider nav
		$navigationItems = $(settings.navigationSlider).children('li');
		var navigationSliderTotalWidth = funcs.calculateNavWidth($navigationItems);
		$(settings.navigationSlider).width(navigationSliderTotalWidth);
		
    $navigationItems.each(function(i, val) {
			springyCarouselGlobals.navigation.navOffsets[i] = funcs.navOffsetForIndex(i);
			springyCarouselGlobals.navigation.navItems[i] = val;
		});
		
    //set values to layout captions
		var captions = $(settings.captionSelector);
		captions.each(function(i, val) {
			springyCarouselGlobals.captions.captionItems[i] = val;
		});

		springs.setupMainSpring(settings.frictionAndTension.carousel.friction, settings.frictionAndTension.carousel.tension,
			function(xTranslation, progress, spring) {
				springyCarouselGlobals.navigation.nav.style.webkitTransform = 'translate3d(' + xTranslation + 'px, 0, 0)';
				springyCarouselGlobals.navigation.nav.style.MozTransform = 'translate3d(' + xTranslation + 'px, 0, 0)';
				// Other transitions
				$(settings.slidesSelector).each(function(i, val) {
					var slideProgress = 1 - Math.abs(progress - i);
					// Slide and scale the images
					if (slideProgress > 0) { // Only bother if the slide is visible
						// Slide and scale
						var x = (i * springyCarouselGlobals.viewport.viewportWidth) - (progress * springyCarouselGlobals.viewport.viewportWidth);
						var scale = springs.transitionForProgressInRange(slideProgress, 0.6, 1.0);
						val.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0) scale(' + scale + ')';
						val.style.MozTransform = 'translate3d(' + x + 'px, 0, 0) scale(' + scale + ')';
						// Fade in the caption when nearing rest
						if (i < captions.length) {
							var captionOpacity = springs.transitionForProgressInRange(slideProgress, -8.0, 1.0);
							captions[i].style.opacity = captionOpacity;
						}
					}
					// Hide the off-screen images so they don't reveal themselves if you resize the browser
					val.style.opacity = (slideProgress > 0) ? 1.0 : 0.0;
					// Show the current tab as black, others grey
					var tabOpacity = springs.transitionForProgressInRange(utils.clampedProgress(slideProgress), 0.2, 1, 0);
					springyCarouselGlobals.navigation.navItems[i].style.opacity = tabOpacity;
					if (progress.toString().split('.').length === 1 && settings.carouselTransitionComplete) {
						settings.carouselTransitionComplete(spring, xTranslation);
					}
				});
			});
		springs.setupNavigationSpring(settings.frictionAndTension.navigation.friction, settings.frictionAndTension.navigation.tension);
		$(settings.slidesSelector).each(function(i, val) {
			val.style.webkitTransform = 'translate3d(' + springyCarouselGlobals.viewport.viewportWidth * i + 'px, 0, 0)';
			val.style.MozTransform = 'translate3d(' + springyCarouselGlobals.viewport.viewportWidth * i + 'px, 0, 0)';
			slides[i] = val;
		});
		// Select the first tab
		funcs.selectTabIndex(0, false);
		// Setup the supported navigation methods
		if (settings.navigation.keys) {
			inputEvents.addArrowKeySupport();
		}
		if (settings.navigation.drag) {
			inputEvents.addDragSupport($(settings.slidesSelector).parent()[0]);
		}
		// Behavior when the springyCarouselGlobals.navigation.navItems are clicked
		$(settings.navigationSlider).children('li').each(function(i, val) {
			$(val).click(function() {
				funcs.selectTabIndex(i, true);
			});
			$(val).mousedown(function() {
				springyCarouselGlobals.navigation.downIndex = $(this).index();
				springyCarouselGlobals.springs.navigationSpring.setEndValue(1);
			});
			$(val).mouseup(function() {
				springyCarouselGlobals.springs.navigationSpring.setEndValue(0);
			});
		});
		//Show captions
		$(settings.captionSelector).each(function(i) {
			if (settings.captions.show) {
				funcs.layoutCaptions(i, true);
			}
		});
		//declare public methods
		this.layoutCaptions = funcs.layoutCaptions;
		this.recalculateSize = funcs.recalculateSize;
		this.goToPage = funcs.selectTabIndex;
    this.resetCurrentPage = funcs.resetCurrentPage;
		return this;
	};
	utils.clampedProgress = function(progress) {
		if (progress < 0) {
			progress = 0;
		} else if (progress > 1) {
			progress = 1;
		}
		return progress;
	};
	funcs.recalculateSize = function() {
		springyCarouselGlobals.viewport.viewportWidth = $('#wrapper').innerWidth();
		springyCarouselGlobals.viewport.viewportHeight = $('#slides li').innerHeight();
	};
	funcs.calculateNavWidth = function($navigationItems) {
		var totalWidth = 0;
		$navigationItems.each(function(i, val) {
			springyCarouselGlobals.navigation.navItemWidths[i] = $(val).innerWidth();
			springyCarouselGlobals.navigation.navItemWidthsRunningSum[i] = springyCarouselGlobals.navigation.navItemWidths[i];
			if (i > 0) {
				springyCarouselGlobals.navigation.navItemWidthsRunningSum[i] = springyCarouselGlobals.navigation.navItemWidthsRunningSum[i] + springyCarouselGlobals.navigation.navItemWidthsRunningSum[i - 1];
			}
			totalWidth += springyCarouselGlobals.navigation.navItemWidths[i];
		});
		return totalWidth;
	};
	funcs.navOffsetForIndex = function(i) {
		var offset = 0;
		if (i > 0) {
			offset = (springyCarouselGlobals.navigation.navItemWidthsRunningSum[i - 1] + (springyCarouselGlobals.navigation.navItemWidths[i] / 2.0)) * -1;
		} else {
			offset = ((springyCarouselGlobals.navigation.navItemWidths[i] / 2.0)) * -1;
		}
		return offset;
	};
  funcs.selectTabIndex = function(i, animated) {
		if (i < 0) {
			i = 0;
		} else if (i > springyCarouselGlobals.navigation.navItems.length - 1) {
			i = springyCarouselGlobals.navigation.navItems.length - 1;
		}
		if (animated) {
			springyCarouselGlobals.viewport.viewportWidth = $('#wrapper').innerWidth();
			springyCarouselGlobals.carousel.currentPage = i;
			springyCarouselGlobals.springs.mainSpring.setEndValue(i);
		} else {
			springyCarouselGlobals.springs.mainSpring.setCurrentValue(i);
		}
	};
  funcs.resetCurrentPage = function() {
    springyCarouselGlobals.carousel.currentPage = 0;
  }
	funcs.layoutCaptions = function() {
		// Distance between the center of the image and its optical right edge in the coordinate system of the native image resolution
		var rightEdges = springyCarouselGlobals.imageSize.rightEdge;
		var bottomEdges = springyCarouselGlobals.imageSize.bottomEdge;
		var bottomPadding = springyCarouselGlobals.imageSize.bottomPadding;
		var captions = springyCarouselGlobals.captions.captionItems;
		//var $slides = $.fn.springyCarousel.defaults.slidesSelector;
		// Padding added to the bottom in the coordinate system of the slide divs
		var applyBottomPadding = bottomPadding;
		var slideItems = $('#slides li');
		var viewportWidth = slideItems.innerWidth();
		var viewportHeight = slideItems.innerHeight();
		$('.caption').each(function(i, val) {
			captions[i] = val;
			var scale = funcs.calculateContentScaleForIndex(i);
			var x = (viewportWidth / 2.0) + rightEdges[i] * scale;
			var y = ((viewportHeight / 2.0) - (bottomEdges[i] * scale)) * -1;
			var leftPadding = parseInt($(val).css('padding-left'), 10);
			if (applyBottomPadding[i]) {
				y -= leftPadding;
			}
			x = Math.round(x);
			y = Math.round(y);
			val.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
			val.style.MozTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
			captions[i].style.visibility = 'visible';
		});
	};
	funcs.calculateContentScaleForIndex = function(i) {
		var contentWidth = springyCarouselGlobals.imageSize.imageWidth[i];
		var contentHeight = springyCarouselGlobals.imageSize.imageHeight[i];
		var viewportWidth = springyCarouselGlobals.viewport.viewportWidth;
		var viewportHeight = springyCarouselGlobals.viewport.viewportHeight;
		var scale = ((viewportWidth / viewportHeight) > (contentWidth / contentHeight)) ? (viewportHeight / contentHeight) : (viewportWidth / contentWidth);
		return scale;
	};
	inputEvents.addArrowKeySupport = function() {
		var initialPress = true;
		var isRubberbanding = false;
		$(document).keydown(function(e) {
			var currentIndex = springyCarouselGlobals.carousel.currentPage;
			var positionTolerance = 0.001;
			var maxRubberbandDistance = 0.03; // Normalized
			var inRubberbandableRegion = 0;
			if (e.keyCode === 37) { // Left arrow key
				inRubberbandableRegion = springyCarouselGlobals.springs.mainSpring.getCurrentValue() < positionTolerance;
				if (inRubberbandableRegion && initialPress) {
					isRubberbanding = true;
					springyCarouselGlobals.springs.mainSpring.setEndValue(springyCarouselGlobals.springs.mainSpring.getCurrentValue() - maxRubberbandDistance);
				} else if (!inRubberbandableRegion) {
					isRubberbanding = false;
					funcs.selectTabIndex(currentIndex - 1, true);
				}
			} else if (e.keyCode === 39) { // Right arrow key
				inRubberbandableRegion = springyCarouselGlobals.springs.mainSpring.getCurrentValue() > ((springyCarouselGlobals.navigation.navItems.length - 1) - positionTolerance);
				if (inRubberbandableRegion && initialPress) {
					isRubberbanding = true;
					springyCarouselGlobals.springs.mainSpring.setEndValue(springyCarouselGlobals.springs.mainSpring.getCurrentValue() + maxRubberbandDistance);
				} else if (!inRubberbandableRegion) {
					isRubberbanding = false;
					funcs.selectTabIndex(currentIndex + 1, true);
				}
			}
			initialPress = false;
		});
		// When rubberbanding, snap back to the correct rest value on key up
		$(document).keyup(function(e) {
			var currentIndex = springyCarouselGlobals.carousel.currentPage;
			if (e.keyCode === 37 && isRubberbanding) { // Left arrow key
				funcs.selectTabIndex(currentIndex - 1, true);
			} else if (e.keyCode === 39 && isRubberbanding) { // Right arrow key
				funcs.selectTabIndex(currentIndex + 1, true);
			}
			isRubberBanding = false;
			initialPress = true;
		});
	};
	inputEvents.addDragSupport = function(item) {
		item.addEventListener('touchstart', function(e) {
			var touch = e.touches[0];
			startDragging(touch.pageX);
		}, false);
		item.addEventListener('touchmove', function(e) {
			e.preventDefault(); // Stop vertical rubberbanding on iOS
			var touch = e.touches[0];
			continueDragging(touch.pageX);
		}, false);
		item.addEventListener('touchend', function(e) {
			endDragging();
		}, false);
		item.addEventListener('touchcancel', function(e) {
			endDragging();
		}, false);
		item.addEventListener('mousedown', function(e) {
			startDragging(e.clientX);
		}, false);
		item.addEventListener('mousemove', function(e) {
			if (springyCarouselGlobals.dragging.isDragging) {
				continueDragging(e.clientX);
			}
		}, false);
		item.addEventListener('mouseup', function(e) {
			endDragging();
		}, false);
		item.addEventListener('mouseleave', function(e) {
			if (springyCarouselGlobals.dragging.isDragging) {
				endDragging();
			}
		}, false);
	};
	startDragging = function(x) {
		lastX = x;
		springyCarouselGlobals.dragging.isDragging = true;
		springyCarouselGlobals.viewport.viewportWidth = $('#wrapper').innerWidth();
		springyCarouselGlobals.springs.mainSpring.setAtRest();
		$('body').addClass('dragging');
	};
	continueDragging = function(x) {
		panVelocity = x - lastX;
		lastX = x;
		var progress = springs.progressForValueInRange(panVelocity, 0, -springyCarouselGlobals.viewport.viewportWidth);
		var currentValue = springyCarouselGlobals.springs.mainSpring.getCurrentValue();
		// Rubberband when beyond the scroll boundaries
		if ((currentValue + progress) < 0 || (currentValue + progress) > springyCarouselGlobals.navigation.navItems.length - 1) {
			progress *= 0.5;
		}
		springyCarouselGlobals.springs.mainSpring.setCurrentValue(currentValue + progress);
		springyCarouselGlobals.springs.mainSpring.setAtRest();
	};
	endDragging = function() {
		var currentPosition = springyCarouselGlobals.springs.mainSpring.getCurrentValue();
		var restPosition = springyCarouselGlobals.carousel.currentPage;
		var passedVelocityTolerance = (Math.abs(panVelocity) > 3);
		var passedDistanceTolerance = Math.abs(currentPosition - restPosition) > 0.3;
		var shouldAdvance = passedDistanceTolerance || passedVelocityTolerance;
		var advanceForward = (panVelocity <= 0);
		if (shouldAdvance) {
			var targetIndex = advanceForward ? restPosition + 1 : restPosition - 1;
			funcs.selectTabIndex(targetIndex, true);
		} else {
			funcs.selectTabIndex(restPosition, true);
		}
		var normalizedVelocity = springs.progressForValueInRange(panVelocity, 0, -springyCarouselGlobals.viewport.viewportWidth);
		springyCarouselGlobals.springs.mainSpring.setVelocity(normalizedVelocity * 30);
		panVelocity = 0;
		springyCarouselGlobals.dragging.isDragging = false;
    $('body').removeClass('dragging');
	};
	springs.setupMainSpring = function(friction, tension, callback) {
		springyCarouselGlobals.springs.mainSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(tension, friction));
		springyCarouselGlobals.springs.mainSpring.addListener({
			onSpringUpdate: function(spring) {
				// Progress from 0 to n
				var progress = spring.getCurrentValue();
				// Slide the springyCarouselGlobals.navigation.navItems over
				var xTranslation = springs.transitionForProgressInSteps(progress, springyCarouselGlobals.navigation.navOffsets);
				// Pixel snap when the spring is nearing rest on non-retina displays
				if (Math.abs(spring.getVelocity()) < 0.05 && window.devicePixelRatio < 1.1) {
					xTranslation = Math.floor(xTranslation);
				}
				callback(xTranslation, progress, spring);
			}
		});
	};
	springs.setupNavigationSpring = function(friction, tension) {
		springyCarouselGlobals.springs.navigationSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(tension, friction));
		springyCarouselGlobals.springs.navigationSpring.addListener({
			onSpringUpdate: function(spring) {
				var progress = spring.getCurrentValue();
				var scale = springs.transitionForProgressInRange(progress, 1.0, 0.92);
				springyCarouselGlobals.navigation.navItems[springyCarouselGlobals.navigation.downIndex].style.webkitTransform = 'scale(' + scale + ')';
				springyCarouselGlobals.navigation.navItems[springyCarouselGlobals.navigation.downIndex].style.MozTransform = 'scale(' + scale + ')';
			}
		});
	};
  
	springs.transitionForProgressInSteps = function(progress, steps) {
		var transition = -1;
		// Bail if there's fewer than two steps
		if (steps.length < 2) {
			return transition;
		}
		// If the progress is before the beginning of the range, extrapolate from the first and second steps.
		if (progress < 0) {
			transition = springs.transitionForProgressInRange(progress, steps[0], steps[1]);
		}
		// If the progress is after the end of the range, extrapolate from the second last and last steps.
		else if (progress > (steps.length - 1)) {
			normalizedProgress = springs.progressForValueInRange(progress, Math.floor(progress), Math.floor(progress) + 1);
			normalizedProgress = normalizedProgress + 1;
			transition = springs.transitionForProgressInRange(normalizedProgress, steps[(steps.length - 2)], steps[(steps.length - 1)]);
		}
		// Supress potential NaNs
		else if (progress === (steps.length - 1) || progress === 0) {
			transition = steps[progress];
		}
		// Otherwise interpolate between steps
		else {
			normalizedProgress = springs.progressForValueInRange(progress, Math.floor(progress), Math.floor(progress) + 1);
			transition = springs.transitionForProgressInRange(normalizedProgress, steps[Math.floor(progress)], steps[Math.floor(progress) + 1]);
		}
		return transition;
	};
	springs.transitionForProgressInRange = function(progress, startValue, endValue) {
		return startValue + (progress * (endValue - startValue));
	};
	springs.progressForValueInRange = function(value, startValue, endValue) {
		return (value - startValue) / (endValue - startValue);
	};
})(jQuery, window, document);
