# Target Type

`Parser` use `TargetType` as information to be used as information to determine which codec to use. There're several way to make `TargetType` which is:

## Object Constructor

This is the most basic `TargetType`, which can be specified by using **Object Constructor**.

```ts
const target: TargetType = String
```

## Enum

For enumeration, can use:

```ts
const target: TargetType = [
  [0, 1, 2, 3, 4, 10]
]
```

or

```ts
const target: TargetType = [
  ['ENUM_1', 'ENUM_2']
]
```

## Union

Combination of Object Constructor or Enum to be used as variant or specific usage

```ts
const target: TargetType = [
  String,
  Number
] 
```

or can be:

```ts
const target: TargetType = [
  String,
  ['ENUM_1', 'ENUM_2']
] 
```

Array of String:

```ts
const target: TargetType = [
  Array,
  String
] 
```
