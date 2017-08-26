const express = require('express')
const render = require('./render')
const fs = require('fs')
const path = require('path')

render.init(() => {
  fs.watch('.', { recursive: true }, (event, filename) => {
    if (path.extname(filename) === '.pug') {
      render.renderAll()
    }
  })
})

const app = express()
app.use(express.static('public'))
app.listen(3000)
