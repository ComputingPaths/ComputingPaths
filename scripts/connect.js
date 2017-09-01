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
})
