/********************************************
*****************Functions*******************
********************************************/


// remove outline when clicking
function removeOutlines() {
	var links = document.querySelectorAll('a, button');
	for(i=0; i<links.length; i++) {
		let mouseDown = false;
		links[i].addEventListener('mousedown', function (e) {
	        this.blur();
			mouseDown = true;
	    });
		links[i].addEventListener('focus', function (e) {
            if (mouseDown == true) {
            	this.blur();
            }
        });
		links[i].addEventListener('mouseup', function (e) {
	        this.blur();
	    });
		links[i].addEventListener('click', function (e) {
	        this.blur();
	    });
	}
}

// remove focus from not-active slider
function sliderLinkFocus() {
	var owlItems = document.querySelectorAll('.owl-item');
	for (var i = 0; i < owlItems.length; i++) {
		if (owlItems[i].getAttribute('aria-selected') == "false") {
			var itemLinks = owlItems[i].querySelector('.item-link');
			itemLinks.setAttribute('tabindex', '-1');
		} else if (owlItems[i].getAttribute('aria-selected') == "true") {
			var itemLinks = owlItems[i].querySelector('.item-link');
			itemLinks.setAttribute('tabindex', '0');
		}
	}
	// forbid focus on owl-dots
	var owlDots = document.querySelectorAll('.owl-dot');
	for (var i = 0; i < owlDots.length; i++) {
		owlDots[i].setAttribute('tabindex', '-1');
	}
}

// Slider functions
function mainOwlInitialized(event) { 
	
	// let screen readers know an item is active
	$('#owl-one .owl-item').attr('aria-selected','false');
	$('#owl-one .owl-item.active').attr('aria-selected','true'); 

	// apply meta info to next and previous buttons and make them focusable
	$('#owl-one .owl-prev').attr('role','button').attr('title','Previous');
	$('#owl-one .owl-next').attr('role','button').attr('title','Next');
	// $('#owl-one, .owl-prev, .owl-next').attr('tabindex','0');

	// add instructions to keyboard users that are only visible when the carousel is focused
	$('#owl-one .owl-wrapper-outer').append('');

	// listen for keyboard input
	/*$(document).on('keydown', function(e){
		console.log(document.activeElement);

		var $focusedElement = $(document.activeElement),
			singleOwl = $("#owl-one").data('owlCarousel'),
		    type = e.which == 39? 'next': null,
		    type = e.which == 37? 'prev': type,
		    type = e.which == 13? 'enter':type;

		// if the carousel is focused, use left and right arrow keys to navigate
		if($focusedElement.attr('id') === 'owl-one'){

			if (type == 'next') {
				singleOwl.next();
			} else if (type == 'prev') {
				singleOwl.prev();
			}

		// if the prev and next buttons are focused, catch "Enter" and navigate in the right direction
		} else if (type == 'enter') {
		    if ($focusedElement.hasClass('owl-next')) {
		      	singleOwl.next();
		    } else if ($focusedElement.hasClass('owl-prev')) {
		      	singleOwl.prev();
		    }
		}
	});*/
	sliderLinkFocus();
	removeOutlines();
}

function mainOwlChanged() {
	// let screen readers know which slide is active after navigation or reinit
	$('#owl-one .owl-item').attr('aria-selected','false');
	$('#owl-one .owl-item.active').attr('aria-selected','true');
	sliderLinkFocus();
	removeOutlines();
}

function onScroll(event){
	var scrollPos = $(document).scrollTop();
	$('.mnu-line li a').each(function () {

		var currLink = $(this);
		var refElement = currLink.attr("href");
		
		if (refElement.indexOf('#') != -1) { 
			var elHref = $(refElement.substr(refElement.lastIndexOf("#"), refElement.lastIndexOf("")));
			if (typeof elHref.offset() !== 'undefined') {
				if ( $( "#slider" ).height() >= scrollPos + 5 && typeof $('.mnu-line li').find("a[href$='#slider']") !== 'undefined') {
					$('.mnu-line li a').removeClass("active");
					$('.mnu-line li').find("a[href$='#slider']").addClass("active");
				} else if ( $(document).height() - $( window ).height() <= scrollPos + 5) {
					$('.mnu-line li a').removeClass("active");
					$('.mnu-line li').find("a[href$='#contacts']").addClass("active");
					//console.log('1');
				} else if (
						elHref.offset().top - $(".mnu").outerHeight(true) <= scrollPos 
						&& elHref.offset().top + elHref.height() + $(".mnu").outerHeight(true) > scrollPos
					) {
					$('.mnu-line li a').removeClass("active");
					currLink.addClass("active");
					//console.log('2');
				} else {
					currLink.removeClass("active");
				}
			} else {
				return;
			}
		} else {
			return;
		}
			
	});
}

// Function that scrolls to the specified id
function scrollToId(id) {
	// target element
	var $id = $(id);
	if ($id.length === 0) { return; }
	// top position relative to the document
	var pos = $id.offset().top - $(".mnu").outerHeight(true);


	var scrollPos = $(document).scrollTop();
	var time = Math.abs(pos - scrollPos) / 4;
	if (time < 550) {
		time = Math.abs(pos - scrollPos) / 1.5;
	}

	// animated top scrolling
	$('body, html').animate({scrollTop: pos}, time, 'swing');
	console.log('time: ' + time + '  dis: ' + pos + '  scrollPos: ' + scrollPos);
}

// Solutions animation
function retOpenSol() {
	var expand = "#solution-0";
	for (var i = $(".solutions-expand").length; i >= 0; i--) {
		expand = "#solution-"+i;
		if ($(expand).hasClass("active")) { 
			expand = expand;
			break;
		} else {
			expand = "#solution-0";
		}
	}
	return expand;
}










/********************************************
*****************Main Content****************
********************************************/

// Loader
$(window).on( "load",function() {
	// Loader
	$(".loader_inner").delay(300).fadeOut();
	$(".loader").delay(300).fadeOut("slow");
}); 

$(document).ready(function (){
	// Define the current scroll point
	onScroll();

	// removes outlines on click
	removeOutlines();

	
	// General animation
	if ($( window ).width() > 992) {
		$(".mnu-line, .mnu-logo").animatedDown("fadeInDown", "fadeOutUp", '85%' );
	} if ($( window ).width() > 650) {
		$(".fade-up").animated("fadeInUp", "fadeOutDown", '90%' ); 
		$(".about-us-text").animated("fadeInUp", "fadeOutDown", '90%' );
		$(".about-us-2-container").animated("zoomIn", "zoomOut", '70%' ); 
		$(".solutions-item, .solutions-title-fade-up").animatedDown("fadeInUp", "fadeOutDown", '85%' );
		// $(".fade-right").animated("fadeInRight", "fadeOutRight", '90%' ); 
		// $(".solutions-item-icon, .solutions-item-title, .solutions-item-desc, .solutions-item-btn").animated("fadeInUp", "none", '90%' );
	} if ($( window ).width() < 650) {
		$(".fade-up").animated("fadeInUp", "fadeOutDown", '90%' ); 
		$(".about-us-text").animated("fadeInUp", "fadeOutDown", '90%' );
		$(".about-us-2-container").animated("fadeInUp", "fadeOutDown", '90%' ); 
		$(".solutions-item, .solutions-title-fade-up").animatedDown("fadeInUp", "fadeOutDown", '85%' ); 
	}



	// Main slider
	if ($( window ).width() >= 1200) {
		var owl = $('#owl-one');
		owl.owlCarousel({
			loop: false,
			margin:0,
			navSpeed:600,
			nav:true,
			navText : [
				'<img src="assets/app/img/slider/arr-prev.png" alt="Arrow directing to the previous slide" class="arr-prev">',
				'<img src="assets/app/img/slider/arr-next.png" alt="Arrow directing to the next slide" class="arr-next">'],
			autoplay: true,
			autoplayHoverPause: true,
			rewind: true,
			items:1,
			smartSpeed: 500,
			autoplaySpeed: 500,
			navSpeed: 500,
			dotsSpeed: 500,
			dragEndSpeed: 500,
			addClassActive: true, // visible items have class active
          	onInitialized: function (event) {
          		mainOwlInitialized(event);
          	},
			onTranslated: mainOwlChanged
		});
	} if ($( window ).width() < 1200) {
		var owl = $('.owl-one');
		owl.owlCarousel({
			loop:true,
			margin:0,
			navSpeed:500,
			nav:true,
			navText : [
				'<img src="assets/app/img/slider/arr-prev.png" alt="Arrow directing to the previous slide" class="arr-prev">',
				'<img src="assets/app/img/slider/arr-next.png" alt="Arrow directing to the next slide" class="arr-next">'
			],
			autoplay: false,
			autoplayHoverPause: true,
			rewind:false,
			items:1,
			smartSpeed: 500,
			autoplaySpeed: 500,
			navSpeed: 500,
			dotsSpeed: 500,
			dragEndSpeed: 500,
			addClassActive: true, // visible items have class active
          	onInitialized: mainOwlInitialized,
			onTranslated: mainOwlChanged
		});
	}
	

	// Clients slider
	var owl = $('.owl-two');
	owl.owlCarousel({
		loop:true,
		margin:0,
		navSpeed:500,
		nav:true,
		navText : [
			'<img src="assets/app/img/clients/arr-prev.png" alt="Arrow directing to the previous slide" class="arr-prev">',
			'<img src="assets/app/img/clients/arr-next.png" alt="Arrow directing to the next slide" class="arr-next">'
		],
		autoplay: true,
		autoplayHoverPause: true,
		rewind: false,
		smartSpeed: 500,
		autoplaySpeed: 500,
		navSpeed: 500,
		dotsSpeed: 500,
		dragEndSpeed: 500,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:true,
				slideBy:1
			},
			600:{
				items:3,
				nav:false,
				slideBy:3
			},
			1000:{
				items:5,
				nav:true,
				slideBy: 5
			}
		}
	});


	// Scroll-to-id
	$(".scroll-to-id").on('click', 'a[href^="#"]', function(e) {
		// target element id
		var refElement = $(this).attr('href');
		var id = refElement.substr(refElement.lastIndexOf("#"), refElement.lastIndexOf(""));
		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		
		
		if (id.replace(/\d+/g, '') == "#solution-" && $(id).hasClass("active")) {
			return;
		} else {
			scrollToId(id);
		}
			
	});


	// Menu button animation
	$(".sandwich, .mnu-item").click(function() {
		if ($(".mnu-line, .mnu-mob").hasClass("active") && $('.sandwich').is(':visible')) {
			$(".mnu-line, .mnu-item, .mnu-mob").fadeOut(600).removeClass("active");
			$(".sandwich").toggleClass("active");
		} else if (!$(".mnu-line, .mnu-mob").hasClass("active") && $('.sandwich').is(':visible')) {
			$(".mnu-line, .mnu-item, .mnu-mob").fadeIn(600).addClass("active");
			$(".sandwich").toggleClass("active");
		}
	});

	

	$(".solutions-item-btn-cont, .arr-up>a").on('click', function (e) {
		var href = $(this).attr('href');
		var expand = retOpenSol();
		if (expand != "#solution-0" && expand == href) { // close if the only open
			$(href).slideUp( "slow", function() {
				$(this).removeClass("active");
			});
			//console.log(href + " 1");
			scrollToId('#solutions');
		} else if (expand == "#solution-0") { // add if there are no open
			$(href).slideDown( "slow", function() {
				$(this).addClass("active");
			});
			//console.log(href + " 2");
		} else if (expand != "#solution-0" && expand != href) {
			$(href).toggleClass("active");
			$(expand).removeClass("active");
			$(expand).slideUp("slow", function () {
				$(href).slideToggle("slow");
				scrollToId(href);
				/*var pos = $(href).offset().top - $(".mnu").outerHeight(true);
				$('body, html').animate({scrollTop: pos});*/
			});
			//console.log(href + " 3");
		} else { // just close
			$(expand).removeClass("active");
			$(expand).slideUp("slow");
			//console.log(href + " 4");
			scrollToId('#solutions');
		}
	});

	
	
});


// Change menu items when scroling
$(document).on("scroll", onScroll);

