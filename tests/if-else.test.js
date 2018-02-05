const IfElse = require('../lib/if-else')

describe('if-else', () => {
  let ifElse

  beforeEach(() => {
    ifElse = new IfElse()
  })

  describe('parse', () => {
    it('returns the correct match', () => {
      const res = ifElse.parse('left === right')
      expect(res).toEqual({
        x: 'left',
        y: 'right',
        comparator: '==='
      })
    })
  })

  describe('compare', () => {
    it('works with ===', () => {
      expect(ifElse.compare('hi', 'hi', '===')).toBeTruthy()
      expect(ifElse.compare('hi', 'bye', '===')).toBeFalsy()
    })

    it('works with !==', () => {
      expect(ifElse.compare('hi', 'bye', '!==')).toBeTruthy()
      expect(ifElse.compare('hi', 'hi', '!==')).toBeFalsy()
    })

    it('works with <=', () => {
      expect(ifElse.compare(1, 2, '<=')).toBeTruthy()
      expect(ifElse.compare(2, 1, '<=')).toBeFalsy()
    })

    it('works with <', () => {
      expect(ifElse.compare(1, 2, '<')).toBeTruthy()
      expect(ifElse.compare(2, 1, '<')).toBeFalsy()
    })

    it('works with >=', () => {
      expect(ifElse.compare(2, 1, '>=')).toBeTruthy()
      expect(ifElse.compare(1, 2, '>=')).toBeFalsy()
    })

    it('works with >', () => {
      expect(ifElse.compare(2, 1, '>')).toBeTruthy()
      expect(ifElse.compare(1, 2, '>')).toBeFalsy()
    })
  })
})
