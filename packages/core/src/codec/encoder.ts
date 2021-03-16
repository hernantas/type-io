import { AnyParamConstructor } from '../type'
import { CodecOption } from './codec-option'

export interface Encoder<T, O = T> {
  /**
   * Supported type from property of data model
   */
  readonly type: AnyParamConstructor

  /**
   * Supported sub-type from property of data model
   */
  readonly subType?: AnyParamConstructor

  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   */
  encode(value: T, options?: CodecOption): O
}
