# type-io

Typescript decorator-based encoding/decoding transformation for I/O

## The Idea

Sometimes we want to transform our plain object to the ES6 class such as above. For example, when you are loading a json in your backend using `JSON.parse`, you get plain object instead of instance of the class you need.

Plain:

```ts
{
  id: 1,
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

Model:

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

And when you `fetch` it from API server:

```ts
fetch('/api/users').then((users: User[]) => {
  // here you can use `user.id` and type hinting will work
  // however, its not an class instance
})
```

In above code, you can access `users` by using `users[0].id` or `users[0].firstName` but since its an not class instance rather than plain object, you cannot call `getName()` method on it

Othertime we want to transform our class instance to different form of object format such as BSON object when working with MongoDb or to String only for other purpose.

BSON:
```ts
{
  id: Int32("1"),
  firstName: "Ricky",
  lastName: "Perez",
  money: Decimal128("5891892202.14")
}
```
String Only:
```ts
{
  id: "1",
  firstName: "Ricky",
  lastName: "Perez",
  money: "5891892202.14"
}
```

In addition, we also need to verify if the input is exactly match with our model.

Hence, this parsed based transformer is created.

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
const parser = new BSONParser()

// encode it to BSON based object
const myBSONObject = parser.encode(myClassObject)
```

Or you can create custom parser using:

```ts
const parser = new Parser([
  StringPlainCodec,
  NumberPlainCodec,
  BooleanPlainCodec,
  DatePlainCodec,
  // ... other codec here
])
```

This way when you need to parse from/to `DB` type, you can use appropiate DB parser. When you need to parse to `Plain` type, you can use plain parser

## Package

This packages is designed to be as portable as possible so model should be able to be defined on both client (web) or server (node)

However, `Parser` is not as portable since some parser require to be run on specific environment.

### `@type-io/core`

Used to define our data model. This package can be run anywhere. In addition it also contain:

- `PlainParser`: parser from/to plain object
- `StringPlainCodec`: codec for `string` plain object
- `BooleanPlainCodec`: codec for `boolean` plain object
- `NumberPlainCodec`: codec for `number` plain object
- `DatePlainCodec`: codec for `Date` plain object

## To Do

- Circular type
- Enum

### `@type-io/bson`

Used to transform object from/to BSON object.

- `BSONParser`: parser from/to BSON object
- `StringBSONCodec`: codec for `String` BSON
- `BooleanBSONCodec`: codec for `Boolean` BSON
- `Int32BSONCodec`: codec for `Int32` BSON
- `Int64BSONCodec`: codec for `Int64` BSON
- `DoubleBSONCodec`: codec for `Double` BSON
- `Decimal128BSONCodec`: codec for `Decimal128` BSON
- `DateBSONCodec`: codec for `Date` BSON
- `TimestampBSONCodec`: codec for `Timestamp` BSON
- `ObjectIdBSONCodec`: codec for `ObjectId` BSON
- `BinaryBSONCodec`: codec for `Binary` BSON

### `@type-io/mongo`

Used to transform object from/to MongoDb object.

- `@Id`: Property decorator which will map `_id` property from mongo to `id` property in object class