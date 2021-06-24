import { Codec, type } from '@type-io/core'
import { Double, Int32 } from 'bson'

export class NumberBsonCodec implements Codec<number> {
  readonly target = type(Number)

  decode (value: unknown): number {
    if (typeof value === 'number') {
      return value
    }

    if (value instanceof Double || value instanceof Int32) {
      return value.value
    }

    if (typeof value === 'string') {
      return Number(value)
    }

    if (typeof value === 'boolean') {
      return value ? 1 : 0
    }

    throw new Error('Unknown value type')
  }

  encode (value: number): number {
    return value
  }
}
