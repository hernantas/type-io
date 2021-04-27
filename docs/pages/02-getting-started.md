# Getting Started

## Installation

To start using `@type-io`, install the required packages via NPM/Yarn:

Node:

```
npm install @type-io/core
```

Yarn:

```
yarn add @type-io/core
```

## Basic Usage

First is to define your data model. Property must be marked with `@Prop` decorator to be recognized

```ts
class MyClass {
  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  active: boolean
}
```

Then, by using `Parser`, we can start decode or encode based on given model. When we want to transform it from or to plain object, we can use `PlainParser` from `@type-io/core`

```ts
// your plain object
const plain = {
  name: 'Robert Ferguson',
  age: 57,
  active: true
}

// create new parser
const parser = new PlainParser()

// decode it to `MyClass` model
const myClassObject = parser.decode(plain, MyClass)

// encode instance of `MyClass` back to plain object
const plainObject = parser.encode(myClassObject)
```

Or when we want to encode it to BSON based object using `@type-io/bson`

```ts
// define BSON based object parser
const parser = new BsonParser()

// encode it to BSON based object
const myBSONObject = parser.encode(myClassObject)
```

Or you can create custom parser using:

```ts
const parser = new Parser([
  StringCodec,
  NumberCodec,
  BooleanCodec,
  DateCodec,
  // ... other codec here
])
```

This way when you need to parse from/to `DB` type, you can use appropiate DB parser. When you need to parse to `Plain` type, you can use plain parser. All with the same **Model**