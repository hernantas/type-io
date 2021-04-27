# Codec

Under the hood, `Parser` utilise `Codec` as "translator" to decode input and encode output. In fact, `Parser` is just `Codec` manager used for convenience. `Codec` however, can only support one target type.

Example:

```ts
// `StringCodec` only support `String` target type
const stringcodec = new StringCodec()
// output: "This is My String"
const output = stringcodec.decode("This is My String")
```

While `StringCodec` can decode number, it will still decode it to string:

```ts
// decoded: "689121"
const decoded = stringcodec.decode(689121)
// encoded: "689121"
const encoded = stringcodec.encode(decoded)
```

This is why `Parser` exists. It's job is to decide which codec to use.