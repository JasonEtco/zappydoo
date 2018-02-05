const fs = require('fs')
const path = require('path')

module.exports = {
  readFile (...args) {
    return fs.readFileSync(path.join(__dirname, 'fixtures', ...args), 'utf8')
  }
}
