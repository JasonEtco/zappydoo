const constants = require('./constants')

class IfElse {
  constructor (value, contents) {
    this.value = value
    this.contents = contents
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

  /**
   * Parse out the x, y, and comparator from the expression
   * @param {string} value - Value string to parse
   * @returns {object}
   */
  parse (value) {
    const re = /(.+)\s([=|!|>|<]+)\s(.+)/g
    const match = re.exec(value)
    const { 1: x, 2: comparator, 3: y } = match

    return { x, y, comparator }
  }

  resolve () {
    const { x, y, comparator } = this.parse(this.value)
    const shouldShow = this.compare(x, y, comparator)

    if (shouldShow) {
      return this.contents
    } else {
      return ''
    }
  }
}

module.exports = IfElse
