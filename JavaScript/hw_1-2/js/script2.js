'use strict'
var myArr = [];
myArr.length = 5;

for (var i = 0; i < myArr.length; i++) {
	myArr[i] = prompt('Введите ' + (i + 1) + '-е имя для внесения в список');
	
	while (!myArr[i]) {
		myArr[i] = prompt('Введите же хоть какое-то значение для  ' + (i + 1) + '-го имени :)', ' ');
	}
};

/*for (var i = 0; i < myArr.length; i++) {
	myArr[i] = prompt('Введите ' + (i + 1) + '-е имя для внесения в список');
	if (myArr[i] == null) {
		alert('! Ввод отменён !');
	} else {
		while (myArr[i] == (undefined || '' || ' ')) {
			myArr[i] = prompt('Введите же хоть какое-то значение :)', ' ');
		}
	}
};*/


console.log('Массив = ' + myArr);

var userName = prompt('Укажите имя пользователя');
console.log('userName: ' + userName);

find(myArr, userName);

function find(arr, x) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === x) {
			return alert(x + ", вы успешно вошли");
		}
	}
	return alert('Ошибка! Пользователь "' + userName + '" не найден. Проверьте корректность имени пользователя (в том числе регистр) и попробуйте ещё раз.');
}

