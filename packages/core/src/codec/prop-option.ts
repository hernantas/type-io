import { AnyParamConstructor } from '../type'
import { CodecOption } from './codec-option'

export interface ReqPropOption {
  optional?: boolean
  inName?: string
  outName?: string
}

export interface OptPropOption {
  type?: AnyParamConstructor
  option?: CodecOption
}

export interface PropOption extends OptPropOption, ReqPropOption {
}
