import { AnyParamConstructor } from '../type'
import { CodecOption } from './codec-option'

export interface Decoder<T, I = unknown> {
  /**
   * Supported type from property of data model
   */
  readonly type: AnyParamConstructor

  /**
   * Supported type in `string` from property of data model
   */
   readonly typeName: string

  /**
   * Decode given value into `<T>` type
   *
   * @param value value to be decoded
   */
  decode(value: I, options?: CodecOption): T
}
