// 'use strict'

$(function() {

	// nav
	$('.dropdown').on( "mouseenter mouseleave", function( event ){
		$(this).children('.sub-menu')
				.slideToggle(1000)
				// .addClass('sub-menu__shown')
				// .animate({
				// 	'background':"#03C",
				// }, 1000 );

	});


// jcarousel
	$('.jcarousel').jcarousel({
		list: '.jcarousel-list'
	});

	// Инициализация прокрутки слайдера
	$('.jcarousel-prev').jcarouselControl({ target: '=1' });
	$('.jcarousel-next').jcarouselControl({ target: '+=1' });
	
	$('img').on('click', function () {
		console.log('img');
		$('.jcarousel').jcarousel('scroll', '+=2');
	});

	// Autoscroll
	$('.jcarousel').jcarouselAutoscroll({
		interval: 2000,
		target: '+=1',
		autostart: true
	});

	// Инициализация пагинации слайдера
	$('.jcarousel-pagination').jcarouselPagination({
		item: function(page) {
			return '<a href="#' + page + '">' + page + '</a>';
		}
	});

	// Select2
	$('.selectbox').select2({
		placeholder: "Select a language.",
		// allowClear: true
		language: "ru"
	});

	// checkbox
	$(".niceCheck").each(
		 // при загрузке страницы меняем обычные на стильные checkbox 
		function() {
			changeCheckStart(jQuery(this));
		});

})
