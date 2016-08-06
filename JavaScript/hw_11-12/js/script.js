$(function(){

	// tmpl
	var intro = $('#intro').html();

	var data = {
		name: 'Жека Endorphin',
		photoLink: 'img/im_cr.jpg',
		work: 'STAGE Studio',
		goal: 'Хочу стать профессиoналом Frontend, потому что:',
		goalItems: [
			'Люблю творить и создавать всоими руками',
			'Хочу пристойно зарабатывать',
			'Иметь возможность работать на фрилансе',
			'Развиваться в перспективной и интересной отрасле'
		],
		tel: 'Мой контактный номер телефона: <span class="span1">093 000 00 00</span>',
		skype: 'Skype: <span class="span2">Endorphinnnn</span>',
		vkStr: 'Мой профиль в ВК:</div><div class="breakline">',
		vkLink: 'http://vk.com/id22606806',
		feedbackTitle: 'Мой фидбек:',
		feedbackText: 'Приму предложение на должность Frontend Developer'
	};

	var content = tmpl(intro, data);
	$(content).insertBefore('#Carousel');

	var footer = $('#footer').html();
	var content2 = tmpl(footer, data);
	$('body').append(content2);

	//SLIDER
	$('.carousel-arrow-left').slideLeft();
	$('.carousel-arrow-right').slideRight();
});