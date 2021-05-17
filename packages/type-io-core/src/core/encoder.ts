import { TargetType } from '../type'
import { CodecOption } from './codec-option'

export interface Encoder<T, O = T> {
  /**
   * Supported type from property of data model
   */
  readonly type: TargetType

  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   * @param options options to be used to encode
   */
  encode(value: T, options?: CodecOption): O
}
