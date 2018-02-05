module.exports = {
  regexes: {
    var: /\{\{\s?(\w+|\d+)\s?\}\}/g,
    block: /\{%\s?(.+?)\s(.+?)\s?%\}([\s\S]+)\{%\s?end.+\s?%\}/g,
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
