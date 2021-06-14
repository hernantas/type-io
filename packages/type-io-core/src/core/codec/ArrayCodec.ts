import { ArrayIdentity } from '../../type'
import { Codec } from '../../type/Codec'

/**
 * Dynamic codec for given element
 */
export class ArrayCodec<T> implements Codec<T[], unknown[]> {
  target: ArrayIdentity<T>
  codec: Codec<T, unknown>

  constructor (target: ArrayIdentity<T>, codec: Codec<T, unknown>) {
    this.target = target
    this.codec = codec
  }

  decode (input: unknown): T[] {
    if (Array.isArray(input)) {
      return input.map(val => this.codec.decode(val))
    }

    throw new Error('Unknown input value type, must be an array')
  }

  encode (input: T[]): unknown[] {
    return input.map(val => this.codec.encode(val))
  }
}
