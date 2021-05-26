import { Codec } from '../Codec'

export type CodecOf<T> = {
  [K in keyof T]: Codec<T[K], unknown>
}
