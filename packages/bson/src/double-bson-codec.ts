import { Codec, TargetType } from '@type-io/core'
import { Double, Int32 } from 'bson'

export class NumberDoubleBsonCodec implements Codec<number, Double> {
  type: TargetType = [Number, Double]

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

export class DoubleBsonCodec implements Codec<Double> {
  type: TargetType = Double

  decode (value: unknown): Double {
    if (value instanceof Double) {
      return value
    }

    if (typeof value === 'number') {
      return new Double(value)
    }

    if (typeof value === 'string') {
      return new Double(parseFloat(value))
    }

    if (value instanceof Int32) {
      return new Double(value.value)
    }

    if (typeof value === 'boolean') {
      return new Double(value ? 1 : 0)
    }

    throw new Error('Unknown value type')
  }

  encode (value: Double): Double {
    return value
  }
}
