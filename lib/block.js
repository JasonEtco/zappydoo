const IfElse = require('./if-else')

class Block {
  static identify (name, value, contents) {
    if (this.name === 'if') {
      return new IfElse(name, value, contents)
    }

    return false
  }
}

module.exports = Block
