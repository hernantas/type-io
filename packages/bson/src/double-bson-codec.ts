import { Codec } from '@type-io/core'
import { Double, Int32 } from 'bson'

export class DoubleBsonCodec implements Codec<number, Double> {
  type = [Number, Double]

  decode (value: unknown): number {
    if (value instanceof Double || value instanceof Int32) {
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

  encode (value: number): Double {
    return new Double(value)
  }
}
