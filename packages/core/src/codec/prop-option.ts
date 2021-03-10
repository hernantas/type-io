import { AnyParamConstructor } from '../type'
import { CodecOption } from './codec-option'

export interface PropOption {
  type?: AnyParamConstructor
  optional?: boolean
  inName?: string
  outName?: string
  option?: CodecOption
}
