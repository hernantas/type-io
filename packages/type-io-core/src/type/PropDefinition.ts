import { OptionalOf } from './util'
import { PropOption } from './PropOption'

export interface PropDefinition extends OptionalOf<PropOption, 'option'> {
  name: string
}
