'use strict';

$(function () {

	$('#slider1').slick({
		prevArrow: '<button type="button" class="slider__prev"></button>',
		nextArrow: '<button type="button" class="slider__next"></button>'
	});

	$('#slider2').slick({
		initialSlide: 1,
		prevArrow: '<button type="button" class="slider__prev"></button>',
		nextArrow: '<button type="button" class="slider__next"></button>'
	});

	$('#slider3').slick({
		initialSlide: 2,
		prevArrow: '<button type="button" class="slider__prev"></button>',
		nextArrow: '<button type="button" class="slider__next"></button>'
	});

	function buildGrid() {
		var $grid = $('.ideas-grid');
		$grid.imagesLoaded(function () {
			$grid.masonry({
				itemSelector: '.ideas__item',
				columnWidth: '.ideas-sizer',
				percentPosition: true,
				transitionDuration: '1.5s',
				gutter: 10
			});
		});
	}

	function temlate(x) {
		var content = $(tmpl($('#ideas').html(), x));
		$(content).appendTo('.ideas-massonry');

		buildGrid();
	}

	var search = function search() {
		var searchResult = $('.search__input').val();
		var API_KEY = '3150770-53193089bb4250fdf77fba4f1';
		$('.ideas-massonry').html(''); //clean results of previous search

		$.ajax({
			url: "https://pixabay.com/api/?key=" + API_KEY + "&per_page=50&q=" + encodeURIComponent(searchResult),
			dataType: 'json',
			success: function success(data) {
				console.log('data', data);

				try {
					if (data.total > 0) {
						temlate(data);
					} else {
						alert('No hits founds');
					};
				} catch (err) {
					console.log('ERROR', err);
					alert('Something goes wrong... \n-Hits are less than 20.- \nTry again');
				}
			},
			error: function error(_error) {
				console.log(_error);
			}
		});
		$('.search__input').val('');
	};

	search();

	$('.search__btn').on('click', search);
	$('.search__input').on('keypress', function (key) {
		if (key.keyCode == 13) {
			search();
		}
	});
});