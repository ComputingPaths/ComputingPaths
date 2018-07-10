// predefined colors of tags
let colors = ['#EDABFF', '#ABDBFF', '#F9EE6D', '#FF8585', '#50E3C2', '#FFD5AD', '#C2ADFF']
let grey = '#C6D1D7'

// initilize the tagging and filtering system
function initNiceSidebar() {
	
  // return if no sidebar presents
  let li = $('.nice-sidebar li')
  if (!li.length) return

  // build the mapping between tag name and color
  let colorMap = new Map()
  li.each((i, e) => {
    e = $(e)
    colorMap[e.html()] = colors[i]
    //e.addClass('active')
    e.css('color', grey)
    //e.css('color', colorMap[e.html()])
  })

  // elements to be filtered
  let filtered = $('.filtered')
  let removed = []
  let tags = $('.tag')
  
  // trigger filter when a list element is clicked
  li.click(function() {
    let e = $(this)

    if (e.hasClass('active')) {
      // deactivate tag
      e.removeClass('active')
      e.css('color', grey)
      tags.filter((ti, te) => te.innerHTML === e.html()).css('background-color', grey)
    }
    else {
      // activate tag
      e.addClass('active')
      e.css('color', colorMap[e.html()])
      tags.filter((ti, te) => te.innerHTML === e.html()).css('background-color', colorMap[e.html()])
    }

    // filter elements
    filtered.each((fi, fe) => {
      // if the current element should show up
      fe = $(fe)
      if (fe.find('.tag').is((ti, te) => li.filter('.active').is((ai, ae) => te.innerHTML === ae.innerHTML))) {
        if (removed[fi]) {
          // show the element
          fe.css('display', removed[fi])
          fe.hide().fadeIn(500)
          removed[fi] = undefined
        }
      }
      else {
        if (!removed[fi]) {
          // else hide the element
          removed[fi] = fe.css('display')
          fe.fadeOut(500, function () {
            fe.css('display', 'none')
          })
        }
      }
    })
  })

  // apply initial color to all tags
  tags.each((i, e) => {
    $(e).css('background-color', colorMap[e.innerHTML])
  })
}

// initialize the .flip-on-click class.
// arrows with this class will be flipped on click
function flipOnClick() {
	$('.flip-on-click').click(function () {
		$(this).find('i').toggleClass('fa-flip-vertical')
	})
}

// initialize the sidebae
function initNavbar() {
	// apply the .active class to the current nav link
	$('.navbar-nav')
		.children()
		.children()
		.filter((i, e) => e.pathname === window.location.pathname)
		.addClass('active')
}

$(document).ready(() => {
	initNavbar()
	initNiceSidebar()
	flipOnClick()
})