import { Long, Timestamp } from 'bson'
import { Codec } from '@type-io/core'

export class TimestampBsonCodec implements Codec<string, Timestamp> {
  type = [String, Timestamp]

  decode (value: unknown): string {
    if (value instanceof Timestamp) {
      return value.toString()
    }

    if (typeof value === 'string') {
      return new Timestamp(Long.fromString(value)).toString()
    }

    if (typeof value === 'number') {
      return new Timestamp(Long.fromNumber(value)).toString()
    }

    if (value instanceof Long) {
      return new Timestamp(value).toString()
    }

    throw new Error('Unknown value type')
  }

  encode (value: string): Timestamp {
    return new Timestamp(Long.fromString(value))
  }
}
