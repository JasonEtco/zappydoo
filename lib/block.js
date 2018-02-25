const IfElse = require('./if-else')

class Block {
  static identify (name, value, contents, data) {
    if (name === 'if') {
      return new IfElse(value, contents, data)
    }

    return false
  }
}

module.exports = Block
