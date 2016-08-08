// 'use strict'

$(function() {

	// nav
	$('.dropdown').hover(function(){
		$(this).children('.sub-menu').addClass('sub-menu__shown');
		},function() {
		$(this).children('.sub-menu').removeClass('sub-menu__shown');		
	});


	// jcarousel
	$('.jcarousel').jcarousel({
		list: '.jcarousel-list'
	});

	// Инициализация прокрутки слайдера
	$('.jcarousel-prev').jcarouselControl({ target: '=1' });
	$('.jcarousel-next').jcarouselControl({ target: '+=1' });
	
	$('img').on('click', function () {
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
		function() {
			changeCheckStart(jQuery(this));
		});

})
