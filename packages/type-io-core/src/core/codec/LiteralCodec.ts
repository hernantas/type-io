import { Codec, LiteralIdentity, LiteralValue } from '../../type'

export class LiteralCodec<T extends LiteralValue> implements Codec<T> {
  readonly target: LiteralIdentity<T>

  constructor (target: LiteralIdentity<T>) {
    this.target = target
  }

  decode (value: unknown): T {
    if (value === this.target.value) {
      return this.target.value
    }
    throw new Error(`Unknown input value type, must be a "${this.target.value.toString()}"`)
  }

  encode (value: T): T {
    return value
  }
}
