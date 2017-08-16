const fs = require('fs')
const xml = require('xml2js')
const pug = require('pug')

exports.renderDynamic = () => {
  fs.readdir('views/dynamic', (err, files) => {
    if (err) throw err

    for (let file of files) {
      file = file.slice(0, -4)

      fs.readFile(`contents/${file}.xml`, 'utf8', (err, data) => {
        if (err) throw err

        xml.parseString(data, (err, obj) => {
          if (err) throw err

          let html = pug.renderFile(`views/dynamic/${file}.pug`, obj)
          fs.writeFile(`public/${file}.html`, html, err => {
            if (err) throw err
          })
        })
      })
    }
  })
}

exports.renderStatic = () => {
  fs.readdir('views/static', (err, files) => {
    if (err) throw err

    for (let file of files) {
      file = file.slice(0, -4)

      let html = pug.renderFile(`views/static/${file}.pug`)
      fs.writeFile(`public/${file}.html`, html, err => {
        if (err) throw err
      })
    }
  })
}
