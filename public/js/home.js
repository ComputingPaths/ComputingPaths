$(document).ready(() => {
  //Code for the majors section

  const numMajors = 9
  //Generate a random major index [0 ~ 8]
  let i = Math.floor(Math.random() * numMajors)
  //Get the list of majors
  let ul = $('#major-list li')
  //Set a pointer to the currect major
  let cur = ul.eq(i)
  //Get the major name element
  let name = $('#major-name')
  //Active the current major
  cur.addClass('active')
  //Update major name display
  name.html(cur.html())

  //Handle click event of the next major button
  $('#next-major-btn').click(() => {
    //Deactivate the current major
    cur.removeClass('active')
    //Move to the next major
    i = (i + 1) % numMajors
    cur = ul.eq(i)
    //Activate the new major
    cur.addClass('active')
    //Update major name
    name.html(cur.html())
  })

  //Handle click event for major links
  ul.click(e => {
    cur.removeClass('active')
    i = ul.index(e.target)
    cur = $(e.target)
    cur.addClass('active')
    name.html(cur.html())
  })

  // Handle click event for projects carousel left scroll
  $('#left').click(() => {
      $('#carouselExampleIndicators').carousel('prev')
  })

  // Handle click event for projects carousel right scroll
  $('#right').click(() => {
      $('#carouselExampleIndicators').carousel('next')
  })

})
