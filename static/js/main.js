$.noConflict();

jQuery(document).ready(function($) {

	"use strict";
	function applyTheme(theme) {
		// When the selected theme changes, apply it to the <html> element's class
		const html = document.documentElement; // <html> element
		html.classList.remove("light-theme", "dark-theme"); // Remove all theme classes
		html.classList.add(theme + "-theme"); // Add the selected theme class
	  }
	
	  // Initialize the selected theme from localStorage or set a default theme
	  const selectedTheme = localStorage.getItem('selectedTheme') || 'light';
	  applyTheme(selectedTheme);
	
	  // Watch for changes in the selected theme and update localStorage and <html> class
	  $('.theme-switch').on('change', function() {
		const newTheme = $(this).val();
		localStorage.setItem('selectedTheme', newTheme);
		applyTheme(newTheme);
	  });

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	});

	jQuery('.selectpicker').selectpicker;


	

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	$('.equal-height').matchHeight({
		property: 'max-height'
	});

	// var chartsheight = $('.flotRealtime2').height();
	// $('.userActivity').css('height', chartsheight-150);














	// Counter Number
	$('.count').each(function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 3000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});


	 
	 
	// Menu Trigger
	// $('#menuToggle').on('click', function(event) {
	// 	console.log("insidemenutrigger", event);
	// 	var width = $("header").width();
	// 	console.log(width);
	// 	var windowWidth = $(window).width();   		 
	// 	if (windowWidth<1010) { 
	// 		$('body').removeClass('open'); 
	// 		if (windowWidth<760){ 
	// 			$('#left-panel').slideToggle(); 
	// 		} else {
	// 			$('#left-panel').toggleClass('open-menu');  
	// 		} 
	// 	} else {
	// 		$('body').toggleClass('open');
	// 		$('#left-panel').removeClass('open-menu');  
	// 	} 
			 
	// }); 

	 
	$(".menu-item-has-children.dropdown").each(function() {
		$(this).on('click', function() {
			var $temp_text = $(this).children('.dropdown-toggle').html();
			$(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
		});
	});

	
	// Load Resize 

	
	$(window).on("load resize", function(event) { 
		var windowWidth = $(window).width(); 
		// var windowHeight = $(window).height();
		// var screenHeight = screen.height;
		// var diff = screenHeight-windowHeight;
		if (windowWidth<1200) {
			$('body').addClass('small-device'); 
		} else {
			$('body').removeClass('small-device');  
		} 
		// $(".main-section").css({"height": "windowHeight"});
		// $(".main-section").css({ height: 'calc(100vh - ' + diff + 'px)' });
		
	});
 
});