$(document).ready(() => {
  $('.navbar-nav')
    .children()
    .children()
    .filter((i, e) => e.pathname === window.location.pathname)
    .addClass('active')
})