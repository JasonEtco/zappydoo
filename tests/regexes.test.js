const { regexes } = require('../lib/constants')
const { readFile } = require('./helpers')

describe('regexes', () => {
  let templates

  beforeEach(() => {
    templates = {
      blockEnds: readFile('regexes', 'block-ends.md'),
      blockNoEnd: readFile('regexes', 'block-no-end.md')
    }
  })

  describe('var', () => {
    it('returns the correct variable', () => {
      const match = regexes.var.exec('{{ example }}')
      expect(match).toMatchSnapshot()
    })
  })

  describe('block', () => {
    it('returns the correct block', () => {
      const match = regexes.block.exec(templates.blockEnds)
      expect(match).toMatchSnapshot()
    })
  })
})
