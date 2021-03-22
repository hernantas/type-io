import { AnyParamConstructor, Codec, Parser } from '@type-io/core'
import { BooleanBsonCodec } from './boolean-bson-codec'
import { BufferBsonCodec } from './buffer-bson-codec'
import { DateBsonCodec } from './date-bson-codec'
import { Decimal128BsonCodec } from './decimal128-bson-codec'
import { DoubleBsonCodec } from './double-bson-codec'
import { Int32BsonCodec } from './int32-bson-codec'
import { Int64BsonCodec } from './int64-bson-codec'
import { NumberBsonCodec } from './number-bson-codec'
import { ObjectIdBsonCodec } from './objectid-bson-codec'
import { StringBsonCodec } from './string-bson-codec'
import { TimestampBsonCodec } from './timestamp-bson-codec'

export class BsonParser extends Parser {
  constructor (codecs?: AnyParamConstructor<Codec<unknown>>[]) {
    super((codecs !== undefined ? codecs : []).concat([
      StringBsonCodec,
      NumberBsonCodec,
      BooleanBsonCodec,
      DateBsonCodec,
      Int32BsonCodec,
      Int64BsonCodec,
      DoubleBsonCodec,
      Decimal128BsonCodec,
      ObjectIdBsonCodec,
      BufferBsonCodec,
      TimestampBsonCodec
    ]))
  }
}
