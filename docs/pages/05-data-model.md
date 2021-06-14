# Data Model

To define data model, you need to declare class with property marked with `@Prop` decorator. Any property that not marked with `@Prop` will be ignored. Any property that marked with `@Prop` is *required* property

```ts
class MyData {
  @Prop()
  property1: string
}
```

## Optional property

To define optional property use `optional` option:

```ts
class MyData {
  @Prop({ optional: true })
  property1?: string
}
```

## Array

For `Array`, `type` option need to be specified:

```ts
class MyData {
  @Prop({ type: array(String) })
  property1: string[]
}
```

## Nested Object

For nested object, use like normal:

```ts
class Child {
  @Prop()
  childProp: string
}

class Parent {
  @Prop()
  nested: Child
}
```

## Enum

`type-io` also support enum (both number and string enum) by using `type` option:

```ts
class MyData {
  @Prop({ type: union(
    literal('ENUM_TYPE_FIRST'), 
    literal('ENUM_TYPE_SECOND'), 
    literal('ENUM_TYPE_THIRD')) 
  })
  property1: 'ENUM_TYPE_FIRST' | 'ENUM_TYPE_SECOND' | 'ENUM_TYPE_THIRD'
}
```

Or by using `fromEnum()` function to convert typescript `Enum` to union type.

```ts
enum MyEnum {
  ENUM_0,
  ENUM_1,
  ENUM_2,
  ENUM_3
}

class MyData {
  @Prop({ type: fromEnum(MyEnum) })
  property1: MyEnum
}
```

## Different property name on input/output

There's case where only input name can be different. For example:

```ts
{
  _first_property: 'Some random string data'
}
```

But the output is still using `_property1` name. You can use `inName` and `outName` option from:

```ts
class MyData {
  @Prop({ inName: '_first_property', outName: '_property1' })
  property1: string
}
```

This will allow the same model to output:

```ts
{
  _property1: 'Some random string data'
}
```