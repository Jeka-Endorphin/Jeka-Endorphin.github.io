(function($) {
	
	var leftPosition = document.querySelector('.carousel-list');
    var currentLeftValue = parseInt(leftPosition.style.left) || 0;
	var elementsList = $('.carousel-list');
	    var elementsCount = elementsList.find('li').length;
		var pixelsOffset = 165;
	    var elementsCount = elementsList.find('li').length;
   	    var maximumOffset = 0;
	    var minimumOffset = - ((elementsCount - 4) * pixelsOffset); // , где 4 - количество видимых картинок 
	    console.log('minimumOffset = '+ minimumOffset)
	$.fn.slideLeft  = function() {
		var leftControl = this;

		leftControl.on('click', function() {
			 if (currentLeftValue != maximumOffset) {
				currentLeftValue += 165;
		        elementsList.animate({left: currentLeftValue + "px"}, 500);
		      }  else {
		      	currentLeftValue = minimumOffset;
		      	elementsList.animate({left: currentLeftValue + "px"}, 600, 'easeInBack');
		      }

			console.log('currentLeftValue l ='+currentLeftValue )
		} );
	};

	$.fn.slideRight  = function(el) {
		
		var rightControl = this;

		rightControl.on('click', function() {
			if(currentLeftValue != minimumOffset){
				currentLeftValue -=165;
				elementsList.animate({left: currentLeftValue +'px'}, 500);
		  	} else {
		  		currentLeftValue = maximumOffset;
				elementsList.animate({left: currentLeftValue +'px'}, 600, 'easeInBack');
		  	}
				console.log('currentLeftValue', currentLeftValue)
		});
	}


})(jQuery);
