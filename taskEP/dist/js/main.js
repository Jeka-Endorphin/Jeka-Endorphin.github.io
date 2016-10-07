'use strict';

$(function () {

  // show account
  $('.auth').one('click', function () {
    $(this).animate({
      opacity: 0 }, 500, function () {
      $(this).hide();
    });
    $('.account').removeClass('account--hidden');
  });

  // account expanded
  $('.account__user-name, .account__arrow').on('click', function () {
    $(this).parent().toggleClass('account__inner-wrapper--expanded');
  });

  // address edit
  $('.address-edit').on('click', function () {
    $('.address-form').toggle('true');
  });

  // expand activiyies
  $('.activities-expand').on('click', function () {
    $('.activities-collapse').toggle();
    // $('.activities-collapse').toggleClass('.activities-collapse--expand');
  });
});