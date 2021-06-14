# Parser

Under the hood, `Parser` utilise `Codec` as translator or transformer to decode input and encode output. In fact, `Parser` is just `Codec` manager used for general purpose I/O transformer.

To begin parsing using the included `PlainParser`, parser from other module, or your own `Parser`. For example:

```ts
// create parser instances
const parser = new PlainParser()

// input
const input = {
  property1: 'Some random string data'
}

// model
class MyData {
  @Prop()
  property1: string
}

// decode your plain object using `MyData` as data model
const decoded = parser.decode(input, MyData)

// encode `MyData` instance back to plain
const encoded = parser.encode(decoded)
```