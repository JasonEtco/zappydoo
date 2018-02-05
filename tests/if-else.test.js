const IfElse = require('../lib/if-else')

describe('if-else', () => {
  let ifElse

  beforeEach(() => {
    ifElse = new IfElse()
  })

  describe('parse', () => {
    it('returns the correct match', () => {
      const res = ifElse.parse('"left" === "right"')
      expect(res).toEqual({
        x: 'left',
        y: 'right',
        comparator: '==='
      })
    })
  })

  describe('resolve', () => {
    it('returns the correct string if the if is true', () => {
      const block = new IfElse('"one" === "one"', 'hello!')
      const res = block.resolve()
      expect(res).toBe('hello!')
    })

    it('returns an empty string if the if is false', () => {
      const block = new IfElse('"one" === "two"', '"hello"!')
      const res = block.resolve()
      expect(res).toBe('')
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
