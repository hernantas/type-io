import { PropertyInfo } from './PropertyInfo'
import { TypeResolution } from './TypeResolution'

export interface PropertyOption<T = unknown> extends Partial<PropertyInfo<T>> {
  typeResolution?: TypeResolution
}
