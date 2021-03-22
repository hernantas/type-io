import { Codec } from '@type-io/core'

export class BooleanBsonCodec implements Codec<boolean> {
  type = Boolean

  decode (value: unknown): boolean {
    return !!value
  }

  encode (value: boolean): boolean {
    return value
  }
}
