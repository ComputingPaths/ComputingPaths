const fs = require('fs')
const pug = require('pug')
const admin = require('firebase-admin')
const camelCase = require('camelcase')
const path = require('path')
const serviceAccount = require('./firebase-key.json')

class Processor {
  constructor(callback) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://computing-paths.firebaseio.com'
    })
    let database = admin.database()
    let root = database.ref('/')
    root.on('value', snapshot => {
      let cache = snapshot.val()
      this.locals = {}
      for (let key in cache) {
        this.locals[camelCase(key)] = cache[key]
      }
      this.mergeLocals(require('./content'))
      this.renderAll()
    })
    if (callback) callback()
  }

  renderFile(name) {
    let html = pug.renderFile(`views/${name}`, this.locals)
    fs.writeFile(`public/${name.replace('pug', 'html')}`, html, err => {
      if (err) throw err
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

  mergeLocals(vars) {
    if (!this.locals || !vars) return
    Object.assign(this.locals, vars)
  }
}

exports.Processor = Processor