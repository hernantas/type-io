import { AnyParamConstructor } from '../type'

export interface Codec<T, O = T, I = unknown> {
  readonly type: AnyParamConstructor

  decode(value: I): T
  encode(value: T): O
}
