import { OptionalFor } from '../type'
import { PropOption } from './prop-option'

export interface PropDefinition extends OptionalFor<PropOption, 'option'> {
  name: string
}
