$(document).ready(() => {
  let li = $('#major-list li')
  let mi = 0

  function updateMajor(newIdx) {
    li.eq(mi).removeClass('active')
    mi = newIdx
    li.eq(mi).addClass('active')
  }
  updateMajor(0)

  li.children().click(e => {
    updateMajor(li.children().index(e.target))
  })
})