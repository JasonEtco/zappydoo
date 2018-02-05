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

  describe('block', () => {
    it('returns the correct block', () => {
      const match = regexes.block.exec(templates.blockEnds)
      console.log(match)
    })
  })
})
