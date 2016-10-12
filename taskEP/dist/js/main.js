'use strict';

$(function () {

  // show account
  $('.auth').one('click', function () {
    $(this).animate({
      opacity: 0 }, 400, function () {
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
    $('.address-form').toggle(400);
  });

  // expand activiyies
  var counter = null;
  $('.activities-expand').on('click', function (event) {
    event.preventDefault();
    $('.activities-collapse').toggle(400);

    counter = counter ? 0 : 1;

    counter ? $(this).html('Свернуть') : $(this).html('Показать еще');
  });
});