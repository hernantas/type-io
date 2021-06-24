import { Long, Timestamp } from 'bson'
import { Codec, variant } from '@type-io/core'

export class StringTimestampBsonCodec implements Codec<string, Timestamp> {
  readonly target = variant(String, Timestamp)

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

abstract class TimestampBaseCodec<O> implements Codec<Timestamp, O> {
  readonly target = Timestamp

  decode (value: unknown): Timestamp {
    if (value instanceof Timestamp) {
      return value
    }

    if (typeof value === 'string') {
      return new Timestamp(Long.fromString(value))
    }

    if (typeof value === 'number') {
      return new Timestamp(Long.fromNumber(value))
    }

    if (value instanceof Long) {
      return new Timestamp(value)
    }

    throw new Error('Unknown value type')
  }

  abstract encode (value: Timestamp): O
}

export class TimestampBsonCodec extends TimestampBaseCodec<Timestamp> {
  encode (value: Timestamp): Timestamp {
    return value
  }
}

export class TimestampPlainBsonCodec extends TimestampBaseCodec<string> {
  encode (value: Timestamp): string {
    return value.toString()
  }
}
