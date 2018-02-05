const Block = require('../lib/block')
const IfElse = require('../lib/if-else')

describe('block', () => {
  let block

  beforeEach(() => {
    block = new Block()
  })

  describe('identify', () => {
    it('returns an instance of IfElse', () => {
      expect(block.identify('{% if thing %}...{% endif %}')).toBeInstanceOf(IfElse)
    })
  })
})
