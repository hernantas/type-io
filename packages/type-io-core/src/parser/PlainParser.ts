import { BooleanCodec } from './BooleanCodec'
import { NumberCodec } from './NumberCodec'
import { StringCodec } from './StringCodec'
import { DateCodec } from './DateCodec'
import { Parser } from '../core'
import { Codec, ConstructorValue } from '../type'

export class PlainParser extends Parser {
  constructor (...codecCtors: Array<ConstructorValue<Codec<any>>>) {
    super(...codecCtors, ...[
      BooleanCodec,
      NumberCodec,
      StringCodec,
      DateCodec
    ])
  }
}
