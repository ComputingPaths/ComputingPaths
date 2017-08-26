const fs = require('fs')
const pug = require('pug')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://computing-paths.firebaseio.com'
})
let database = admin.database()
let root = database.ref('/')
root.on('value', snapshot => {
  //console.log(snapshot.val())
  renderAll(snapshot.val())
})

function renderIndex(db) {
  console.log(db)
  renderFile('index', { majorNames: db['major-names'] })
}

function renderFile(name, option = {}) {
  let html = pug.renderFile(`views/${name}.pug`, option)
  fs.writeFile(`public/${name}.html`, html, err => {
    if (err) throw err
  })
}
exports.renderFile = renderFile

function renderAll(db) {
  renderIndex(db)
  renderFile('majors')
  renderFile('projects')
  renderFile('stories')
  console.log('All views are re-rendered')
}
exports.renderAll = renderAll