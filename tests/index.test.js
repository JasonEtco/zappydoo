const Zappydoo = require('../lib')
const { readFile } = require('./helpers')

describe('zappydoo', () => {
  let data, templates

  beforeEach(() => {
    templates = {
      basic: readFile('templates', 'template.md'),
      missing: readFile('templates', 'template-missing.md'),
      if: readFile('templates', 'template-if.md')
    }

    data = { park: 'Fenway', weather: 'sunny', user: 'Jason' }
  })

  describe('precompile', () => {
    let zap

    beforeEach(() => {
      zap = new Zappydoo()
    })

    it('should return a function', () => {
      const renderer = zap.precompile(templates.basic)
      expect(typeof renderer).toBe('function')
    })

    it('should be able to run the function later', () => {
      const renderer = zap.precompile(templates.basic)
      expect(renderer(data)).toMatchSnapshot()
    })
  })

  describe('render', () => {
    let zap

    beforeEach(() => {
      zap = new Zappydoo()
    })

    it('should render the correct string', () => {
      const arr = ['Hello and welcome to ', ' park! The weather is ', ' today. Enjoy your day ', '!']
      const map = new Map()
      map.set(1, 'park')
      map.set(3, 'weather')
      map.set(5, 'user')

      const rendered = zap.render(arr, map, data)
      expect(rendered).toMatchSnapshot()
    })

    it('throws if the property does not exist', () => {
      const map = new Map()
      map.set(1, 'park')
      map.set(3, 'adjective')
      map.set(5, 'weather')
      map.set(8, 'user')

      try {
        zap.render([], map, data)
      } catch (e) {
        expect(e.message).toMatchSnapshot()
      }
    })
  })

  describe('compile', () => {
    it('should return the correct string', () => {
      const compiled = Zappydoo.compile(templates.basic, data)
      expect(compiled).toMatchSnapshot()
    })

    it('leaves undefined variables blank', () => {
      const compiled = Zappydoo.compile(templates.missing, data)
      expect(compiled).toMatchSnapshot()
    })

    it('works with if statements', () => {
      const compiled = Zappydoo.compile(templates.if, data)
      expect(compiled).toMatchSnapshot()

      const d = Object.assign({}, data, { weather: false })
      const compiledFalse = Zappydoo.compile(templates.if, d)
      expect(compiledFalse).toMatchSnapshot()
    })
  })
})
