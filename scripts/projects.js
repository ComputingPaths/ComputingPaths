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
})
