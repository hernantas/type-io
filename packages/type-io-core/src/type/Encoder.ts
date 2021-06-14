import { TargetType } from './TargetType'
import { CodecOption } from './CodecOption'

export interface Encoder<T, O = T> {
  /**
   * `TargetType` of this decoder
   */
  readonly target: TargetType<T>

  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   * @param options options to be used to encode
   */
  encode: (value: T, options?: CodecOption) => O
}
