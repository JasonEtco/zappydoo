const IfElse = require('./if-else')

class Block {
  static identify (name, value, contents) {
    if (name === 'if') {
      return new IfElse(value, contents)
    }

    return false
  }
}

module.exports = Block
