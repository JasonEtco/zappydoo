const constants = require('./constants')

class IfElse {
  constructor (str) {
    this.str = str
  }

  /**
   * Runs a comparison method
   * @param {any} x - Left side of comparator
   * @param {any} y - Right side of comparator
   * @param {string} comparator - Comparator string (===, >, etc)
   * @returns {boolean}
   */
  compare (x, y, comparator) {
    return constants.comparators[comparator](x, y)
  }

  search (str) {
    const map = new Map()
    let match

    while ((match = constants.regexes.block.exec(str)) !== null) {
      const { 1: expression, index } = match
      console.log(expression)
      map.set(index, expression)
    }

    return map
  }
}

module.exports = IfElse
