import { Codec } from './Codec'
import { PropertyInfo } from './PropertyInfo'

export interface TransformProperty<P> extends PropertyInfo {
  codec: Codec<P, unknown>
}
