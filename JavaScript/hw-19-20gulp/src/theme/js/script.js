'use strict'

//slick slider
$(function(){
	$('.slider-slick').slick({
		dots: true,
		speed: 0,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
	});

//accordion
	$( "#accordion" ).accordion({
	  animate: 100,
	  collapsible: true,
	  heightStyle: "content"
	});
	
//Read More
	$('.features__expand__arrow').on('click', function(e){
		e.preventDefault();
		$(e.target).parent()
					.parent()
					.find('.features__content')
					.toggleClass('height-auto');
	})
});

