'use strict'

var data = JSON.parse(localStorage.getItem("data"));

var html = $('#html').html();
var content = tmpl(html, {data: data});
$('body').prepend(content);


var modal = {
  genModal: function() {
    var mod = $('<div id="openModal" class="modalDialog"></div>');
    var closeLink = $('<a href="#close" title="Закрыть" class="close">X</a>');
    var innerMod = $('<div ></div>').attr('id', 'innerMod'); 
    innerMod.prepend(closeLink, '<h2></h2>');
    mod.prepend(innerMod).prependTo('body');
  }
}  
modal.genModal();

var radioAll = document.querySelectorAll( 'input[type=radio]' );
var checkedRadio = [];

var checkResult = function(e) {
  e.preventDefault();
  for (var i=0; i < radioAll.length; i++) {
    if (radioAll[i].checked == true) {
      var value = radioAll[i].getAttribute('value'); 
      checkedRadio.push(value)
    };
  };

  if( checkedRadio == String(data.rightAnsw) ) {
    $(openModal).addClass('modalDialog--active')
    .css('background', 'rgba(100,250,100,0.8)')
    .find('h2')
    .html('Тест пройден успешно!');
  } else {
    $(openModal).addClass('modalDialog--active')
    .css('background', 'rgba(0,0,0,0.8)')
    .find('h2')
    .html('Тест провален. Попробуйте еще.');
  }

  checkedRadio = [];

  for (var i=0; i < radioAll.length; i++) {
    if (radioAll[i].checked == true)
      radioAll[i].checked = false;
  };
};

document.querySelector('#submit').addEventListener('click', checkResult);

//close link
$('.close').on('click', function() {
  $(openModal).removeClass('modalDialog--active')
});


//close except target
$(document).click(function (event) {
  if ($(event.target).closest('#innerMod').length == 0 && $(event.target).attr('id') != 'submit' ) {
   $(openModal).removeClass('modalDialog--active');
 }
});

