const { regexes } = require('./constants')
const Block = require('./block')

class Zappydoo {
  /**
   * Part of the function that is returned by `precompile()`. Injects
   * data properties from the map param into an the templateArray,
   * then joins it all together into one string.
   * @private
   *
   * @param {string[]} templateArray - Array of strings
   * @param {Map<number, string>} map - Map of array indexes and data keys.
   * @param {object} data - Object of data to compile with.
   * @returns {string}
   */
  render (templateArray, map, data) {
    let final = templateArray

    map.forEach((key, i) => {
      if (data[key]) {
        final = [
          ...final.slice(0, i),
          data[key],
          ...final.slice(i)
        ]
      } else {
        throw new Error(`The property ${key} does not exist in the provided object.`)
      }
    })

    return final.join('')
  }

  /**
   * Prepare a template for later use. This is better
   * for performance, as the RegEx searching is done in advance.
   * This method returns a function that can be called later
   * with an object of template data.
   *
   * @example
   * const zap = new Zappydoo()
   * const template = zap.precompile('Hello {{ user }}!')
   *
   * // Pass some time, fetch some data...
   *
   * const compiled = template({ user: 'Jason' })
   * // Hello Jason!
   *
   * @param {string} template - Template string
   * @returns {function}
   */
  precompile (template) {
    const templateArray = []
    const map = new Map()

    let match

    const last = { stringIndex: 0, arrayIndex: 0 }

    while ((match = regexes.var.exec(template)) != null) {
      const { 0: variable, 1: key, index } = match
      const i = templateArray.push(template.substring(last.stringIndex, index))
      map.set(i + last.arrayIndex, key)

      // Update pointers
      last.arrayIndex = i
      last.stringIndex = index + variable.length
    }

    // Append end of string
    templateArray.push(template.substring(last.stringIndex))

    return (data) => this.render(templateArray, map, data)
  }

  /**
   * Replaces variables in the template with the properties from the provided object.
   *
   * @example
   * const compiled = Zappydoo.compile('Hello {{ user! }}', { user: 'Jason' })
   * // Hello Jason!
   *
   * Note: unless you are reading your template from a file, it is better to use an ES6 template literal.
   * @param {string} template - Template string
   * @param {object} data - Data object
   * @returns {string}
   */
  static compile (template, data) {
    let match
    let ret = template

    while ((match = regexes.var.exec(template)) != null) {
      const [variable, key] = match
      ret = ret.replace(variable, data[key] || '')
    }

    while ((match = regexes.block.exec(template)) != null) {
      const [expression, name, value, contents] = match

      const block = Block.identify(name, value, contents)
      ret = ret.replace(expression, block.resolve())
    }

    return ret
  }
}

module.exports = Zappydoo
