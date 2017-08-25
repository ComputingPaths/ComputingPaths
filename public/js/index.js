$(document).ready(() => {
  //Code for the majors section
  let majorHooks = ['Bioinformatics majors address the growing need for trained computational biologists in the rapidly growing field of biological data analysis.',
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
  let mi = Math.floor(Math.random() * numMajors)
  //Get the list of majors
  let ul = $('#major-list li')
  //Set a pointer to the currect major
  let cur = ul.eq(mi)
  //Get the major name element
  let name = $('#major-name')
  // Get the major hook element
  let hook = $('#major-hook')
  //Active the current major
  cur.addClass('active')
  //Update major name display
  name.html(cur.html())

  let updateMajor = () => {
    cur.removeClass('active')
    cur = ul.eq(mi)
    cur.addClass('active')
    name.html(cur.html())
    hook.html(majorHooks[mi])
  }

  //Handle click event of the next major button
  $('#next-major').click(() => {
    mi = (mi + 1) % numMajors
    updateMajor()
  })

  $('#pre-major').click(() => {
    mi = (mi - 1 + numMajors) % numMajors
    updateMajor()
  })

  //Handle click event for major links
  ul.click(e => {
    mi = ul.index(e.target)
    updateMajor()
  })

  let carousel = $('.carousel')
  let projs = $('.projects article')
  let inner = $('.projects .carousel-inner')
  let cardPerGroup = 3
  
  let buildCards = () => {
    inner.empty()
    for (let i = 0; i < projs.length; i += cardPerGroup) {
      let group = $('<div class="carousel-item"></div>')
      if (i === 0) group.addClass('active')
      for (let j = 0; j < cardPerGroup; j++) {
        group.append(projs[(i + j) % projs.length])
      }
      inner.append(group)
    }
  }
  
  let mql = window.matchMedia('(max-width: 992px)')
  if (mql.matches) cardPerGroup = 2
  mql.onchange = e => {
    if (e.matches) {
      cardPerGroup = 2
      buildCards()
    }
    else {
      cardPerGroup = 3
      buildCards()
    }
  }
  mql = window.matchMedia('(max-width: 768px)')
  mql.onchange = e => {
    if (e.matches) {
      cardPerGroup = 1
      buildCards()
    }
    else {
      cardPerGroup = 2
      buildCards()
    }
  }
  if (mql.matches) cardPerGroup = 1
  buildCards()
    // Handle click event for projects carousel left scroll
  $('.prev-proj').click(() => {
    try {
      carousel.carousel('prev')
    }
    catch (err) {
    }
  })

  // Handle click event for projects carousel right scroll
  $('.next-proj').click(() => {
    try {
      carousel.carousel('next')
    }
    catch (err) {
    }
  })
})
