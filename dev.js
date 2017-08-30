const express = require('express')
const fs = require('fs')
const path = require('path')
const { Processor } = require('./processor')

let processor = new Processor()

processor.renderAll()

fs.watch('views', { recursive: true }, (event, filename) => {
  if (path.extname(filename) === '.pug') {
    processor.renderFile(filename)
    console.log(`${filename} re-rendered`)
  }
})

fs.watch('template.pug', (event, filename) => {
  processor.renderAll()
})

fs.watch('content.json', (event, filename) => {
  processor.renderAll()
})

const app = express()
app.use(express.static('dist'))
app.listen(3000)
