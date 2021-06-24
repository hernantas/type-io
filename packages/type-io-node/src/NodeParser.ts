import { Codec, ConstructorType, PlainParser } from '@type-io/core'
import { BufferCodec } from './BufferCodec'

export class NodeParser extends PlainParser {
  constructor (...codecCtors: Array<ConstructorType<Codec<any>>>) {
    super(...codecCtors, BufferCodec)
  }
}
