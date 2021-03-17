import { AnyParamConstructor } from '../../type'
import { Codec, Parser } from '../../codec'
import { BooleanPlainCodec } from './boolean-plain-codec'
import { NumberPlainCodec } from './number-plain-codec'
import { StringPlainCodec } from './string-plain-codec'
import { DatePlainCodec } from './date-plain-codec'

export class PlainParser extends Parser {
  constructor (codecs?: AnyParamConstructor<Codec<unknown>>[]) {
    super((codecs !== undefined ? codecs : []).concat([
      BooleanPlainCodec,
      NumberPlainCodec,
      StringPlainCodec,
      DatePlainCodec
    ]))
  }
}
