import { Codec, ConstructorType, Parser } from '@type-io/core'
import { BooleanBsonCodec } from './BooleanBsonCodec'
import { BinaryBsonCodec, BufferBsonCodec } from './BinaryBsonCodec'
import { DateBsonCodec } from './DateBsonCodec'
import { Decimal128BsonCodec, StringDecimal128BsonCodec } from './Decimal128BsonCodec'
import { DoubleBsonCodec, NumberDoubleBsonCodec } from './DoubleBsonCodec'
import { Int32BsonCodec, NumberInt32BsonCodec } from './Int32BsonCodec'
import { Int64BsonCodec, StringInt64BsonCodec } from './Int64BsonCodec'
import { NumberBsonCodec } from './NumberBsonCodec'
import { ObjectIdBsonCodec, StringObjectIdBsonCodec } from './ObjectIdBsonCodec'
import { StringBsonCodec } from './StringBsonCodec'
import { StringTimestampBsonCodec, TimestampBsonCodec } from './TimestampBsonCodec'

export class BsonParser extends Parser {
  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
    super(...codecCtors,
      StringBsonCodec,
      NumberBsonCodec,
      BooleanBsonCodec,
      DateBsonCodec,
      // Int32
      Int32BsonCodec,
      NumberInt32BsonCodec,
      // Int64
      Int64BsonCodec,
      StringInt64BsonCodec,
      // Double
      DoubleBsonCodec,
      NumberDoubleBsonCodec,
      // Decimal128
      Decimal128BsonCodec,
      StringDecimal128BsonCodec,
      // ObjectId
      ObjectIdBsonCodec,
      StringObjectIdBsonCodec,
      // Binary
      BinaryBsonCodec,
      BufferBsonCodec,
      // Timestamp
      TimestampBsonCodec,
      StringTimestampBsonCodec
    )
  }
}
