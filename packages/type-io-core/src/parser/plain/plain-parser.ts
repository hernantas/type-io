import { AnyObject, AnyParamConstructor } from '../../type'
import { Codec, Parser } from '../../codec'
import { BooleanCodec } from './boolean-codec'
import { NumberCodec } from './number-codec'
import { StringCodec } from './string-codec'

export class PlainParser extends Parser {
  constructor (codecs?: AnyParamConstructor<Codec<unknown>>[]) {
    super((codecs !== undefined ? codecs : []).concat([BooleanCodec, NumberCodec, StringCodec]))
  }

  createDecodeObject<T> (Type: AnyParamConstructor<T>): T {
    return new Type()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEncodeObject<T> (Type: AnyParamConstructor<T>): AnyObject {
    return {}
  }
}
