import { type } from '../core'
import { Codec } from '../type/Codec'

export class BooleanCodec implements Codec<boolean> {
  readonly target = type(String)

  decode (val: unknown): boolean {
    return Boolean(val)
  }

  encode (val: boolean): boolean {
    return val
  }
}
