import { Codec, TypeIdentity } from '../../type'
import { unknown } from '../type'

export class UnknownCodec implements Codec<unknown> {
  readonly target: TypeIdentity<unknown> = unknown()

  decode (value: unknown): unknown {
    return value
  }

  encode (value: unknown): unknown {
    return value
  }
}
