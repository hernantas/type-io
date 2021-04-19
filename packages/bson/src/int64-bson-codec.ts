import { Codec, TargetType } from '@type-io/core'
import { Double, Int32, Long } from 'bson'

export class StringInt64BsonCodec implements Codec<string, Long> {
  type: TargetType = [String, Long]

  decode (value: unknown): string {
    if (value instanceof Long) {
      return value.toString()
    }

    if (typeof value === 'number') {
      return Long.fromNumber(value).toString()
    }

    if (value instanceof Int32 || value instanceof Double) {
      return Long.fromNumber(value.value).toString()
    }

    if (typeof value === 'string') {
      return Long.fromString(value).toString()
    }

    if (typeof value === 'boolean') {
      return value ? '1' : '0'
    }

    throw new Error('Unknown value type')
  }

  encode (value: string): Long {
    return Long.fromString(value)
  }
}

export class Int64BsonCodec implements Codec<Long> {
  type: TargetType = Long

  decode (value: unknown): Long {
    if (value instanceof Long) {
      return value
    }

    if (typeof value === 'number') {
      return Long.fromNumber(value)
    }

    if (value instanceof Int32 || value instanceof Double) {
      return Long.fromNumber(value.value)
    }

    if (typeof value === 'string') {
      return Long.fromString(value)
    }

    if (typeof value === 'boolean') {
      return Long.fromString(value ? '1' : '0')
    }

    throw new Error('Unknown value type')
  }

  encode (value: Long): Long {
    return value
  }
}
