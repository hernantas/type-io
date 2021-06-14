import { type } from '../core'
import { Codec } from '../type/Codec'

export class StringCodec implements Codec<string> {
  readonly target = type(String)

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
