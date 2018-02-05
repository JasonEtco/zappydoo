const IfElse = require('../lib/if-else')
const fs = require('fs')
const path = require('path')

describe('if-else', () => {
  let templates, ifElse

  beforeEach(() => {
    templates = {
      if: fs.readFileSync(path.join(__dirname, 'fixtures', 'template-if.md'), 'utf8')
    }

    ifElse = new IfElse()
  })

  describe('search', () => {
    it('returns the correct matches', () => {
      const res = ifElse.search(templates.if)
      console.log(res)
      expect(res).toBe(true)
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
