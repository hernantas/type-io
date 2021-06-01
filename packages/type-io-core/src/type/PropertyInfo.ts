import { PropOption } from './PropOption'
import { RequiredExceptOf } from './util'

/**
 * Contain information of property of some object
 */
export interface PropertyInfo extends RequiredExceptOf<PropOption, 'option'> {
  name: string
}
