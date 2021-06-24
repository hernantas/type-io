import { Codec } from './Codec'
import { PropertySignature } from './PropertySignature'

export interface TransformProperty<T> extends PropertySignature<T> {
  codec: Codec<T, unknown>
}
