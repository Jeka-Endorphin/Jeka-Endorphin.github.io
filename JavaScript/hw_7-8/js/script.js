'use strict'

$(function() {
  
  var $tabs = $('.area > div');
  var $paragraphAll = $(".task1__wrapper p");

  $tabs.on('click', function(e) {
    $tabs.removeClass('active');
    var $tab = $(e.target);
    var $tabClass = e.target.className;
    $tab.addClass('active');
    var $paragraph = $('p.'+ $tabClass); 
    $paragraphAll.hide(500);
    $paragraph.show('fast');
  })

  var $inp = $('form input');
  var $help = $('.help');
  var $button = $('.task2 button');

  $inp.hover(function (e) {
    var $target = $(e.target);
    $target.next().show('fast');
  }, function (e) {
    var $target = $(e.target);
    $target.next().hide(1000);
  })

  $button.on('click', function (e) {
    $help.show('fast');
  })
});