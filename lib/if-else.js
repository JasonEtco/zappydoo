const constants = require('./constants')

class IfElse {
  constructor (value, contents, data) {
    this.value = value
    this.contents = contents
    this.data = data
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

  isAString (thing) {
    return (thing.startsWith('\'') && thing.endsWith('\'')) ||
      (thing.startsWith('"') && thing.endsWith('"'))
  }

  stripQuotes (str) {
    if (str.startsWith('"')) {
      return str.replace(/^"(.+(?="$))"$/, '$1')
    } else {
      return str.replace(/^'(.+(?='$))'$/, '$1')
    }
  }

  /**
   * Parse out the x, y, and comparator from the expression
   * @param {string} value - Value string to parse
   * @returns {object}
   */
  parse (value, data = {}) {
    const re = /(.+)\s([=|!|>|<]+)\s(.+)/g
    const match = re.exec(value)

    let x = match[1]
    let y = match[3]
    const comparator = match[2]

    if (this.isAString(x)) {
      x = this.stripQuotes(x)
    } else {
      x = data[x]
    }

    if (this.isAString(y)) {
      y = this.stripQuotes(y)
    } else {
      y = data[y]
    }

    return { x, y, comparator }
  }

  resolve () {
    const { x, y, comparator } = this.parse(this.value, this.data)
    const shouldShow = this.compare(x, y, comparator)
    console.log(x, y, comparator, shouldShow)

    if (shouldShow) {
      return this.contents
    } else {
      return ''
    }
  }
}

module.exports = IfElse
