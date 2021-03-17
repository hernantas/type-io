import { Codec } from '../../codec/codec'

export class StringPlainCodec implements Codec<string> {
  type = String

  decode (val: unknown): string {
    if (typeof val === 'string') {
      return val
    }

    if (typeof val === 'number') {
      return String(val)
    }

    if (typeof val === 'boolean') {
      return val ? 'true' : 'false'
    }

    return String(val)
  }

  encode (val: string): string {
    return val
  }
}
