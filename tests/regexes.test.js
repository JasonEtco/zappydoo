const { regexes } = require('../lib/constants')
const fs = require('fs')
const path = require('path')

describe('regexes', () => {
  let templates
  const pather = str => path.join(__dirname, 'fixtures', 'regexes', str)

  beforeEach(() => {
    templates = {
      blockEnds: fs.readFileSync(pather('block-ends.md'), 'utf8'),
      blockNoEnd: fs.readFileSync(pather('block-no-end.md'), 'utf8')
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
