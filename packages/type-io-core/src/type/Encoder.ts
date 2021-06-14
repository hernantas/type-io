import { CodecOption } from './CodecOption'

export interface Encoder<T, O = T> {
  /**
   * Encode given value into `<O>` type
   *
   * @param value value to be encoded
   * @param options options to be used to encode
   */
  encode: (value: T, options?: CodecOption) => O
}
