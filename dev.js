const fs = require('fs-extra')
const path = require('path')
const pug = require('pug')

let locals = JSON.parse(fs.readFileSync('content.json', 'utf8'));

function renderFile(name) {
  if (path.extname(name) !== '.pug') return;
  if (!fs.existsSync('views/' + name)) return;

  let html = pug.renderFile('views/' + name, locals)
  fs.writeFileSync('dist/' + name.replace('pug', 'html'), html)
  console.log(name + ' re-rendered')
}

function renderAll() {
  let files = fs.readdirSync('views')
  for (let file of files) {
    renderFile(file)
  }
  console.log('all files are re-rendered')
}

renderAll()
fs.copySync('images', 'dist/img')

if (process.argv[2] !== '--watch') process.exit();

fs.watch('views', { recursive: true }, (event, filename) => {
  renderFile(filename)
})

fs.watch('template.pug', () => {
  console.log('template.pug has been changed')
  renderAll()
})

fs.watch('content.json', () => {
  console.log('content.json has been changed')
  let data = fs.readFileSync('content.json', 'utf8')
  if (!data) return
  locals = JSON.parse(data)
  renderAll()
})

fs.watch('images', { recursive: true }, () => {
  fs.copySync('images', 'dist/img')
  console.log('images are copied to dist')
})
