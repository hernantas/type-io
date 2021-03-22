import { Codec } from '../codec'

export type CodecOf<T> = {
  [K in keyof T]: Codec<T[K], unknown>
}
