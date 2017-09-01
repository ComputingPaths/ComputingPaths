$(document).ready(() => {
  let li = $('#major-list li')
  let mi = 0

  // update the current active sidebar element
  function updateMajor(newIdx) {
    li.eq(mi).removeClass('active')
    mi = newIdx
    li.eq(mi).addClass('active')
  }
  updateMajor(0)

  // call updateMajor when a sidebar element is clicked
  li.click(function () {
    updateMajor(li.index(this))
  })
})