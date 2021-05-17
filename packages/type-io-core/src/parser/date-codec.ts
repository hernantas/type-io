import { Codec } from '../core/codec'

export class DateCodec implements Codec<Date> {
  type = Date

  decode (value: unknown): Date {
    if (value instanceof Date) {
      return value
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value)
    }

    throw new Error('Unknown value type')
  }

  encode (value: Date): Date {
    return value
  }
}
