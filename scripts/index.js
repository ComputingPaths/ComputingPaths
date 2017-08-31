function majorsSection() {
  //Get the list of majors
  let ul = $('.majors aside li')
  let hooks = $('.majors main h2')
  let name = $('.majors main h1')
  let links = $('.majors button a')
  let image = $('.majors main img')
  //Generate a random major index
  let mi = Math.floor(Math.random() * ul.length)

  let updateMajor = (newIndex) => {
    ul.eq(mi).removeClass('active')
    hooks.eq(mi).removeClass('active')
    links.eq(mi).removeClass('active')
    image.eq(mi).removeClass('active')
    mi = newIndex
    ul.eq(mi).addClass('active')
    name.html(ul.eq(mi).html())
    hooks.eq(mi).addClass('active')
    links.eq(mi).addClass('active')
    image.eq(mi).addClass('active')
  }
  updateMajor(mi)

  //Handle click event of the next major button
  $('#next-major').click(() => {
    updateMajor((mi + 1) % ul.length)
  })

  $('#prev-major').click(() => {
    updateMajor((mi - 1 + ul.length) % ul.length)
  })

  //Handle click event for major links
  ul.click(e => {
    updateMajor(ul.index(e.target))
  })
}

$(document).ready(() => {
  majorsSection()

  let carousel = $('.carousel')
  let projs = $('.projects article')
  let inner = $('.projects .carousel-inner')
  let indicator = $('.projects nav ul')
  let cardPerGroup = 3
  let pi = 0;

  let updateIndicator = newIndex => {
    indicator.children().eq(pi).removeClass('active')
    pi = newIndex
    indicator.children().eq(pi).addClass('active')
  }

  let buildCards = () => {
    inner.empty()
    indicator.empty()
    for (let i = 0; i < projs.length; i += cardPerGroup) {
      let group = $('<div class="carousel-item"></div>')
      if (i === 0) group.addClass('active')
      for (let j = 0; j < cardPerGroup; j++) {
        if (i + j >= projs.length) {
          group.append(projs.eq((i + j) % projs.length).clone())
        }
        else {
          group.append(projs[i + j])
        }
      }
      inner.append(group)
      $('<i class="fa fa-circle"></i>').appendTo(indicator)
    }

    updateIndicator(0)
    indicator.children().click(e => {
      updateIndicator(indicator.children().index(e.target))
      carousel.carousel(pi)
    })
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
      updateIndicator((pi - 1 + indicator.children().length) % indicator.children().length)
    }
    catch (err) {
    }
  })

  // Handle click event for projects carousel right scroll
  $('.next-proj').click(() => {
    try {
      carousel.carousel('next')
      updateIndicator((pi + 1) % indicator.children().length)
    }
    catch (err) {
    }
  })
})
