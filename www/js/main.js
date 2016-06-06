/* Projects page */
$(document).ready(function(){
  adjustSize();
});

$(window).resize(function(){
    adjustSize();
});

function adjustSize(){
     $('.project').height($('.project').width());
     $('.about-us,.contact-us').height($(window).height()-167);
     $('.swiper-container').height($(window).height());
}

