import { ConstructorType, Codec, Parser } from '@type-io/core'
import { BinaryPlainBsonCodec, BooleanBsonCodec, DateBsonCodec, Decimal128PlainBsonCodec, DoublePlainBsonCodec, Int32PlainBsonCodec, Int64PlainBsonCodec, NumberBsonCodec, ObjectIdPlainBsonCodec, StringBsonCodec, TimestampPlainBsonCodec } from '../codec'

export class PlainBsonParser extends Parser {
  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
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
