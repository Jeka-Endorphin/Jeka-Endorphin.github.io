(function ($) {
	
	$.fn.PL = function () {
		
		var elem = this;
			elem.on('click',act)

		function act () {
			elem.append(' !!!!!!! click');
		};	
	}

})(jQuery);