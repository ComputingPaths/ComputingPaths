$(document).ready(() => {
  let text = $('.text.collapse')
  let toggle = $('.header a')
  let curIdx = 0

  toggle.click(e => {
    text.eq(curIdx).collapse('hide')
    curIdx = toggle.index(e.target)
  })

  let carousel = $('.carousel')
  let indicators = $('.indicator svg circle')
  indicators.eq(0).addClass('active')

  carousel.on('slide.bs.carousel', (e) => {
    indicators.removeClass('active')
    indicators.eq(carousel.children().children().index(e.relatedTarget)).addClass('active')
  })

  indicators.click(e => {
    carousel.carousel(indicators.index(e.target))
  })
})