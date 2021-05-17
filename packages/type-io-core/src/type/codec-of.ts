import { Codec } from '../core'

export type CodecOf<T> = {
  [K in keyof T]: Codec<T[K], unknown>
}
