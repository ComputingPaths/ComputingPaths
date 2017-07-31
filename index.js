const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/sample', (req, res) => {
    res.render('sample', {} )
})
app.get('/majors', (req, res) => {
    res.render('majors', {} )
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
