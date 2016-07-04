'use strict'

function pow() { // наша целевая функция

 var num = prompt("Укажите целое число", ' ');

 	while ( isNaN(parseInt(num)) || !isFinite(num) ) {
 		num = prompt("Укажите целое число повторно", ' ');
 	};

 var exp = prompt("Укажите степень, в которую нужно возвести число " + exp + ' (должно быть целым)', ' ');

 	while ( isNaN(parseInt(exp)) || !isFinite(exp) ) {
 		exp = prompt("Укажите степень повторно (целое число)", ' ');
 	};


  var result = num;

	if ( exp == 0 ) {
		return console.log('Результат: ' + (result = 1));
	} if ( 0 < exp) {
    	for (var i = 1; i < exp; i++) {
      		result = result * num;
    	}
     	return console.log('Результат: ' + result);
	} else {	// степень отрицательное число
  		for (i = 1; i < Math.abs(exp); i++ ) {
    	  	result = result * num;
  		}
      	return console.log('Результат: ' + 1/result);
	}
}

pow();

//////////////////////

// var num = prompt("укажите целое число", '');
// var exp = prompt("укажите степень, в которую нужно возвести число", '');

// if (isNumeric(num)) {
//   console.log('Степень ' + exp +
//     'не поддерживается, введите целую степень (>=0)');
// } else {
//   console.log( pow(num, exp) );
// }


// if (exp < 0) {
//   console.log('Степень ' + exp +
//     'не поддерживается, введите целую степень (>=0)');
// } else {
//   console.log( pow(num, exp) );
// }

/*var num = prompt("enter your number", '12');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// проверка на ввод нестроки  
if (isNumeric(num)) {
	var result = num;
} else {
	while (!isNumeric(num)) {
  console.log(num);
	num = prompt("Re-enter your number");
	}
  var result = num;
};
alert('result = ' + result);




function pow(num, exp) { // наша целевая функция
  var result = num

  for (var i = 0; i < exp; i++) {
    result *= num;
  }

  return result;
}*/

