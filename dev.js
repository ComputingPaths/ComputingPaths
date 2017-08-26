const express = require('express')
const fs = require('fs')
const path = require('path')
const { Processor } = require('./render')

const processor = new Processor(() => {
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
    fs.readFile('content.json', 'utf8', (err, text) => {
      if (err) throw err
      processor.mergeLocals(JSON.parse(text))
      processor.renderAll()
    })
  }) 
})

const app = express()
app.use(express.static('public'))
app.listen(3000)
