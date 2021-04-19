import { Decimal128, Double, Int32, Long } from 'bson'
import { Codec, TargetType } from '@type-io/core'

export class Decimal128BsonCodec implements Codec<string, Decimal128> {
  type: TargetType = [String, Decimal128]

  decode (value: unknown): string {
    if (value instanceof Decimal128) {
      return value.toString()
    }

    if (typeof value === 'string') {
      return Decimal128.fromString(value).toString()
    }

    if (typeof value === 'number' || value instanceof Long) {
      return Decimal128.fromString(value.toString()).toString()
    }

    if (typeof value === 'boolean') {
      return value ? '1' : '0'
    }

    if (value instanceof Double || value instanceof Int32) {
      return Decimal128.fromString(value.value.toString()).toString()
    }

    throw new Error('Unknown value type')
  }

  encode (value: string): Decimal128 {
    return Decimal128.fromString(value)
  }
}
