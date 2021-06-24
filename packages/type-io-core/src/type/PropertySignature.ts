import { PropertyInfo } from './PropertyInfo'

export interface PropertySignature<T = unknown> extends PropertyInfo<T> {
  name: string
}
