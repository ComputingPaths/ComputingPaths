const express = require('express')
const render = require('./render')
const fs = require('fs')
const admin = require('firebase-admin')

const serviceAccount = require('./firebase-key.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://computing-paths.firebaseio.com'
})
let database = admin.database()
let root = database.ref('/')
root.on('value', snapshot => {
  console.log(snapshot.val())
})

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
