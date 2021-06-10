import { Codec, ConstructorValue, PlainParser } from '@type-io/core'
import { BufferCodec } from './BufferCodec'

export class NodeParser extends PlainParser {
  constructor (...codecCtors: Array<ConstructorValue<Codec<any>>>) {
    super(...codecCtors, BufferCodec)
  }
}
