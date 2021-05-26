import { Decoder } from './Decoder'
import { Encoder } from './Encoder'

export interface Codec<T, O = T, I = unknown> extends Decoder<T, I>, Encoder<T, O> {
}
