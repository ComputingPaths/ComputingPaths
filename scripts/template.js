let colors = ['EDABFF', 'ABDBFF', 'FF8585', '50E3C2', 'FFD5AD', 'C2ADFF']
let grey = 'C6D1D7';

function initNideSidebar() {
  let li = $('.nice-sidebar li')
  if (!li.length) return

  let colorMap = new Map()
  li.each((i, e) => {
    e = $(e)
    colorMap[e.html()] = colors[i]
    e.addClass('active')
    e.css('color', colorMap[e.html()])
  })

  let filtered = $('.filtered')
  let removed = []
  li.click(e => {
    e = $(e.target)

    if (e.hasClass('active')) {
      e.removeClass('active')
      e.css('color', grey)
    }
    else {
      e.addClass('active')
      e.css('color', colorMap[e.html()])
    }

    filtered.each((fi, fe) => {
      if ($(fe).find('.tag').is((ti, te) => li.filter('.active').is((ai, ae) => te.innerHTML === ae.innerHTML))) {
        if (removed[fi]) {
          $(fe).css('display', removed[fi])
          removed[fi] = undefined
        }
      }
      else {
        if (!removed[fi]) {
          removed[fi] = $(fe).css('display')
          $(fe).css('display', 'none')
        }
      }
    })
  })

  let tags = $('.tag')
  tags.each((i, e) => {
    $(e).css('background-color', colorMap[e.innerHTML])
  })
}

function flipOnClick() {
  $('.flip-on-click').click(e => {
    $(e.target).find('i').toggleClass('fa-flip-vertical')
  })
}

$(document).ready(() => {
  $('.navbar-nav')
    .children()
    .children()
    .filter((i, e) => e.pathname === window.location.pathname)
    .addClass('active')

  initNideSidebar()
  flipOnClick()
})