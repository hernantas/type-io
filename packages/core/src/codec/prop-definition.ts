import { AnyParamConstructor } from '../type'
import { ReqPropOption, OptPropOption } from './prop-option'

export interface PropDefinition extends Required<ReqPropOption>, OptPropOption {
  name: string
  designType: AnyParamConstructor
}
