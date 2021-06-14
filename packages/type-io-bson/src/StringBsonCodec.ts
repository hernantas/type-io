import { Codec, type } from '@type-io/core'
import { Decimal128, Long, Int32, ObjectID, ObjectId, Timestamp, Double } from 'bson'

export class StringBsonCodec implements Codec<string> {
  readonly target = type(String)

  decode (value: unknown): string {
    if (typeof value === 'string') {
      return value
    }

    if (typeof value === 'number') {
      return String(value)
    }

    if (typeof value === 'boolean') {
      return value ? 'true' : 'false'
    }

    if (value instanceof ObjectId || value instanceof ObjectID) {
      return value.toHexString()
    }

    if (value instanceof Double || value instanceof Int32) {
      return value.value.toString()
    }

    if (value instanceof Long || value instanceof Timestamp || value instanceof Decimal128) {
      return value.toString()
    }

    return String(value)
  }

  encode (value: string): string {
    return value
  }
}
