import { PropertyOption } from './PropertyOption'
import { RequiredExceptOf } from './util'

/**
 * Contain information of property of some object
 */
export interface PropertyInfo extends RequiredExceptOf<PropertyOption, 'option'> {
  name: string
}
