$(document).ready(() => {
  //Code for the majors section

  //Generate a random major index [0 ~ 8]
  let i = Math.floor(Math.random() * 9)
  //Get the list of majors
  let ul = $('#major-list').children()
  //Set a pointer to the currect major
  let cur = ul.eq(i)
  //Get the major name element
  let name = $('#major-name')
  //Active the current major
  cur.addClass('active')
  //Update major name display
  name.html(cur.html())

  //Handle click event of the next major button
  $('#next-major-btn').click(() => {
    //Deactivate the current major
    cur.removeClass('active')
    //Move to the next major
    cur = cur.next()
    if (cur.length === 0) cur = ul.first()
    //Activate the new major
    cur.addClass('active')
    //Update major name
    name.html(cur.html())
  })

  //Handle click event for major links
  ul.click(e => {
    cur.removeClass('active')
    cur = $(e.target)
    cur.addClass('active')
    name.html(cur.html())
  })
})