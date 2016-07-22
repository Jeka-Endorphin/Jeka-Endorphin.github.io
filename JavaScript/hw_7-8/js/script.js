'use strict'

$(function() {
  
  var $tabs = $('.area > div');

  $tabs.on('click', function(e) {
    $tabs.removeClass('active');
    var $tab = $(e.target);
    var $tabClass = e.target.className;
    $tab.addClass('active');
    var $paragraph = $('p.'+ $tabClass); 
    $(".wrapper p").hide();
    $paragraph.show();
  })

});