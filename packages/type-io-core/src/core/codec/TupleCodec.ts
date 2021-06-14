import { Codec, MemberIdentity, MemberValue } from '../../type'
import { CodecOf } from '../../type/util'

export class TupleCodec<T extends MemberValue> implements Codec<T, unknown[]> {
  readonly target: MemberIdentity<T>
  readonly codecs: CodecOf<T>

  constructor (target: MemberIdentity<T>, codecs: CodecOf<T>) {
    this.target = target
    this.codecs = codecs
  }

  decode (value: unknown): T {
    if (!Array.isArray(value) || value.length !== this.target.members.length) {
      throw new Error('Unknown input value type, must be a tuple')
    }

    const result = new Array(value.length)
    for (let i = 0; i < value.length; i++) {
      const val = value[i]
      const codec = this.codecs[i]
      result[i] = codec.decode(val)
    }
    return result as T
  }

  encode (value: T): unknown[] {
    const result = new Array(value.length)
    for (let i = 0; i < value.length; i++) {
      const val = value[i]
      const codec = this.codecs[i]
      result[i] = codec.encode(val)
    }
    return result
  }
}
