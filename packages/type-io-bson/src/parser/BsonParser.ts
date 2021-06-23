import { Codec, ConstructorType, Parser } from '@type-io/core'
import { BinaryBsonCodec, BooleanBsonCodec, BufferBsonCodec, DateBsonCodec, Decimal128BsonCodec, DoubleBsonCodec, Int32BsonCodec, Int64BsonCodec, NumberBsonCodec, NumberDoubleBsonCodec, NumberInt32BsonCodec, ObjectIdBsonCodec, StringBsonCodec, StringDecimal128BsonCodec, StringInt64BsonCodec, StringObjectIdBsonCodec, StringTimestampBsonCodec, TimestampBsonCodec } from '../codec'

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
