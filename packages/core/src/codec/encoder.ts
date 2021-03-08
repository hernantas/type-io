import { AnyParamConstructor } from '../type'

export interface Encoder<T, O = T> {
  /**
   * Supported type from property of data model
   */
  readonly type: AnyParamConstructor

  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   */
  encode(value: T): O
}
