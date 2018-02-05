const constants = require('./constants')
const IfElse = require('./if-else')

class Block {
  static identify (str) {
    if (constants.regexes.blockFunc('if').test(str)) {
      return new IfElse(str)
    }

    return false
  }
}

module.exports = Block
