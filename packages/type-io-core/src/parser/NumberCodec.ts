import { type } from '../core'
import { Codec } from '../type/Codec'

export class NumberCodec implements Codec<number> {
  readonly target = type(Number)

  decode (val: unknown): number {
    if (typeof val === 'number') {
      return val
    }

    if (typeof val === 'string') {
      return Number(val)
    }

    if (typeof val === 'boolean') {
      return val ? 1 : 0
    }

    throw new Error('Unknown value type')
  }

  encode (val: number): number {
    return val
  }
}
