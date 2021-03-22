import { Codec } from '@type-io/core'
import { Double, Int32 } from 'bson'

export class Int32BsonCodec implements Codec<number, Int32> {
  type = [Number, Int32]

  decode (value: unknown): number {
    if (value instanceof Int32 || value instanceof Double) {
      return value.value
    }

    if (typeof value === 'number') {
      return value
    }

    if (typeof value === 'string') {
      return Number(value)
    }

    if (typeof value === 'boolean') {
      return value ? 1 : 0
    }

    throw new Error('Unknown value type')
  }

  encode (value: number): Int32 {
    return new Int32(value)
  }
}
