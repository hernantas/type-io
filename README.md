# type-io

Typescript decorator-based encoding/decoding transformation for I/O

## BETA

`type-io` is still in beta. Expect bugs!

## The Idea

There're 4 problem we are trying to solve on this package:

### Problem #1: Data Modeling

Eventhough the data in Javascript/JSON can be in any shape and format, we still need the data to match our data model so we can manipulate it safely. Oftentimes, we model our data using classes or schemas.

For example:

Plain:

```ts
{
  id: 1,
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

Model (Class):

```ts
class User {
  id: number
  firstName: string
  lastName: string
  money: string

  getName(): string {
    return this.firstName + this.lastName
  }
}
```

And then you `fetch` it from API server:

```ts
fetch('/api/users').then((users: User[]) => {
  // here you can use `user.id` and type hinting will work
  // however, its not an class instance
})
```

In above code, you can access `users` by using `users[0].id` or `users[0].firstName` and it is valid in Javascript. However, since its an not class instances rather than plain objects, you cannot call `getName()` method on it.

### Problem #2: Input/Output Format

In addition, we also want to transform our class instance to different form of object format. Eventhough we don't really need to care about data outside our model, we still need the transform our data to be formatted in such a way that compatible with others such as database or client.

For example, when we need to output our model to BSON object when working with MongoDb, it need to be shaped into:

BSON:
```ts
{
  id: Int32("1"),
  firstName: "Ricky",
  lastName: "Perez",
  money: Decimal128("5891892202.14")
}
```

Or when you need it to be string-only value:

String Only:
```ts
{
  id: "1",
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

### Problem #3: Validation

We also need to verify if the input is matching or allowed by our model.

### Problem #4: Reusable Data Model

Lastly, sometimes we also need our data model need to be as portable as possible so we can reuse it both on front-end and back-end (or in electron client)

**Hence, this parser/codec based transformer is created.**

## Installation

NPM:

```
npm install @type-io/core
```

Yarn:

```
yarn add @type-io/core
```

## Usage

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

This way when you need to parse from/to `DB` type, you can use appropiate DB parser. When you need to parse to `Plain` type, you can use plain parser

## Package

This project is designed to be as portable as possible so model should be able to be defined on both client (web) or server (node)

However, `Parser` is not as portable since some parser require to be run on specific environment. So, there are multiple package that can be used depend on usage.

- `@type-io/core`: Used to define our data model. This package can be run on both front-end and back-end
- `@type-io/node`: Add support for Node data type such as `Buffer`. This can only be run on Node
- `@type-io/bson`: Add support for Bson data type such as `Decimal128`, `Int32` and more. This can be run on both front-end and back-end

## To Do

- Circular type
- `@type-io/mongo`: Used to transform object from/to MongoDb object.