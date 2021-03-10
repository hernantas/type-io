import { AnyParamConstructor } from '../type'
import { CodecOption } from './codec-option'

export interface Encoder<T, O = T> {
  /**
   * Supported type from property of data model
   */
  readonly type: AnyParamConstructor

  /**
   * Supported type in `string` from property of data model
   */
  readonly typeName: string

  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   */
  encode(value: T, options?: CodecOption): O
}
