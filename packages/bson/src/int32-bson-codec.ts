import { Codec, TargetType } from '@type-io/core'
import { Double, Int32 } from 'bson'

export class NumberInt32BsonCodec implements Codec<number, Int32> {
  type: TargetType = [Number, Int32]

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

export class Int32BsonCodec implements Codec<Int32> {
  type: TargetType = Int32

  decode (value: unknown): Int32 {
    if (value instanceof Int32) {
      return value
    }

    if (value instanceof Double) {
      return new Int32(value.value)
    }

    if (typeof value === 'number' || typeof value === 'string') {
      return new Int32(value)
    }

    if (typeof value === 'boolean') {
      return new Int32(value ? 1 : 0)
    }

    throw new Error('Unknown value type')
  }

  encode (value: Int32): Int32 {
    return value
  }
}
