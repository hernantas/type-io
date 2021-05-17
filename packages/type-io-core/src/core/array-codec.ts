import { TargetType } from '../type'
import { Codec } from './codec'
import { TargetTypes } from './target-types'

/**
 * Dynamic codec for given element
 */
export class ArrayCodec<T> implements Codec<T[], unknown[]> {
  type: TargetType<T[]>
  codec: Codec<T, unknown>

  constructor (type: TargetType<T>, codec: Codec<T, unknown>) {
    this.type = TargetTypes.array(type)
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
