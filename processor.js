const fs = require('fs')
const pug = require('pug')
const camelCase = require('camelcase')
const path = require('path')

class Processor {
  renderFile(name) {
    this.loadDB(locals => {
      let html = pug.renderFile(`views/${name}`, locals)
      fs.writeFile(`public/${name.replace('pug', 'html')}`, html, err => {
        if (err) throw err
      })
    })
  }

  renderAll() {
    fs.readdir('views', (err, files) => {
      if (err) throw err
      for (let file of files) {
        if (path.extname(file) !== '.pug') continue
        this.renderFile(file)
      }
    })
    console.log('all files are re-rendered')
  }

  loadDB(callback) {
    fs.readFile('content.json', 'utf8', (err, text) => {
      if (err) throw err
      callback(JSON.parse(text))
    })
  }
}

exports.Processor = Processor