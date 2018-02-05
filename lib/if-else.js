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
   * @param {string} expression - Expression string to parse
   */
  parse (expression) {
    
  }

  resolve () {
    const { x, y, comparator, contents } = this.parse(this.expression)
    const shouldShow = this.compare(x, y, comparator)

    if (shouldShow) {
      return contents
    } else {
      return ''
    }
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
