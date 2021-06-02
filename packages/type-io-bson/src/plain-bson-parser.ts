import { AnyParamConstructor, Codec, Parser } from '@type-io/core'
import { BinaryPlainBsonCodec } from './binary-bson-codec'
import { BooleanBsonCodec } from './boolean-bson-codec'
import { DateBsonCodec } from './date-bson-codec'
import { Decimal128PlainBsonCodec } from './decimal128-bson-codec'
import { DoublePlainBsonCodec } from './double-bson-codec'
import { Int32PlainBsonCodec } from './int32-bson-codec'
import { Int64PlainBsonCodec } from './int64-bson-codec'
import { NumberBsonCodec } from './number-bson-codec'
import { ObjectIdPlainBsonCodec } from './objectid-bson-codec'
import { StringBsonCodec } from './string-bson-codec'
import { TimestampPlainBsonCodec } from './timestamp-bson-codec'

export class PlainBsonParser extends Parser {
  constructor (codecs?: Array<AnyParamConstructor<Codec<unknown>>>) {
    super((codecs !== undefined ? codecs : []).concat([
      StringBsonCodec,
      NumberBsonCodec,
      BooleanBsonCodec,
      DateBsonCodec,
      Int32PlainBsonCodec,
      Int64PlainBsonCodec,
      DoublePlainBsonCodec,
      Decimal128PlainBsonCodec,
      ObjectIdPlainBsonCodec,
      BinaryPlainBsonCodec,
      TimestampPlainBsonCodec
    ]))
  }
}
