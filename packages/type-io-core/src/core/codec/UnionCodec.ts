import { Codec, MemberIdentity, MemberType } from '../../type'
import { CodecOf, UnionOf } from '../../type/util'

export class UnionCodec<T extends MemberType> implements Codec<UnionOf<T>> {
  readonly target: MemberIdentity<T>
  readonly codecs: CodecOf<T>

  constructor (target: MemberIdentity<T>, codecs: CodecOf<T>) {
    this.target = target
    this.codecs = codecs
  }

  decode (value: unknown): UnionOf<T> {
    for (const codec of this.codecs) {
      try {
        return codec.decode(value) as UnionOf<T>
      } catch (e) {
      }
    }

    throw new Error('Unknown input type')
  }

  encode (value: UnionOf<T>): UnionOf<T> {
    for (const codec of this.codecs) {
      try {
        return codec.encode(value) as UnionOf<T>
      } catch (e) {
      }
    }

    throw new Error(`Unknown input type ${this.codecs.toString()}`)
  }
}
