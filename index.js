const express = require('express')
const render = require('./render')
const fs = require('fs')

render.renderAll()
console.log('all views are re-rendered')

fs.watch('views', { recursive: true }, (event, filename) => {
  try {
    render.renderFile(filename)
    console.log(`${filename} re-rendered`)
  }
  catch (err) {
  }
})

fs.watch('template.pug', (event, filename) => {
  render.renderAll()
  console.log('all views are re-rendered')
})

const app = express()
app.use(express.static('public'))
app.listen(3000)
