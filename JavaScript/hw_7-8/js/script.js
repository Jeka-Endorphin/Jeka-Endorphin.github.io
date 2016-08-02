'use strict'

$(function() {

  $('.tab-list li').on('click', function(e) {
    var currentEl = $(this).data('tab');
    console.log(currentEl);
    $('.tab-list li').removeClass('active');
    $(this).addClass('active');

    $('.tab-item').css({
      'visibility': 'hidden',
      'opacity': '0'
    });

    $('#'+currentEl).css({
      'visibility': 'visible',
      'opacity': '1'
    })
  });


  $('.row').hover(
    function(){
      $(this).find('.help').css({
        'visibility': 'visible',
        'opacity': '1'
      })
    },
    function(){
      $(this).find('.help').css({
        'visibility': 'hidden',
        'opacity': '0'
      })
    });

  var $button = $('.task2 button');
  $button.on('click', function (e) {
    $('.help').css({
      'visibility': 'visible',
      'opacity': '1'
    })
  });

});