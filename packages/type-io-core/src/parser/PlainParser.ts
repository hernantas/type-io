import { BooleanCodec } from './BooleanCodec'
import { NumberCodec } from './NumberCodec'
import { StringCodec } from './StringCodec'
import { DateCodec } from './DateCodec'
import { Parser } from '../core'
import { Codec, ConstructorType } from '../type'

export class PlainParser extends Parser {
  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
    super(...codecCtors,
      BooleanCodec,
      NumberCodec,
      StringCodec,
      DateCodec
    )
  }
}
