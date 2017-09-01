$(document).ready(() => {
  // only expand one card at a time
  let text = $('.text.collapse')
  let toggle = $('a.header')
  let curIdx = 0

  toggle.click(function () {
    text.eq(curIdx).collapse('hide')
    curIdx = toggle.index(this)
  })
  // end expand card logic

  // handle carousel indicators
  let carousel = $('.carousel')
  let indicators = $('.indicator svg circle')
  indicators.eq(0).addClass('active')

  // update indicator when a new slide shows up
  carousel.on('slide.bs.carousel', (e) => {
    indicators.removeClass('active')
    indicators.eq(carousel.children().children().index(e.relatedTarget)).addClass('active')
  })

  // jump to the corresponding page when an indicator is clicked
  indicators.click(function () {
    carousel.carousel(indicators.index(this))
  })
})