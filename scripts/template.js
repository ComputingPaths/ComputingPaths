let colors = ['EDABFF', 'ABDBFF', 'FF8585', 'ADFFC8', 'FFD5AD', 'C2ADFF']
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
  })

  let tags = $('.tag')
  if (!tags.length) return
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