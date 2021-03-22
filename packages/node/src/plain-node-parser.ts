import { AnyParamConstructor, Codec, PlainParser } from '@type-io/core'
import { BufferCodec } from './buffer-codec'

export class PlainNodeParser extends PlainParser {
  constructor (codecs?: AnyParamConstructor<Codec<unknown>>[]) {
    super((codecs !== undefined ? codecs : []).concat([
      BufferCodec
    ]))
  }
}
