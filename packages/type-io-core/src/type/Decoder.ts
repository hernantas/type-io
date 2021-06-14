import { CodecOption } from './CodecOption'

export interface Decoder<T, I = unknown> {
  /**
   * Decode given value into `<T>` type
   *
   * @param value value to be decoded
   * @param options options to be used to decode
   */
  decode: (value: I, options?: CodecOption) => T
}
