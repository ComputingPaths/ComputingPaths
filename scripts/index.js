// initialize the majors section
function majorsSection() {
  // get the list of majors
  let ul = $('.majors aside li')
  let hooks = $('.majors main h2')
  let name = $('.majors main h1')
  let links = $('.majors button a')
  let image = $('.majors main img')

  // generate a random major index
  let mi = Math.floor(Math.random() * ul.length)

  // update the current major related element
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

  // handle click event of the next major button
  $('#next-major').click(() => {
    updateMajor((mi + 1) % ul.length)
  })
  // handle click event of the prev major button
  $('#prev-major').click(() => {
    updateMajor((mi - 1 + ul.length) % ul.length)
  })
  // handle click event for major links
  ul.click(e => {
    updateMajor(ul.index(e.target))
  })
}

function initProjCarousel() {
  let carousel = $('.carousel')
  let projs = $('.projects .proj-card')
  let inner = $('.projects .carousel-inner')
  let indicator = $('.projects nav div')
  let cardPerGroup = 2
  let pi = 0;

  // update the indicators on the carousel
  let updateIndicator = newIndex => {
    indicator.children().eq(pi).removeClass('active')
    pi = newIndex
    indicator.children().eq(pi).addClass('active')
  }
  
  // build project cards inside the carousel
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
    indicator.children().click(function () {
      updateIndicator(indicator.children().index(this))
      carousel.carousel(pi)
    })
  }
  
  // set media query callback
  let mql = window.matchMedia('(max-width: 991px)')
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
  
  // handle click event for projects carousel left scroll
  $('.prev-proj').click(() => {
    try {
      carousel.carousel('prev')
      updateIndicator((pi - 1 + indicator.children().length) % indicator.children().length)
    }
    catch (err) {
    }
  })

  // handle click event for projects carousel right scroll
  $('.next-proj').click(() => {
    try {
      carousel.carousel('next')
      updateIndicator((pi + 1) % indicator.children().length)
    }
    catch (err) {
    }
  })
}

$(document).ready(() => {
  majorsSection()
  initProjCarousel()
})
