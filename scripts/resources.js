$(document).ready(() => {
  let text = $('.text.collapse')
  let toggle = $('.header a')
  let curIdx = 0

  toggle.click(e => {
    text.eq(curIdx).collapse('hide')
    curIdx = toggle.index(e.target)
  })
})