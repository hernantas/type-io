import { Codec } from '../../codec/codec'

export class BooleanPlainCodec implements Codec<boolean> {
  type = Boolean

  decode (val: unknown): boolean {
    return !!val
  }

  encode (val: boolean): boolean {
    return val
  }
}
