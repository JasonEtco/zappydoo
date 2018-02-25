const IfElse = require('../lib/if-else')

describe('if-else', () => {
  let ifElse, data

  beforeEach(() => {
    data = { foo: 'bar' }
    ifElse = new IfElse()
  })

  describe('parse', () => {
    it('returns the correct match', () => {
      const res = ifElse.parse([null, '"left"', '===', '"right"'])
      expect(res).toEqual({
        x: 'left',
        y: 'right',
        comparator: '==='
      })
    })

    it('returns the correct match', () => {
      const res = ifElse.parse([null, 'foo', '===', '"bar"'], data)
      expect(res).toEqual({
        x: data.foo,
        y: 'bar',
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
      const block = new IfElse('"one" === "two"', 'hello!')
      const res = block.resolve()
      expect(res).toBe('')
    })

    it('resolves falsy if the variable is undefined', () => {
      const block = new IfElse('variable', 'hello!')
      const res = block.resolve()
      expect(res).toBe('')
    })

    it('resolves truthy if the variable is defined', () => {
      const data = { variable: true }
      const block = new IfElse('variable', 'hello!', data)
      const res = block.resolve()
      expect(res).toBe('hello!')
    })

    it('resolves falsy if the variable is falsy', () => {
      const data = { variable: false }
      const block = new IfElse('variable', 'hello!', data)
      const res = block.resolve()
      expect(res).toBe('')
    })

    it('returns the else string if the if is false and there is an else', () => {
      const block = new IfElse('"one" === "two"', 'hello!{% else %}goodbye!')
      const res = block.resolve()
      expect(res).toBe('goodbye!')
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
