import { AnyParamConstructor } from '../type'
import { Codec, Parser } from '../core'
import { BooleanCodec } from './boolean-codec'
import { NumberCodec } from './number-codec'
import { StringCodec } from './string-codec'
import { DateCodec } from './date-codec'

export class PlainParser extends Parser {
  constructor (codecs?: AnyParamConstructor<Codec<unknown>>[]) {
    super((codecs !== undefined ? codecs : []).concat([
      BooleanCodec,
      NumberCodec,
      StringCodec,
      DateCodec
    ]))
  }
}
