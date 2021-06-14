# Codec

`Codec<T, O, I>` is run-time translator or transformer for type `T`. A codec can:

- Decode input of type `I` using `decode()` method to type `T`
- Encode input of type `T` using `encode()` method to type `O`

`Codec` however, is very limited for general-purpose I/O transformer since it can only support one type of `T`.

Example:

```ts
// `StringCodec` only support `String` type
const stringcodec = new StringCodec()
// decoded to: "This is My String"
const decoded = stringcodec.decode("This is My String")
```

While `StringCodec` can decode number, it will still decode it to string:

```ts
// decoded: "689121"
const decoded = stringcodec.decode(689121)
// encoded: "689121"
const encoded = stringcodec.encode(decoded)
```

This is why `Parser` exists. It's job is to decide which codec to use.

## Implementing codec

To create codec is simply by implementing interface `Codec`. As described above, `Codec` has 3 generic type which is:

- `T`: Instance type
- `O`: Output type
- `I`: Input type. It's recommended to keep this type to `unknown`

For example:

```ts
class MyCustomCodec implements Codec<number, string> {
  readonly target = type(String)

  decode (val: unknown): number {
    return Number(val)
  }

  encode (val: number): string {
    return val.toString()
  }
}
```
