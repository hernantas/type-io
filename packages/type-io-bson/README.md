# @type-io/bson

Add BSON data type support to [type-io](/README.md) which can be used for MongoDb

## Installation

Node:

```
npm install @type-io/bson
```

Yarn:

```
yarn add @type-io/bson
```

## Built-In

### `@BsonId`

Automatically map `ObjectId` to `string`

For example:

```ts
class MyEntity {
  @BsonId()
  otherEntityId: string
}
```

Can accept input or will produce output to:

```ts
{
  otherEntityId: new ObjectId()
}
```

### `BsonParser`

How to read table bellow:

```ts
class Example {
  @Prop({ type: <<Specified Type>> })
  propertyName: <<Instanced Type>>
}
```

Supported type: All type from `PlainParser` and...

| Instanced Type | Input type                                               | Output Type | Specified Type |
|----------------|----------------------------------------------------------|-------------|----------------|
| Number         | Int32, Double, Number, String, Boolean                   | Int32       | Int32          |
| Int32          | Int32, Double, Number, String, Boolean                   | Int32       |                |
| String         | Long, Int32, Double, Number, String, Boolean             | Long        | Long           |
| Long           | Long, Int32, Double, Number, String, Boolean             | Long        |                |
| Number         | Int32, Double, Number, String, Boolean                   | Double      | Double         |
| Double         | Int32, Double, Number, String, Boolean                   | Double      |                |
| String         | Decimal128, Long, Int32, Double, Number, String, Boolean | Decimal128  | Decimal128     |
| Decimal128     | Decimal128, Long, Int32, Double, Number, String, Boolean | Decimal128  |                |
| String         | ObjectId, ObjectID, String                               | ObjectId    | ObjectId       |
| ObjectId       | ObjectId, ObjectID, String                               | ObjectId    |                |
| Buffer         | Buffer, String, Binary, UInt8Array, Number[]             | Binary      |                |
| Binary         | Buffer, String, Binary, UInt8Array, Number[]             | Binary      |                |
| String         | String, Timestamp, Number, Long                          | Timestamp   | Timestamp      |
| Timestamp      | String, Timestamp, Number, Long                          | Timestamp   |                |

### `PlainBsonParser`

Supported type: All type from `PlainParser` and...

| Instanced Type | Input type                                               | Output Type | Specified Type |
|----------------|----------------------------------------------------------|-------------|----------------|
| Int32          | Int32, Double, Number, String, Boolean                   | Number      |                |
| Long           | Long, Int32, Double, Number, String, Boolean             | String      |                |
| Double         | Int32, Double, Number, String, Boolean                   | Number      |                |
| Decimal128     | Decimal128, Long, Int32, Double, Number, String, Boolean | String      |                |
| ObjectId       | ObjectId, ObjectID, String                               | String      |                |
| Binary         | Buffer, String, Binary, UInt8Array, Number[]             | Buffer      |                |
| Timestamp      | String, Timestamp, Number, Long                          | String      |                |