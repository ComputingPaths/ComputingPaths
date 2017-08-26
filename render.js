const fs = require('fs')
const pug = require('pug')
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json')

let cache = {}
function init(callback) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://computing-paths.firebaseio.com'
  })
  let database = admin.database()
  let root = database.ref('/')
  root.on('value', snapshot => {
    cache = snapshot.val()
    renderAll()
  })
  if (callback) callback()
}

function renderIndex() {
  renderFile('index.pug', { majorNames: cache['major-names'] })
}

function renderFile(name, option = {}) {
  let html = pug.renderFile(`views/${name}`, option)
  fs.writeFile(`public/${name.replace('pug', 'html')}`, html, err => {
    if (err) throw err
    })
}
  
function renderAll() {
  renderIndex()
  renderFile('majors.pug')
  renderFile('projects.pug')
  renderFile('stories.pug')
  console.log('All files re-rendered')
}

  
exports.init = init
exports.renderAll = renderAll