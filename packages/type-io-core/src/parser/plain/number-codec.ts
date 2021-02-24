import { Codec } from '../../codec/codec'

export class NumberCodec implements Codec<number> {
  type = Number

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

    return 0
  }

  encode (val: number): number {
    return val
  }
}
