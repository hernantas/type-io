import { Decoder } from './decoder'
import { Encoder } from './encoder'

export interface Codec<T, O = T, I = unknown> extends Decoder<T, I>, Encoder<T, O> {
}
