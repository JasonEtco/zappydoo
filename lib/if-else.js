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

  /**
   * Does the string start and end with " or '
   * @param {string} thing
   * @returns {boolean}
   */
  isAString (thing) {
    return (thing.startsWith('\'') && thing.endsWith('\'')) ||
      (thing.startsWith('"') && thing.endsWith('"'))
  }

  /**
   * Removes the beginning and ending quotes of a string
   * @param {string} str
   * @returns {string}
   */
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

  getElse (contents) {
    if (constants.regexes.else.test(contents)) {
      return contents.split(constants.regexes.else)[1]
    } else {
      return false
    }
  }

  /**
   * Resolve the if statement
   * @returns {string}
   */
  resolve () {
    const { x, y, comparator } = this.parse(this.value, this.data)
    const success = this.compare(x, y, comparator)

    const getElse = this.getElse(this.contents)
    if (success) {
      return this.contents
    } else {
      return getElse || ''
    }
  }
}

module.exports = IfElse
