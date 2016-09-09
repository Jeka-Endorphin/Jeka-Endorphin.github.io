// 'use strict'

//slick slider
$(function(){
  $('.slider-slick').slick({
    dots: true,
    speed: 0,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  });

  //accordion
  $( "#accordion" ).accordion({
    animate: 100,
    collapsible: true,
    heightStyle: "content"
  });
  
  //Read More
  $('.features__expand__arrow').on('click', function(e){
    e.preventDefault();
    $(e.target)
          .parent()
          .parent()
          .find('.features__content')
          .toggleClass('height-auto');
  });

  // 2nd part
  var data = $.ajax({
      async: false,
      url: 'js/data.json',
      dataType: 'json'
  }).responseJSON;
  // console.log(data);
  
  var skills = _.sortBy(_.uniq(_.flatten(_.map(data, 'skills'))));
  console.log(skills);
  var names = _.map(_.sortBy(data, ['friends']), 'name');
  console.log(names);
  var friends = _.uniq(_.map(_.flattenDeep(_.map(data, 'friends')), 'name'));
  console.log(friends);

});

