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
	var globals = {
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
    panVelocity: 0,
    lastX: 0,
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
  
  // if (rebound.Spring._ID > 0) {
  //   var mainId = $('#wrapper').rebound.SpringSystem.getId();
  //   //var navId = globals.springs.navigationSpring.getId();
  //   console.log(mainId);
  //   //console.log(navId);
  // }
  
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
		globals.viewport.viewportWidth = $(settings.carouselWrapperSelector).innerWidth();
		globals.viewport.viewportHeight = $(settings.slidesSelector).innerHeight();
		globals.navigation.nav = document.getElementById(settings.navigationSlider.replace('#', ''));
		
    //set width for slider nav
		$navigationItems = $(settings.navigationSlider).children('li');
		var navigationSliderTotalWidth = funcs.calculateNavWidth($navigationItems);
		$(settings.navigationSlider).width(navigationSliderTotalWidth);
		
    $navigationItems.each(function(i, val) {
			globals.navigation.navOffsets[i] = funcs.navOffsetForIndex(i);
			globals.navigation.navItems[i] = val;
		});
		
    //set values to layout captions
		var captions = $(settings.captionSelector);
		captions.each(function(i, val) {
			globals.captions.captionItems[i] = val;
		});
    
    // if (rebound.Spring._ID > 0) {
    //   //console.log("true");
    //   //globals.springs.mainSpring.destroy();
    //   var id = globals.springs.mainSpring.getId();
    //   console.log(id);
    //   //springs.removeSprings();
    // }
    // if (globals.springs.mainSpring.getId().length > 0) {
    //   globals.springs.mainSpring.removeListener();
    // }
		springs.setupMainSpring(settings.frictionAndTension.carousel.friction, settings.frictionAndTension.carousel.tension,
			function(xTranslation, progress, spring) {
				globals.navigation.nav.style.webkitTransform = 'translate3d(' + xTranslation + 'px, 0, 0)';
				globals.navigation.nav.style.MozTransform = 'translate3d(' + xTranslation + 'px, 0, 0)';
				// Other transitions
				$(settings.slidesSelector).each(function(i, val) {
					var slideProgress = 1 - Math.abs(progress - i);
					// Slide and scale the images
					if (slideProgress > 0) { // Only bother if the slide is visible
						// Slide and scale
						var x = (i * globals.viewport.viewportWidth) - (progress * globals.viewport.viewportWidth);
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
					globals.navigation.navItems[i].style.opacity = tabOpacity;
					if (progress.toString().split('.').length === 1 && settings.carouselTransitionComplete) {
						settings.carouselTransitionComplete(spring, xTranslation);
					}
				});
			});
		springs.setupNavigationSpring(settings.frictionAndTension.navigation.friction, settings.frictionAndTension.navigation.tension);
		$(settings.slidesSelector).each(function(i, val) {
			val.style.webkitTransform = 'translate3d(' + globals.viewport.viewportWidth * i + 'px, 0, 0)';
			val.style.MozTransform = 'translate3d(' + globals.viewport.viewportWidth * i + 'px, 0, 0)';
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
		// Behavior when the globals.navigation.navItems are clicked
		$(settings.navigationSlider).children('li').each(function(i, val) {
			$(val).click(function() {
				funcs.selectTabIndex(i, true);
			});
			$(val).mousedown(function() {
				globals.navigation.downIndex = $(this).index();
				globals.springs.navigationSpring.setEndValue(1);
			});
			$(val).mouseup(function() {
				globals.springs.navigationSpring.setEndValue(0);
			});
		});
		//Show captions
		$(settings.captionSelector).each(function(i) {
			if (settings.captions.show) {
				funcs.layoutCaptions(i, true);
			}
		});

		//declare public methods
    //this.mainSpring = globals.springs.mainSpring;
		this.layoutCaptions = funcs.layoutCaptions;
		this.recalculateSize = funcs.recalculateSize;
    this.navOffsetForIndex = funcs.navOffsetForIndex;
    this.destroySprings = springs.destroySprings;
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
		globals.viewport.viewportWidth = $('#wrapper').innerWidth();
		globals.viewport.viewportHeight = $('#slides li').innerHeight();
	};
	funcs.calculateNavWidth = function($navigationItems) {
		var totalWidth = 0;
		$navigationItems.each(function(i, val) {
			globals.navigation.navItemWidths[i] = $(val).innerWidth();
			globals.navigation.navItemWidthsRunningSum[i] = globals.navigation.navItemWidths[i];
			if (i > 0) {
				globals.navigation.navItemWidthsRunningSum[i] = globals.navigation.navItemWidthsRunningSum[i] + globals.navigation.navItemWidthsRunningSum[i - 1];
			}
			totalWidth += globals.navigation.navItemWidths[i];
		});
		return totalWidth;
	};
	funcs.navOffsetForIndex = function(i) {
		var offset = 0;
		if (i > 0) {
			offset = (globals.navigation.navItemWidthsRunningSum[i - 1] + (globals.navigation.navItemWidths[i] / 2.0)) * -1;
		} else {
			offset = ((globals.navigation.navItemWidths[i] / 2.0)) * -1;
		}
		return offset;
	};
  funcs.selectTabIndex = function(i, animated) {
		if (i < 0) {
			i = 0;
		} else if (i > globals.navigation.navItems.length - 1) {
			i = globals.navigation.navItems.length - 1;
		}
		if (animated) {
			globals.viewport.viewportWidth = $('#wrapper').innerWidth();
			globals.carousel.currentPage = i;
			globals.springs.mainSpring.setEndValue(i);
		} else {
			globals.springs.mainSpring.setCurrentValue(i);
		}
	};
  // funcs.resetCurrentPage = function() {
  //   globals.carousel.currentPage = 0;
  // }
	funcs.layoutCaptions = function() {
		// Distance between the center of the image and its optical right edge in the coordinate system of the native image resolution
		var rightEdges = globals.imageSize.rightEdge;
		var bottomEdges = globals.imageSize.bottomEdge;
		var bottomPadding = globals.imageSize.bottomPadding;
		var captions = globals.captions.captionItems;
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
		var contentWidth = globals.imageSize.imageWidth[i];
		var contentHeight = globals.imageSize.imageHeight[i];
		var viewportWidth = globals.viewport.viewportWidth;
		var viewportHeight = globals.viewport.viewportHeight;
		var scale = ((viewportWidth / viewportHeight) > (contentWidth / contentHeight)) ? (viewportHeight / contentHeight) : (viewportWidth / contentWidth);
		return scale;
	};
	inputEvents.addArrowKeySupport = function() {
		var initialPress = true;
		var isRubberbanding = false;
		$(document).keydown(function(e) {
			var currentIndex = globals.carousel.currentPage;
			var positionTolerance = 0.001;
			var maxRubberbandDistance = 0.03; // Normalized
			var inRubberbandableRegion = 0;
			if (e.keyCode === 37) { // Left arrow key
				inRubberbandableRegion = globals.springs.mainSpring.getCurrentValue() < positionTolerance;
				if (inRubberbandableRegion && initialPress) {
					isRubberbanding = true;
					globals.springs.mainSpring.setEndValue(globals.springs.mainSpring.getCurrentValue() - maxRubberbandDistance);
				} else if (!inRubberbandableRegion) {
					isRubberbanding = false;
					funcs.selectTabIndex(currentIndex - 1, true);
				}
			} else if (e.keyCode === 39) { // Right arrow key
				inRubberbandableRegion = globals.springs.mainSpring.getCurrentValue() > ((globals.navigation.navItems.length - 1) - positionTolerance);
				if (inRubberbandableRegion && initialPress) {
					isRubberbanding = true;
					globals.springs.mainSpring.setEndValue(globals.springs.mainSpring.getCurrentValue() + maxRubberbandDistance);
				} else if (!inRubberbandableRegion) {
					isRubberbanding = false;
					funcs.selectTabIndex(currentIndex + 1, true);
				}
			}
			initialPress = false;
		});
		// When rubberbanding, snap back to the correct rest value on key up
		$(document).keyup(function(e) {
			var currentIndex = globals.carousel.currentPage;
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
			inputEvents.startDragging(touch.pageX);
		}, false);
		item.addEventListener('touchmove', function(e) {
			e.preventDefault(); // Stop vertical rubberbanding on iOS
			var touch = e.touches[0];
			inputEvents.continueDragging(touch.pageX);
		}, false);
		item.addEventListener('touchend', function(e) {
			inputEvents.endDragging();
		}, false);
		item.addEventListener('touchcancel', function(e) {
			inputEvents.endDragging();
		}, false);
		item.addEventListener('mousedown', function(e) {
			inputEvents.startDragging(e.clientX);
		}, false);
		item.addEventListener('mousemove', function(e) {
			if (globals.dragging.isDragging) {
				inputEvents.continueDragging(e.clientX);
			}
		}, false);
		item.addEventListener('mouseup', function(e) {
			inputEvents.endDragging();
		}, false);
		item.addEventListener('mouseleave', function(e) {
			if (globals.dragging.isDragging) {
				inputEvents.endDragging();
			}
		}, false);
	};
	inputEvents.startDragging = function(x) {
    lastX = x;
		globals.dragging.isDragging = true;
		globals.viewport.viewportWidth = $('#wrapper').innerWidth();
		globals.springs.mainSpring.setAtRest();
		$('body').addClass('dragging');
	};
	inputEvents.continueDragging = function(x) {
    panVelocity = x - lastX;
		lastX = x;
		var progress = springs.progressForValueInRange(panVelocity, 0, -globals.viewport.viewportWidth);
		var currentValue = globals.springs.mainSpring.getCurrentValue();
		// Rubberband when beyond the scroll boundaries
		if ((currentValue + progress) < 0 || (currentValue + progress) > globals.navigation.navItems.length - 1) {
			progress *= 0.5;
		}
		globals.springs.mainSpring.setCurrentValue(currentValue + progress);
		globals.springs.mainSpring.setAtRest()
    //console.log(panVelocity);
	};
	inputEvents.endDragging = function() {
		var currentPosition = globals.springs.mainSpring.getCurrentValue();
		var restPosition = globals.carousel.currentPage;
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
		var normalizedVelocity = springs.progressForValueInRange(panVelocity, 0, -globals.viewport.viewportWidth);
		globals.springs.mainSpring.setVelocity(normalizedVelocity * 30);
		panVelocity = 0;
		globals.dragging.isDragging = false;
    $('body').removeClass('dragging');
    //console.log(panVelocity);
	};
  springs.destroySprings = function() {
		globals.springs.mainSpring.destroy();
    //globals.springs.navigationSpring.destroy();
	};
	springs.setupMainSpring = function(friction, tension, callback) {
		globals.springs.mainSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(tension, friction));
		globals.springs.mainSpring.addListener({
			onSpringUpdate: function(spring) {
				// Progress from 0 to n
				var progress = spring.getCurrentValue();
        var id = spring.getId();
				var xTranslation = springs.transitionForProgressInSteps(progress, globals.navigation.navOffsets);
				// Pixel snap when the spring is nearing rest on non-retina displays
				if (Math.abs(spring.getVelocity()) < 0.05 && window.devicePixelRatio < 1.1) {
					xTranslation = Math.floor(xTranslation);
				}
				callback(xTranslation, progress, spring);
        console.log(id);
			}
		});
	};
	springs.setupNavigationSpring = function(friction, tension) {
		globals.springs.navigationSpring.setSpringConfig(rebound.SpringConfig.fromOrigamiTensionAndFriction(tension, friction));
		globals.springs.navigationSpring.addListener({
			onSpringUpdate: function(spring) {
				var progress = spring.getCurrentValue();
				var scale = springs.transitionForProgressInRange(progress, 1.0, 0.92);
				globals.navigation.navItems[globals.navigation.downIndex].style.webkitTransform = 'scale(' + scale + ')';
				globals.navigation.navItems[globals.navigation.downIndex].style.MozTransform = 'scale(' + scale + ')';
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
