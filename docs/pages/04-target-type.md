# Target Type

When parsing, we need to determine which *type* to be used as model at run-time. For example, when our value need to be `string` then we need to know its type at run-time.

In addition, we want to be able to use Typescript type in our model as much as possible. While Typesript type is very powerful, it also very difficult to determine at run-time. For example:

```ts
const myVal: string
```

Which is only a `string` value. Union type on the other hand can be a `string` or `number` value:

```ts
const myVal: string | number
```

`TargetType` is used as information at run-time to determine which `Codec` to use. Which mean that if we pass `String` as `TargetType` to `Parser`, it mean that we want to `decode` or `encode` the given value using `StringCodec` or other supported `Codec`.

In order to create `TargetType`, several utility function is provided such as:

## Class Type

This is the most basic `TargetType`, which can be specified by using **Object Constructor** or `type()` util function.

```ts
const target: TargetType = String
// or
const target: TargetType = type(String)
```

## Literal Type

Target type can also be literal value. However, it need to be wrapped with `literal()` function.

```ts
const target: TargetType = literal('MY_LITERAL_VALUE')
// or
const target: TargetType = literal(8080)
```

## Array Type

Since type can be also an array, `array()` function can be used.

```ts
const target: TargetType = array(String) // String[]
// or
const target: TargetType = array(Number) // Number[]
```

## Tuple Type

For tuple type:

```ts
const target: TargetType = tuple([String, Number]) // [String, Number]
// or
const target: TargetType = tuple([Number, Number, Number, String]) // [Number, Number, Number, String]
```

## Union Type

For union type:

```ts
const target: TargetType = union([String, Number]) // string | number
// or
const target: TargetType = union([String, Number, Boolean]) // string | number | boolean
```

## Variant Type

Variant type is used as extra type information to be used on `Parser`. For example:

```ts
const target: TargetType = variant(String, Number)
```

Which mean that `TargetType` is still `string`. However, we want to add `Number` variant to it.

This is useful for when there are multiple `Codec` that support `string` but we want to specify to the `Parser` to use `Codec` that has `number` target type as variant. Note that variant type is optional, which mean that (using example above) if the `Parser` doesn't have `Codec` its variant is `Number`, it will still use `Codec` that use `String` target type.