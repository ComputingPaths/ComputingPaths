$(document).ready(() => {
  //Code for the majors section

  // Array of hooks for each major
  let majorHooks = [ 'Bioinformatics majors address the growing need for trained computational biologists in the rapidly growing field of biological data analysis.',
    'Cognitive Science students are at the forefront of researching solutions and developing technology designed to better suit humanity. ',
    'Computer Engineering students unite principles of mathematics and science to become architects of electronic systems.',
    'Computer science students gain knowledge in key computing theories and languages, directly preparing them to enter high tech industry.',
    'Data scientists use mathematics and computing to tackle the emerging need for data analysis in a wide range of industries.',
    'Electrical Engineering students unite principles of mathematics and science to become architects of electronic systems.',
    'Interdisciplinary Computing and the Arts students embody the new generation of artists and musicians.',
    'Math-Computer Science students focus on the intersection between mathematics and theoretical computer science.',
    'Scientific Computation majors bridge the gap between applied mathematics, physics, and computer science.']

  const numMajors = 9
  //Generate a random major index [0 ~ 8]
  let i = Math.floor(Math.random() * numMajors)
  //Get the list of majors
  let ul = $('#major-list li')
  //Set a pointer to the currect major
  let cur = ul.eq(i)
  //Get the major name element
  let name = $('#major-name')
  // Get the major hook element
  let hook = $('#major-hook')
  //Active the current major
  cur.addClass('active')
  //Update major name display and major hook
  name.html(cur.html())
  hook.html(majorHooks[i])

  let updateMajor = ()=>{
    cur.removeClass('active')
    cur = ul.eq(i)
    cur.addClass('active')
    name.html(cur.html())
    hook.html(majorHooks[i])
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

  // Handle click event for projects carousel left scroll
  $('#left').click(() => {
      $('#carouselExampleIndicators').carousel('prev')
  })

  // Handle click event for projects carousel right scroll
  $('#right').click(() => {
      $('#carouselExampleIndicators').carousel('next')
  })

})
