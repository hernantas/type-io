import { Decimal128, Double, Int32, Long } from 'bson'
import { Codec, variant } from '@type-io/core'

export class StringDecimal128BsonCodec implements Codec<string, Decimal128> {
  readonly target = variant(String, Decimal128)

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

abstract class Decimal128BaseCodec<O> implements Codec<Decimal128, O> {
  readonly target = Decimal128

  decode (value: unknown): Decimal128 {
    if (value instanceof Decimal128) {
      return value
    }

    if (typeof value === 'string') {
      return Decimal128.fromString(value)
    }

    if (typeof value === 'number' || value instanceof Long) {
      return Decimal128.fromString(value.toString())
    }

    if (typeof value === 'boolean') {
      return Decimal128.fromString(value ? '1' : '0')
    }

    if (value instanceof Double || value instanceof Int32) {
      return Decimal128.fromString(value.value.toString())
    }

    throw new Error('Unknown value type')
  }

  abstract encode (value: Decimal128): O
}

export class Decimal128BsonCodec extends Decimal128BaseCodec<Decimal128> {
  encode (value: Decimal128): Decimal128 {
    return value
  }
}

export class Decimal128PlainBsonCodec extends Decimal128BaseCodec<string> {
  encode (value: Decimal128): string {
    return value.toString()
  }
}
