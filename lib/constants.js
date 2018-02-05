module.exports = {
  regexes: {
    var: /\{\{\s?(\w+|\d+)\s?\}\}/g,
    block: /\{%\s?(.+?)\s?%\}/g,
    blockFunc: str => new RegExp(`\\{%\\s?${str}.+?\\s?%\\}`)
  },
  comparators: {
    '!==': (x, y) => x !== y,
    '===': (x, y) => x === y,
    '>=': (x, y) => x >= y,
    '<': (x, y) => x < y,
    '<=': (x, y) => x <= y,
    '>': (x, y) => x > y
  },
  operators: {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y
  }
}
