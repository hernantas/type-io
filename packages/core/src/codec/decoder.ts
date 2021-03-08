import { AnyParamConstructor } from '../type'

export interface Decoder<T, I = unknown> {
  /**
   * Supported type from property of data model
   */
  readonly type: AnyParamConstructor

  /**
   * Decode given value into `<T>` type
   *
   * @param value value to be decoded
   */
  decode(value: I): T
}
