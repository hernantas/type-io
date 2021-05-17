import { TargetType } from '../type'
import { CodecOption } from './codec-option'

export interface Decoder<T, I = unknown> {
  /**
   * Supported type from property of data model
   */
  readonly type: TargetType

  /**
   * Decode given value into `<T>` type
   *
   * @param value value to be decoded
   * @param options options to be used to decode
   */
  decode(value: I, options?: CodecOption): T
}
