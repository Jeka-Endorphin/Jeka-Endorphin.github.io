var ms = 0;
var state = 0;
var time = document.querySelector('.timebox');
var milliseconds = document.querySelector('p');
var btnStart = document.querySelector('.Start');
		btnStart.innerHTML = "Start"

var btnReset = document.querySelector('.Reset');
var btnSplit = document.querySelector('.Split');
var ol = document.querySelector('ol');

	btnStart.addEventListener('click', startstop);
	btnSplit.addEventListener('click', split);
	btnReset.addEventListener('click', reset);

var cyferblat = function(delta) {
  var ms, s, m, h, timeView;
	ms = delta%1000 +'';
	s = Math.floor(delta/1000)%60;
	m = Math.floor(delta/60000)%60;
	h = Math.floor(delta/360000)%60;
	if (h < 10) h = '0'+ h;
	if (m < 10) m = '0'+ m;
	if (s < 10) s = '0'+ s;
	if (ms.length < 3) {
		var j = ms.length;
		for (var i = 0; i < j-1; i++) {
			ms = '0' + ms;
		}
	}
	return time.innerHTML = h + ':' + m + ':' + s + ' .<span>'+ms +'<span>';	
};

function startstop() {
	if (state == 0) {
		state = 1;
		startTime = new Date();
		startTime.setTime(startTime.getTime() - ms);
		btnStart.innerHTML = "Stop";

	} else {
		state = 0;
		now = new Date();
		ms = now.getTime() - startTime.getTime();
		btnStart.innerHTML = "Start"
		var stopCount = document.createElement('li');
		stopCount.innerHTML ='stop : ' + cyferblat(ms);
		ol.appendChild(stopCount);
   }
};

function split(argument) {
	var splitCount = document.createElement('li');
	splitCount.innerHTML ='split : ' + cyferblat(ms);
	ol.appendChild(splitCount);
}

function reset() { //сброс счётчика
	state = 0;
	ms = 000;
	cyferblat(ms);
	btnStart.innerHTML = "Start again :)";
	var removeChildren = function (elem) { //очистка списка временных меток
	  while (elem.lastChild) {
	    elem.removeChild(elem.lastChild);
	  }
	}(ol);
}

function display() {
	setTimeout(display, 50);
	if (state == 1)  {
		now = new Date();
		ms = now.getTime() - startTime.getTime();
		cyferblat(ms);
   }
}

window.addEventListener('load', display());
