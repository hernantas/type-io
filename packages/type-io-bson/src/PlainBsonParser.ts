import { ConstructorValue, Codec, Parser } from '@type-io/core'
import { BinaryPlainBsonCodec } from './BinaryBsonCodec'
import { BooleanBsonCodec } from './BooleanBsonCodec'
import { DateBsonCodec } from './DateBsonCodec'
import { Decimal128PlainBsonCodec } from './Decimal128BsonCodec'
import { DoublePlainBsonCodec } from './DoubleBsonCodec'
import { Int32PlainBsonCodec } from './Int32BsonCodec'
import { Int64PlainBsonCodec } from './Int64BsonCodec'
import { NumberBsonCodec } from './NumberBsonCodec'
import { ObjectIdPlainBsonCodec } from './ObjectIdBsonCodec'
import { StringBsonCodec } from './StringBsonCodec'
import { TimestampPlainBsonCodec } from './TimestampBsonCodec'

export class PlainBsonParser extends Parser {
  constructor (...codecCtors: Array<ConstructorValue<Codec<any>>>) {
    super(...codecCtors,
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
    )
  }
}
