# TargetTypes util

`TargetTypes` is utility class that can be used to create several "target type"

## `TargetTypes.array` & `TargetTypes.unArray()`

`TargetTypes.array` is used to create array "target type" from given target type

```ts
// will output: [Array, String]
const target: TargetType = TargetTypes.array(String)
```

On the other hand `TargetTypes.unArray()` is used to Remove array "target type" from given target type

```ts
// will output: String
const target: TargetType = TargetTypes.unArray([Array, String])
```

## `TargetTypes.enum`

Create "target type" of Enum from *Typescript* enum.

```ts
enum MyEnum {
  ENUM_FIRST,
  ENUM_SECOND,
  ENUM_THIRD
}
const target: TargetType = TargetTypes.enum(MyEnum)
```