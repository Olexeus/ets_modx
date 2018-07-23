
	// Loader
$(window).on( "load",function() {
	// Define the current scroll point
	onScroll();

	// Loader
	$(".loader_inner").delay(300).fadeOut();
	$(".loader").delay(300).fadeOut("slow");
	
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
	var owl = $('.owl-one');
	owl.owlCarousel({
		loop:true,
		margin:0,
		navSpeed:500,
		nav:true,
		navText : ['<img src="assets/app/img/slider/arr-prev.png" alt="" class="arr-prev">','<img src="assets/app/img/slider/arr-next.png" alt="" class="arr-next">'],
		autoplay: true,
		autoplayHoverPause: true,
		rewind: false,
		items:1,
		smartSpeed: 500,
		autoplaySpeed: 500,
		navSpeed: 500,
		dotsSpeed: 500,
		dragEndSpeed: 500
	});

	// Clients slider
	var owl = $('.owl-two');
	owl.owlCarousel({
		loop:true,
		margin:0,
		navSpeed:500,
		nav:true,
		navText : ['<img src="assets/app/img/clients/arr-prev.png" alt="" class="arr-prev">','<img src="assets/app/img/clients/arr-next.png" alt="" class="arr-next">'],
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
}); 

$(document).ready(function (){

	// Scroll-to-id
	$(".scroll-to-id").on('click', 'a[href^="#"]', function(e) {
		// target element id
		var refElement = $(this).attr('href');
		var id = refElement.substr(refElement.lastIndexOf("#"), refElement.lastIndexOf(""));
		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		// target element
		if (id.replace(/\d+/g, '') == "#solution-" && $(id).hasClass("active")) {
			return;
		} else {
			var $id = $(id);
			if ($id.length === 0) { return; }
			// top position relative to the document
			var pos = $id.offset().top - $(".mnu").outerHeight(true);
			// animated top scrolling
			$('body, html').animate({scrollTop: pos});
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
	$(".solutions-item-btn-cont, .arr-up>a").on('click', function (e) {
		var href = $(this).attr('href');
		var expand = retOpenSol();
		if (expand != "#solution-0" && expand == href) { // close if the only open
			$(href).slideUp( "slow", function() {
				$(this).removeClass("active");
			});
			console.log(href + " 1");
		} else if (expand == "#solution-0") { // add if there are no open
			$(href).slideDown( "slow", function() {
				$(this).addClass("active");
			});
			console.log(href + " 2");
		} else if (expand != "#solution-0" && expand != href) {
			$(href).toggleClass("active");
			$(expand).removeClass("active");
			$(expand).slideUp("slow", function () {
				$(href).slideToggle("slow");
				var pos = $(href).offset().top - $(".mnu").outerHeight(true);
				$('body, html').animate({scrollTop: pos});
			});
			console.log(href + " 3");
		} else { // just close
			$(expand).removeClass("active");
			$(expand).slideUp("slow");
			console.log(href + " 4");
		}
	});

	
	
});
// Change menu items when scroling
$(document).on("scroll", onScroll);

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
					console.log('1');
				} else if (
						elHref.offset().top - $(".mnu").outerHeight(true) <= scrollPos 
						&& elHref.offset().top + elHref.height() + $(".mnu").outerHeight(true) > scrollPos
					) {
					$('.mnu-line li a').removeClass("active");
					currLink.addClass("active");
					console.log('2');
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

