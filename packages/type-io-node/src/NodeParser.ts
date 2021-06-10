import { Codec, ConstructorValue, PlainParser } from '@type-io/core'
import { BufferCodec } from './BufferCodec'

export class NodeParser extends PlainParser {
  constructor (...codecs: Array<ConstructorValue<Codec<unknown>>>) {
    super(...codecs, BufferCodec)
  }
}
