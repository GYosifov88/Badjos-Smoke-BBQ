// helper - validate data attr
function validateDataAttr($attr) {
	"use strict";
	return $attr !== undefined;

}

// init gmap - Asynchronous Loading
function initmap() {
	"use strict";


	jQuery(".markersGoogleMap").each(function(){
		var $this = jQuery(this);
		var icon = $this.attr("data-icon");
		$this.css("min-height", $this.data("height") + "px");

		$this.gmap3({
			map:{
			  options:{
			    zoom: 5
			  }
			},
			marker:{
			  values:[
			    {latLng:[48.8620722, 2.352047], data:"Junipers Blvd. 380 Queens, NY 11379, USA", options:{icon: icon}},
			    {address:"86000 Poitiers, France", data:"Junipers Blvd. 380 Queens, NY 11379, USA", options:{icon: icon}},
			    {address:"66000 Perpignan, France", data:"Junipers Blvd. 380 Queens, NY 11379, USA", options:{icon: icon}}
			  ],
			  options:{
			    draggable: false
			  },
			  events:{
			    mouseover: function(marker, event, context){
			      var map = $(this).gmap3("get"),
			        infowindow = $(this).gmap3({get:{name:"infowindow"}});
			      if (infowindow){
			        infowindow.open(map, marker);
			        infowindow.setContent(context.data);
			      } else {
			        $(this).gmap3({
			          infowindow:{
			            anchor:marker,
			            options:{content: context.data}
			          }
			        });
			      }
			    },
			    mouseout: function(){
			      var infowindow = $(this).gmap3({get:{name:"infowindow"}});
			      if (infowindow){
			        infowindow.close();
			      }
			    }
			  }
			}
			},"autofit");
	})




	jQuery(".googleMap:not(.markersGoogleMap)").each(function () {
		var atcenter = "";
		var $this = jQuery(this);
		var location = $this.data("location");
		var text = $this.data("text");
		var lat = $this.data("latitude");
    var long = $this.data("longitude");

		var offset = -30;

		if (validateDataAttr($this.data("offset"))) {
			offset = $this.data("offset");
		}

		if (validateDataAttr($this.data("latitude"))) {

			$this.gmap3({
				marker: {
					latLng: [lat, long],
					options: {
						visible: false
					},
					callback: function (marker) {
						atcenter = marker.getPosition();
					}
				},
				map: {
					options: {
						//maxZoom:11,
						zoom: 17,
						mapTypeId: google.maps.MapTypeId.HYBRID,
						// ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
						scrollwheel: false,
						disableDoubleClickZoom: false,
						mapTypeControlOptions: {
							//mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
							//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
							//position: google.maps.ControlPosition.RIGHT_CENTER
							mapTypeIds: []
						}
					},
					events: {
						idle: function () {
							if (!$this.data('idle')) {
								$this.gmap3('get').panBy(0, offset);
								$this.data('idle', true);
							}
						}
					}
				},
				overlay: {
					latLng: [lat, long],
					options: {
						content: '<div class="customMarker"><span>' + text + '</span><i></i></div>',
						offset: {
							y: -47,
							x: -25
						}
					}
				}
				//},"autofit"
			});

			// center on resize
			google.maps.event.addDomListener(window, "resize", function () {
				//var userLocation = new google.maps.LatLng(53.8018,-1.553);
				$this.gmap3('get').setCenter(atcenter);
				$this.gmap3('get').panBy(0, offset);
			});

			// set height
			$this.css("min-height", $this.data("height") + "px");
		}


		if (validateDataAttr($this.data("location"))) {

			$this.gmap3({
				marker: {
					address: location,
					options: {
						visible: false
					},
					callback: function (marker) {
						atcenter = marker.getPosition();
					}
				},
				map: {
					options: {
						//maxZoom:11,
						zoom: 17,
						mapTypeId: google.maps.MapTypeId.HYBRID,
						// ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
						scrollwheel: false,
						disableDoubleClickZoom: false,
						mapTypeControlOptions: {
							//mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
							//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
							//position: google.maps.ControlPosition.RIGHT_CENTER
							mapTypeIds: []
						}
					},
					events: {
						idle: function () {
							if (!$this.data('idle')) {
								$this.gmap3('get').panBy(0, offset);
								$this.data('idle', true);
							}
						}
					}
				},
				overlay: {
					address: location,
					options: {
						content: '<div class="customMarker"><span>' + text + '</span><i></i></div>',
						offset: {
							y: -47,
							x: -25
						}
					}
				}
				//},"autofit"
			});

			// center on resize
			google.maps.event.addDomListener(window, "resize", function () {
				//var userLocation = new google.maps.LatLng(53.8018,-1.553);
				$this.gmap3('get').setCenter(atcenter);
				$this.gmap3('get').panBy(0, offset);
			});

			// set height
			$this.css("min-height", $this.data("height") + "px");
		}

	})
}

function loadScript() {
	"use strict";
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYTLFgKDw12Y3CAaOdIOidNEQ93gHbwno&callback=initmap';
	document.body.appendChild(script);
}

window.onload = loadScript;


jQuery(document).ready(function () {
	"use strict";
	// set nav position
	jQuery(".navbar-nav").each(function () {
		var $this = jQuery(this);
		$this.css($this.data("type"), $this.data("pos"));
	})

	// set logo position
	jQuery(".navbar-brand, .small-brand").each(function () {
		var $this = jQuery(this);

		$this.css({
			"position": "absolute",
			"left": "50%",
			"margin-left": (-$this.data("width") / 2),
			"top": $this.data("top")
		});

	})

	// set background image
	jQuery(".full-width-photo, .section > .inner").each(function () {
		var $this = jQuery(this);

		var image = "none";

		if (validateDataAttr($this.data("image"))) {
			image = "url(" + $this.data("image") + ")";
		}

		$this.css("background-image", image).css("background-attachment", $this.data("scroll")).css("padding-top", $this.data("topspace") + "px").css("padding-bottom", $this.data("bottomspace") + "px");
	})

	// init rounded image
	jQuery(".roundedImg").each(function () {
		var $this = jQuery(this);
		var imgpath = $this.find("img").attr("src");
		$this.css("background-image", "url(" + imgpath + ")");

		var $sizeImg = $this.data("size");
		if (validateDataAttr($sizeImg)) {
			var size = $sizeImg;

			$this.css({
				width: size,
				height: size
			});
		}
	})


	// init prettyphoto
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		deeplinking: false,
		social_tools: " ",
		hook: 'data-rel',
		animation_speed: 'fast', /* fast/slow/normal */
		slideshow: 5000, /* false OR interval time in ms */
		autoplay_slideshow: false, /* true/false */
		opacity: 0.75, /* Value between 0 and 1 */
		overlay_gallery: false,
		show_title: true, /* true/false */
		allow_resize: true, /* Resize the photos bigger than viewport. true/false */
		counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
		theme: 'pp_default', /* pp_default / light_rounded / dark_rounded / light_square / dark_square / facebook */
		horizontal_padding: 20 /* The padding on each side of the picture */
	});


	// init bxslider
	jQuery('.bxslider').bxSlider({
		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',
		responsive: true,

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,

		// PAGER
		pager: false,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,

		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,

		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,

		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,

		// CALLBACKS
		onSliderLoad: function () {
		},
		onSlideBefore: function () {
		},
		onSlideAfter: function () {
		},
		onSlideNext: function () {
		},
		onSlidePrev: function () {
		}
	});


	// Direction-aware hover effect
	jQuery('.galleryContainer > li .inner ').each(function () {
		jQuery(this).hoverdir({
			speed: 300,
			easing: 'ease',
			hoverDelay: 25,
			inverse: false
		});
	});


	// enable HTML5 placeholder behavior for browsers that aren’t trying hard enough yet
	jQuery('input, textarea').placeholder();


});


jQuery(window).load(function () {
	"use strict";

	// flexfull slider init
	jQuery('.flexslider.flexFull').flexslider({
		animation: "slide",              //String: Select your animation type, "fade" or "slide"
		easing: "easeInOutExpo",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
		// easing types :
		// swing, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic,
		// easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint,
		// easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine,
		// easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc,
		// easeInOutCirc, easeInElastic, easeOutElastic, easeInOutElastic, easeInBack,
		// easeOutBack, easeInOutBack, easeInBounce, easeOutBounce, easeInOutBounce
		direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
		reverse: false,                 //{NEW} Boolean: Reverse the animation direction
		animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
		smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
		startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
		slideshow: false,                //Boolean: Animate slider automatically
		slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 1100,            //Integer: Set the speed of animations, in milliseconds
		initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
		randomize: false,               //Boolean: Randomize slide order

		// Primary Controls
		controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
		prevText: "Previous",           //String: Set the text for the "previous" directionNav item
		nextText: "Next",               //String: Set the text for the "next" directionNav item

		// Usability features
		pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
		pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
		touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
		video: true,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
		useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available

		// Secondary Navigation
		keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
		multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
		mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
		pausePlay: false,               //Boolean: Create pause/play dynamic element
		pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
		playText: 'Play',               //String: Set the text for the "play" pausePlay item

		// Callback API
		start: function () {
			jQuery(".flexslider.flexFull").removeClass("loading-slider");
		},
		before: function () {
		},           //Callback: function(slider) - Fires asynchronously with each slider animation
		after: function () {
		},            //Callback: function(slider) - Fires after each slider animation completes
		end: function () {
		},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
		added: function () {
		},            //{NEW} Callback: function(slider) - Fires after a slide is added
		removed: function () {
		}           //{NEW} Callback: function(slider) - Fires after a slide is removed
	});


	// flexFade slider init
	jQuery('.flexslider.flexFade').flexslider({
		animation: "fade",              //String: Select your animation type, "fade" or "slide"
		// easing: "easeInOutExpo",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
		// easing types :
		// swing, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic,
		// easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint,
		// easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine,
		// easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc,
		// easeInOutCirc, easeInElastic, easeOutElastic, easeInOutElastic, easeInBack,
		// easeOutBack, easeInOutBack, easeInBounce, easeOutBounce, easeInOutBounce
		direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
		reverse: false,                 //{NEW} Boolean: Reverse the animation direction
		animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
		smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
		startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
		slideshow: false,                //Boolean: Animate slider automatically
		slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 1000,            //Integer: Set the speed of animations, in milliseconds
		initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
		randomize: false,               //Boolean: Randomize slide order

		// Primary Controls
		controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
		prevText: "Previous",           //String: Set the text for the "previous" directionNav item
		nextText: "Next",               //String: Set the text for the "next" directionNav item

		// Usability features
		pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
		pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
		touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
		video: true,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
		useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available

		// Secondary Navigation
		keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
		multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
		mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
		pausePlay: false,               //Boolean: Create pause/play dynamic element
		pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
		playText: 'Play',               //String: Set the text for the "play" pausePlay item

		// Callback API
		start: function () {
			jQuery(".flexslider.flexFade").removeClass("loading-slider");
		},
		before: function () {
		},           //Callback: function(slider) - Fires asynchronously with each slider animation
		after: function () {
		},            //Callback: function(slider) - Fires after each slider animation completes
		end: function () {
		},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
		added: function () {
		},            //{NEW} Callback: function(slider) - Fires after a slide is added
		removed: function () {
		}           //{NEW} Callback: function(slider) - Fires after a slide is removed
	});


	// flexFade slider init
	jQuery('.flexslider.flexSimple').flexslider({
		animation: "fade",              //String: Select your animation type, "fade" or "slide"
		// easing: "easeInOutExpo",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
		// easing types :
		// swing, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic,
		// easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint,
		// easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine,
		// easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc,
		// easeInOutCirc, easeInElastic, easeOutElastic, easeInOutElastic, easeInBack,
		// easeOutBack, easeInOutBack, easeInBounce, easeOutBounce, easeInOutBounce
		direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
		reverse: false,                 //{NEW} Boolean: Reverse the animation direction
		animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
		smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
		startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
		slideshow: false,                //Boolean: Animate slider automatically
		slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 1000,            //Integer: Set the speed of animations, in milliseconds
		initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
		randomize: false,               //Boolean: Randomize slide order

		// Primary Controls
		controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
		prevText: " ",           //String: Set the text for the "previous" directionNav item
		nextText: " ",               //String: Set the text for the "next" directionNav item

		// Usability features
		pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
		pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
		touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
		video: true,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
		useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available

		// Secondary Navigation
		keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
		multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
		mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
		pausePlay: false,               //Boolean: Create pause/play dynamic element
		pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
		playText: 'Play',               //String: Set the text for the "play" pausePlay item

		// Callback API
		start: function () {
		},
		before: function () {
		},           //Callback: function(slider) - Fires asynchronously with each slider animation
		after: function () {
		},            //Callback: function(slider) - Fires after each slider animation completes
		end: function () {
		},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
		added: function () {
		},            //{NEW} Callback: function(slider) - Fires after a slide is added
		removed: function () {
		}           //{NEW} Callback: function(slider) - Fires after a slide is removed
	});

	// init custom scrollbar
	jQuery(".custom-scrollbar").mCustomScrollbar({
		set_width: false, /*optional element width: boolean, pixels, percentage*/
		set_height: false, /*optional element height: boolean, pixels, percentage*/
		horizontalScroll: false, /*scroll horizontally: boolean*/
		scrollInertia: 500, /*scrolling inertia: integer (milliseconds)*/
		mouseWheel: true, /*mousewheel support: boolean*/
		mouseWheelPixels: "auto", /*mousewheel pixels amount: integer, "auto"*/
		autoDraggerLength: false, /*auto-adjust scrollbar dragger length: boolean*/
		autoHideScrollbar: false, /*auto-hide scrollbar when idle*/
		scrollButtons: { /*scroll buttons*/
			enable: false, /*scroll buttons support: boolean*/
			scrollType: "continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
			scrollSpeed: "auto", /*scroll buttons continuous scrolling speed: integer, "auto"*/
			scrollAmount: 40 /*scroll buttons pixels scroll amount: integer (pixels)*/
		},
		advanced: {
			updateOnBrowserResize: true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
			updateOnContentResize: true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
			autoExpandHorizontalScroll: true, /*auto-expand width for horizontal scrolling: boolean*/
			autoScrollOnFocus: true, /*auto-scroll on focused elements: boolean*/
			normalizeMouseWheelDelta: false /*normalize mouse-wheel delta (-1/1)*/
		},
		contentTouchScroll: true, /*scrolling by touch-swipe content: boolean*/
		callbacks: {
			onScrollStart: function () {
			}, /*user custom callback function on scroll start event*/
			onScroll: function () {
			}, /*user custom callback function on scroll event*/
			onTotalScroll: function () {
			}, /*user custom callback function on scroll end reached event*/
			onTotalScrollBack: function () {
			}, /*user custom callback function on scroll begin reached event*/
			onTotalScrollOffset: 0, /*scroll end reached offset: integer (pixels)*/
			onTotalScrollBackOffset: 0, /*scroll begin reached offset: integer (pixels)*/
			whileScrolling: function () {
			} /*user custom callback function on scrolling event*/
		},
		theme: "dark-thick" /*"light", "dark", "light-2", "dark-2", "light-thick", "dark-thick", "light-thin", "dark-thin"*/
	});


})

function scrollToTop(i) {
	"use strict";
	if (i == 'show') {
		if (jQuery(this).scrollTop() != 0) {
			jQuery('#toTop').fadeIn();
		} else {
			jQuery('#toTop').fadeOut();
		}
	}
	if (i == 'click') {
		jQuery('#toTop').click(function () {
			jQuery('body,html').animate({scrollTop: 0}, 600);
			return false;
		});
	}
}

// scroll top button
jQuery(document).ready(function () {
	"use strict";
	scrollToTop('click');
});


jQuery(window).scroll(function () {
	"use strict";
	scrollToTop('show');
});


// sticky menu + scroll to section init

function setScrollOffset() {
	"use strict";
	var windowsize = jQuery(window).width();
	if (windowsize < 985) {
		return 0;
	}
	// return 248;
	return 85;
}

function menuSticky(i) {
	"use strict";
	if (i == 'click') {

		jQuery(".full-sticky-menu").sticky({
			topSpacing: 0
		});

		jQuery('.nav.navbar-nav li a').click(function () {


			// if mobile and menu open - hide it after click
			var $togglebtn = jQuery(".navbar-toggle")

			if (!($togglebtn.hasClass("collapsed")) && ($togglebtn.is(":visible"))) {
				jQuery(".navbar-toggle").trigger("click");
			}

			var $this = jQuery(this);

			var content = $this.attr('href');

			var myUrl = content.match(/^#([^\/]+)$/i);

			if (jQuery(content).length > 0) {
				if (myUrl) {

					var goPosition = jQuery(content).offset().top - setScrollOffset()-parseInt(jQuery('.sticky-wrapper').height());

					jQuery('html,body').stop().animate({ scrollTop: goPosition}, 1000, 'easeInOutExpo', function () {
						$this.closest("li").addClass("active");
					});


				} else {
					window.location = content;
				}

				return false;
			}
		});
	}

	if (i == 'scroll') {
		var menuEl, mainMenu = jQuery(".full-sticky-menu .nav.navbar-nav"), mainMenuHeight = mainMenu.outerHeight() + 500;
		var menuElements = mainMenu.find('a');

		var scrollElements = menuElements.map(function () {

			var content = jQuery(this).attr("href");
			var myUrl = content.match(/^#([^\/]+)$/i);

			if (myUrl) {

				var item = jQuery(jQuery(this).attr("href"));
				if (item.length) {
					return item;
				}

			}
		});

		var fromTop = jQuery(window).scrollTop() + mainMenuHeight;

		var currentEl = scrollElements.map(function () {
			if (jQuery(this).offset().top < fromTop) {
				return this;
			}
		});

		currentEl = currentEl[currentEl.length - 1];
		var id = currentEl && currentEl.length ? currentEl[0].id : "";
		if (menuEl !== id) {
			menuElements.parent().removeClass("active").end().filter("[href=#" + id + "]").parent().addClass("active");
		}
	}
}

jQuery(window).load(function () {
	"use strict";
	menuSticky('click');
});

jQuery(window).scroll(function () {
	"use strict";
	menuSticky('scroll');
});


jQuery(document).ready(function () {
	"use strict";
	/* rotate text */
	if (jQuery().arctext) {
		jQuery(".curved").each(function () {
			var $this = jQuery(this);

			var radius = $this.data("radius");
			var direction = $this.data("direction");

			if ((validateDataAttr(radius)) && (validateDataAttr(direction))) {
				jQuery($this).arctext({
					radius: radius,
					dir: direction,
					// 1: curve is down,
					// -1: curve is up
					rotate: true
					// if true each letter should be rotated.
				})
			}
		})
	}

	// ini tooltips
	jQuery("[data-toggle='tooltip']").tooltip();

	// progress bar animation

	if(jQuery().appear) {
		jQuery('.progress').appear(function () {
			var $this = jQuery(this);
			$this.each(function () {
				var $innerbar = $this.find(".progress-bar");
				var percentage = $innerbar.attr("data-percentage");

				$innerbar.addClass("animating").css("width", percentage + "%");

				$innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
									$innerbar.find(".pull-right").fadeIn(900);
								});

			});
		}, {accY: -100});
	}

	// easy pie chart
	if(jQuery().appear) {
		jQuery('.pie-chart').appear(function () {
			jQuery(this).easyPieChart({
				barColor: jQuery(this).attr("data-color"),
				trackColor: "transparent",
				scaleColor:	false,
				lineCap:	"square",
				animate:1500,
				lineWidth:24,
				size:	155
			});
		}, {accY: -100});
	}


	// preloader
	if(jQuery().queryLoader2) {
		jQuery("body.preloader").queryLoader2({
		  backgroundColor: "#fff",	 //Background color of the loader (in hex).
		  barColor: "#584A41",	 //Background color of the bar (in hex).
		  barHeight: 3,	 //Height of the bar in pixels. Default: 1
		  deepSearch: true,	 //Set to true to find ALL images with the selected elements. If you don't want queryLoader to look in the children, set to false. Default: true.
		  percentage: true,	 //Set to true to enable percentage visualising. Default is false.
		  completeAnimation: "fade", //Set the animation type at the end. Options: "grow" or "fade". Default is "fade".
		  onComplete: function(){
		    jQuery("#ct_preloader").fadeOut(600);
		  }
		});
	}


})


// demo required - block clicks in hash links
/*
 jQuery(document).ready(function () {
 "use strict";
 jQuery("a[href='#']").click(function () {
 return false;
 });
 })
 */



