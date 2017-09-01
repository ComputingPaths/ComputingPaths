$(document).ready(function() {
  
//  $('.filtered').on('click',function(e){
//    console.log($(this).attr('data-projectName'))
//    
//    var projectName = $(this).attr('data-projectName')
//    $('.modal-content').data('project', projectName);
//
//  })
  
  //for each project card and modal, assign them
  //corresponding data-target and id fields to link them...
  //if someone with more time can link them without 
  //creating a modal for each card like i tried to above
  //that would be greatly appreciated.

  let index = 0;
  $.each($(".filtered"), function(index, value){
    var num = index + 1;
    $(value).attr("data-target","#proj-modal" + num);
  });
  
  index = 0;
  
  $.each($(".modal"), function(index, value){
  var num = index + 1;
  $(value).attr("id","proj-modal" + num);
  });
  
  index = 0;
  $.each($(".carousel"), function(index, value){
  var num = index + 1;
  $(value).attr("id","proj-carousel" + num);
  });

  index = 0;
  $.each($(".carousel-control-prev"), function(index, value){
  var num = index + 1;
  $(value).attr("href","#proj-carousel" + num);
  });

  index = 0;
  $.each($(".carousel-control-next"), function(index, value){
  var num = index + 1;
  $(value).attr("href","#proj-carousel" + num);
  });
  
  
  //source: https://stackoverflow.com/questions/21349984/how-to-make-bootstrap-carousel-slider-use-mobile-left-right-swipe
//  $(".this").on("touchstart", function(event){
//        var xClick = event.originalEvent.touches[0].pageX;
//    $(this).one("touchmove", function(event){
//        var xMove = event.originalEvent.touches[0].pageX;
//        if( Math.floor(xClick - xMove) > 5 ){
//            $(".carousel").carousel('next');
//        }
//        else if( Math.floor(xClick - xMove) < -5 ){
//            $(".carousel").carousel('prev');
//        }
//    });
//    $(".carousel").on("touchend", function(){
//            $(this).off("touchmove");
//    });
//  });
})
