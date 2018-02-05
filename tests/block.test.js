const Block = require('../lib/block')
const IfElse = require('../lib/if-else')

describe('block', () => {
  describe('identify', () => {
    it('returns an instance of IfElse', () => {
      expect(Block.identify('if')).toBeInstanceOf(IfElse)
    })
  })
})
