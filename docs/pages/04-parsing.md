# Parsing

To begin parsing using the included `PlainParser`, parser from other module, or your own `Parser`. For example:

```ts
// create parser
const parser = new PlainParser()

const plain = {
  property1: 'Some random string data'
}

// decode your plain object using `MyData` as data model
const decoded = parser.decode(plain, MyData)

// encode `MyData` instance back to plain
const encoded = parser.encode(plain)
```