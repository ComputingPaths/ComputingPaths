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

  let updateMajor = ()=>{
    cur.removeClass('active')
    cur = ul.eq(i)
    cur.addClass('active')
    name.html(cur.html())
  }

  //Handle click event of the next major button
  $('#next-major').click(() => {
    i = (i + 1) % numMajors
    updateMajor()
  })

  $('#pre-major').click(() => {
    i = (i - 1 + numMajors) % numMajors
    updateMajor()
  })

  //Handle click event for major links
  ul.click(e => {
    i = ul.index(e.target)
    updateMajor()
  })

  $('#left').click(() => {
      $('#carouselExampleIndicators').carousel('prev')
  })

  $('#right').click(() => {
      $('#carouselExampleIndicators').carousel('next')
  })

})
