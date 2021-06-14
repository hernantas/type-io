import { Decoder } from './Decoder'
import { Encoder } from './Encoder'
import { TargetType } from './TargetType'

export interface Codec<T, O = T, I = unknown> extends Decoder<T, I>, Encoder<T, O> {
  /**
   * `TargetType` of this codec
   */
  readonly target: TargetType<T>
}
