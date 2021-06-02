import { AnyParamConstructor, Codec, Parser } from '@type-io/core'
import { BooleanBsonCodec } from './boolean-bson-codec'
import { BinaryBsonCodec, BufferBsonCodec } from './binary-bson-codec'
import { DateBsonCodec } from './date-bson-codec'
import { Decimal128BsonCodec, StringDecimal128BsonCodec } from './decimal128-bson-codec'
import { DoubleBsonCodec, NumberDoubleBsonCodec } from './double-bson-codec'
import { Int32BsonCodec, NumberInt32BsonCodec } from './int32-bson-codec'
import { Int64BsonCodec, StringInt64BsonCodec } from './int64-bson-codec'
import { NumberBsonCodec } from './number-bson-codec'
import { ObjectIdBsonCodec, StringObjectIdBsonCodec } from './objectid-bson-codec'
import { StringBsonCodec } from './string-bson-codec'
import { StringTimestampBsonCodec, TimestampBsonCodec } from './timestamp-bson-codec'

export class BsonParser extends Parser {
  constructor (codecs?: Array<AnyParamConstructor<Codec<unknown>>>) {
    super((codecs !== undefined ? codecs : []).concat([
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
    ]))
  }
}
