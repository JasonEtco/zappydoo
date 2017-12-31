# Zappydoo

Dead-simple template engine. Nothing special, just straight-up variable replacement, but real fast.

## Usage

#### `Zappydoo.compile()`

Simply replaces the `{{ variables }}` with the corresponding key in the object.

```js
const Zappydoo = require('zappydoo')
const compiled = Zappydoo.compile('Hello {{ name }}!', { name: 'Jason' })
// Hello Jason!
```

A less contrived example would include bringing in the template string from somewhere else, like a markdown file.

```js
const myFile = fs.readFileSync('template.md', 'utf8')
const compiled = Zappydoo.compile(myFile, { name: 'Jason' })
```

**Note:** If you aren't reading the template string from a file, you're likely better off using [ES6 template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

#### `zap.precompile()`

Often you'll want to have your template prepared in advance for performance reasons (since one of the most expensive parts of templating is the RegEx searching). `zap.precompile()` returns a function that you can call at any time with a data object.

```js
const Zappydoo = require('zappydoo')
const zap = new Zappydoo()

const template = zap.precompile('Hello {{ name }}!')

// Then later, or many times:
const compiled = template({ name: 'Jason' })
```

