import { TargetType } from '../type'
import { CodecOption } from './codec-option'

export interface PropOption {
  type?: TargetType
  optional?: boolean
  inName?: string
  outName?: string
  option?: CodecOption
}
